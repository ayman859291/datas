
import React, { useState, useEffect } from 'react';
import { QuizQuestion, UserAnswer } from '../types';

interface QuizModalProps {
    topicTitle: string;
    questions: QuizQuestion[];
    onClose: () => void;
    onRetake: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ topicTitle, questions, onClose, onRetake }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(UserAnswer | null)[]>(Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];
    const totalQuestions = questions.length;
    const score = userAnswers.filter(a => a?.isCorrect).length;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOptionSelect = (selectedIndex: number) => {
        if (currentAnswer) return;
        const isCorrect = selectedIndex === currentQuestion.correct;
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = { selected: selectedIndex, isCorrect };
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResults(true);
        }
    };
    
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderResults = () => {
        const percentage = Math.round((score / totalQuestions) * 100);
        let performance, message, gradeClass;
        if (percentage >= 90) { gradeClass = 'text-green-500'; performance = 'ممتاز'; message = 'أداء رائع! لديك إتقان ممتاز لهذا الموضوع.'; }
        else if (percentage >= 80) { gradeClass = 'text-cyan-500'; performance = 'جيد جداً'; message = 'أداء جيد جداً! لديك فهم قوي.'; }
        else if (percentage >= 70) { gradeClass = 'text-yellow-500'; performance = 'جيد'; message = 'أداء مقبول. يُنصح بمراجعة بعض النقاط.'; }
        else { gradeClass = 'text-red-500'; performance = 'يحتاج تحسين'; message = 'ينصح بمراجعة شاملة للموضوع.'; }

        return (
            <div className="text-center p-6 animate-fade-in-up">
                <h3 className="text-3xl font-bold text-slate-800">نتائج الاختبار</h3>
                <div className={`text-7xl font-bold my-4 ${gradeClass}`}>{percentage}%</div>
                <p className="text-xl font-semibold text-slate-700">{performance}</p>
                <p className="text-slate-500 mt-2 mb-6">{message}</p>
                <div className="grid grid-cols-2 gap-4 my-6 text-center">
                    <div className="bg-slate-100 p-4 rounded-lg"><div className="text-2xl font-bold text-green-600">{score}</div><div className="text-sm text-slate-500">إجابات صحيحة</div></div>
                    <div className="bg-slate-100 p-4 rounded-lg"><div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div><div className="text-sm text-slate-500">إجابات خاطئة</div></div>
                </div>
                <div className="flex gap-4 justify-center">
                    <button onClick={onRetake} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition">إعادة الاختبار</button>
                    <button onClick={onClose} className="bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 transition">إغلاق</button>
                </div>
            </div>
        );
    };

    const renderQuestion = () => (
        <>
            <div className="p-6 sm:p-8">
                <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        السؤال {currentQuestionIndex + 1} من {totalQuestions}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-6 whitespace-pre-wrap">{currentQuestion.question}</h3>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = currentAnswer?.selected === index;
                        const isCorrect = currentQuestion.correct === index;
                        let optionClass = 'bg-slate-100 hover:bg-slate-200';
                        if (currentAnswer) {
                            if (isCorrect) optionClass = 'bg-green-100 border-green-500 text-green-800';
                            else if (isSelected && !isCorrect) optionClass = 'bg-red-100 border-red-500 text-red-800';
                            else optionClass = 'bg-slate-100 opacity-70';
                        }
                        return (
                            <button key={index} onClick={() => handleOptionSelect(index)} disabled={!!currentAnswer}
                                className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-300 text-md ${optionClass}`}>
                                {option}
                            </button>
                        );
                    })}
                </div>
                {currentAnswer && (
                    <div className={`mt-6 p-4 rounded-lg animate-fade-in-up ${currentAnswer.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                        <p className="font-bold text-lg">{currentAnswer.isCorrect ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة'}</p>
                        <p className="mt-2 text-slate-700">{currentQuestion.explanation}</p>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
                <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="py-2 px-4 rounded-lg font-semibold bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed">السابق</button>
                <div className="text-sm font-bold text-slate-600">{currentQuestionIndex + 1} / {totalQuestions}</div>
                <button onClick={handleNext} disabled={!currentAnswer} className="py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    {currentQuestionIndex === totalQuestions - 1 ? 'عرض النتائج' : 'التالي'}
                </button>
            </div>
        </>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-2xl">
                    <h2 className="text-2xl font-bold">اختبار {topicTitle}</h2>
                    <button onClick={onClose} className="text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition">&times;</button>
                </div>
                <div className="overflow-y-auto">
                    {showResults ? renderResults() : renderQuestion()}
                </div>
            </div>
        </div>
    );
};

export default QuizModal;
