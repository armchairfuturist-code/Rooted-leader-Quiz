import React from "react";
import type { QuizResults } from "../types";

const INTAKE_URL = "https://my.practicebetter.io/#/696cd5937957ff6cdd8359db/forms?f=696f8b2e626a21227f6fddfd";
const EMAIL_URL = "mailto:shannon@theintegrativepractitioner.com";
const SUBSTACK_URL = "https://theintegrativepractitioner.substack.com/subscribe";
const WEBSITE_URL = "https://theintegrativepractitioner.com";

interface ResultsPageProps { results: QuizResults; }

const EmailIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67L12 14.163 1.5 8.67z"/></svg>;
const SubstackIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22.539 5.269H1.46V1.47h21.08v3.799zm0 17.26H1.46v-3.798h21.08v3.798zM1.46 9.067v5.865h21.08V9.067H1.46Z"/></svg>;
const LinkIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const DownloadIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

const generatePDF = (results: QuizResults) => {
  const { jsPDF } = (window as any).jspdf;
  const doc = new jsPDF();
  
  doc.setFillColor(107, 158, 122);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Your Nervous System Pattern', 105, 18, { align: 'center' });
  doc.setFontSize(11);
  doc.text('The Integrative Practitioner | Shannon Myers, MS, SEP', 105, 27, { align: 'center' });
  doc.setFontSize(10);
  doc.textWithLink(WEBSITE_URL, { url: WEBSITE_URL, x: 105, y: 35 }, { align: 'center' });
  
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(20);
  doc.text(results.dominantPattern, 105, 55, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Regulation Score: ' + results.totalScore + '/88', 105, 65, { align: 'center' });
  
  doc.setFontSize(11);
  const splitDesc = doc.splitTextToSize(results.patternDescription, 170);
  doc.text(splitDesc, 20, 78);
  
  doc.setFillColor(250, 248, 243);
  doc.roundedRect(15, 95, 180, 55, 3, 3, 'F');
  doc.setDrawColor(107, 158, 122);
  doc.setLineWidth(1);
  doc.roundedRect(15, 95, 180, 55, 3, 3, 'S');
  
  doc.setTextColor(107, 158, 122);
  doc.setFontSize(11);
  doc.text('RECOMMENDED PATH', 105, 105, { align: 'center' });
  
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(16);
  doc.text(results.recommendedPath.pathEmoji + ' ' + results.recommendedPath.pathTitle, 105, 115, { align: 'center' });
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text(results.recommendedPath.description, 105, 125, { align: 'center' });
  
  doc.setTextColor(0, 102, 204);
  doc.textWithLink('View this path: ' + results.recommendedPath.pathUrl, { url: results.recommendedPath.pathUrl, x: 105, y: 140 }, { align: 'center' });
  
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.text('Next Steps:', 20, 165);
  doc.setFontSize(10);
  doc.text('1. Apply to work together:', 20, 175);
  doc.setTextColor(0, 102, 204);
  doc.textWithLink(INTAKE_URL, { url: INTAKE_URL, x: 60, y: 175 });
  doc.setTextColor(40, 40, 40);
  doc.text('2. Have questions?', 20, 183);
  doc.setTextColor(0, 102, 204);
  doc.textWithLink('Email Shannon', { url: EMAIL_URL, x: 55, y: 183 });
  doc.setTextColor(40, 40, 40);
  doc.text('3. Get weekly insights:', 20, 191);
  doc.setTextColor(0, 102, 204);
  doc.textWithLink('Subscribe to Newsletter', { url: SUBSTACK_URL, x: 65, y: 191 });
  
  doc.setFillColor(107, 158, 122);
  doc.rect(0, 280, 210, 17, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.textWithLink(WEBSITE_URL, { url: WEBSITE_URL, x: 105, y: 288 }, { align: 'center' });
  doc.setFontSize(8);
  doc.text('This assessment is for educational purposes only and is not a substitute for professional mental health care.', 105, 294, { align: 'center' });
  
  doc.save('nervous-system-assessment.pdf');
};

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
    const { dominantPattern, patternDescription, patternIcon, totalScore, recommendedPath } = results;
    
    return (
        <div className="relative gradient-bg-results w-full min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans text-text-dark">
            <div className="relative z-10 w-full max-w-2xl mx-auto bg-cream/80 backdrop-blur-lg p-6 sm:p-10 md:p-12 my-12 rounded-2xl shadow-soft text-center">
                <div className="mb-6">
                    <p className="text-xs text-text-light tracking-widest uppercase">The Integrative Practitioner</p>
                    <p className="text-xs text-text-light/70">Shannon Myers, MS, SEP</p>
                </div>
                <div className="text-6xl mb-4">{patternIcon}</div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-terracotta mb-2">You Are: {dominantPattern}</h1>
                <div className="inline-block bg-sage/30 text-text-dark font-medium py-1 px-4 rounded-full text-sm mb-6">Regulation Score: {totalScore}/88</div>
                <p className="text-base text-text-light max-w-xl mx-auto mb-6">{patternDescription}</p>
                
                <div className="my-8 p-6 bg-white rounded-xl border-2 border-sage shadow-lg">
                    <p className="text-xs font-bold text-sage uppercase tracking-wider mb-4 text-center">Based on Your Results, We Recommend</p>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-5xl">{recommendedPath.pathEmoji}</span>
                        <div className="text-left">
                            <p className="text-sm font-bold text-sage">{recommendedPath.pathLabel}</p>
                            <h3 className="text-2xl font-bold text-text-dark">{recommendedPath.pathTitle}</h3>
                        </div>
                    </div>
                    <p className="text-base text-text-light mb-4 max-w-lg mx-auto">{recommendedPath.description}</p>
                    <p className="text-sm text-text-light/80 italic mb-5 border-l-4 border-sage pl-4 text-left max-w-lg mx-auto">{recommendedPath.whyThisPath}</p>
                    <a href={recommendedPath.pathUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-semibold transition-all">
                        <LinkIcon />View This Path on the Website
                    </a>
                </div>
                
                <div className="space-y-4 mb-8 max-w-md mx-auto">
                    <a href={INTAKE_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-sage hover:bg-sage-dark text-white py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all">Apply to Work Together</a>
                    <a href={EMAIL_URL} className="block w-full bg-white text-terracotta border-2 border-terracotta py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all flex items-center justify-center gap-2"><EmailIcon />Have Questions? Email Shannon</a>
                    <button onClick={() => window.open(SUBSTACK_URL, "_blank")} className="block w-full bg-sage/20 text-text-dark py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all flex items-center justify-center gap-2"><SubstackIcon />Get Weekly Insights (Free Newsletter)</button>
                    <button onClick={() => generatePDF(results)} className="block w-full bg-terracotta text-white py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all flex items-center justify-center gap-2"><DownloadIcon />Download Your Results (PDF)</button>
                </div>
                
                <p className="text-xs text-text-light/70 mt-8">This assessment is for educational purposes only and is not a substitute for professional mental health care.</p>
            </div>
        </div>
    );
};

export default ResultsPage;
