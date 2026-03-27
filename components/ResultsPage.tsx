import React from "react";
import type { QuizResults } from "../types";

const INTAKE_URL = "https://my.practicebetter.io/#/696cd5937957ff6cdd8359db/forms?f=696f8b2e626a21227f6fddfd";
const EMAIL_URL = "mailto:shannon@theintegrativepractitioner.com";
const SUBSTACK_URL = "https://theintegrativepractitioner.substack.com/subscribe";

interface ResultsPageProps { results: QuizResults; }

const EmailIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67L12 14.163 1.5 8.67z"/></svg>;
const SubstackIcon = () => <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M22.539 5.269H1.46V1.47h21.08v3.799zm0 17.26H1.46v-3.798h21.08v3.798zM1.46 9.067v5.865h21.08V9.067H1.46Z"/></svg>;

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
                <p className="text-base text-text-light max-w-xl mx-auto mb-8">{patternDescription}</p>
                
                <div className="my-8 p-6 bg-white/50 rounded-xl border-2 border-sage/30 text-left">
                    <p className="text-xs font-bold text-sage uppercase tracking-wider mb-3 text-center">Based on Your Results, We Recommend</p>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-4xl">{recommendedPath.pathEmoji}</span>
                        <div className="text-left">
                            <p className="text-sm font-bold text-text-light">{recommendedPath.pathLabel}</p>
                            <h3 className="text-xl font-semibold text-text-dark">{recommendedPath.pathTitle}</h3>
                        </div>
                    </div>
                    <p className="text-sm text-text-light mb-3">{recommendedPath.description}</p>
                    <p className="text-xs text-text-light italic border-l-2 border-sage pl-3">{recommendedPath.whyThisPath}</p>
                </div>
                
                <div className="space-y-4 mb-8 max-w-md mx-auto">
                    <a href={INTAKE_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-sage hover:bg-sage-dark text-white py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all">Apply to Work Together</a>
                    <a href={EMAIL_URL} className="block w-full bg-white text-terracotta border-2 border-terracotta py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all flex items-center justify-center gap-2"><EmailIcon />Have Questions? Email Shannon</a>
                    <button onClick={() => window.open(SUBSTACK_URL, "_blank")} className="block w-full bg-sage/20 text-text-dark py-4 px-6 rounded-xl font-semibold text-center shadow-soft transition-all flex items-center justify-center gap-2"><SubstackIcon />Get Weekly Insights (Free Newsletter)</button>
                </div>
                
                <p className="text-xs text-text-light/70 mt-8">This assessment is for educational purposes only and is not a substitute for professional mental health care.</p>
            </div>
        </div>
    );
};

export default ResultsPage;
