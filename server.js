import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.resolve(path.join(__dirname, 'dist'));

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

// Security headers applied to every response
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const server = http.createServer((req, res) => {
  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Strip query string to prevent injection and serve clean paths
  const urlPath = (req.url || '/').split('?')[0];
  
  // Prevent path traversal: normalize and verify path stays within DIST_DIR
  const normalizedPath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  let resolvedPath = path.join(DIST_DIR, normalizedPath === '/' || normalizedPath === '' ? 'index.html' : normalizedPath);
  
  // Verify the resolved path is still inside DIST_DIR
  const realDistDir = path.resolve(DIST_DIR);
  const realResolvedPath = path.resolve(resolvedPath);
  if (!realResolvedPath.startsWith(realDistDir + path.sep) && realResolvedPath !== realDistDir) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  if (!path.extname(resolvedPath)) {
    resolvedPath = path.join(DIST_DIR, 'index.html');
  }
  
  const ext = path.extname(resolvedPath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(resolvedPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for SPA routing
        fs.readFile(path.join(DIST_DIR, 'index.html'), (fallbackErr, fallbackContent) => {
          if (fallbackErr) {
            res.writeHead(500);
            res.end('Server Error');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallbackContent, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
