import React, { useState, useMemo } from 'react';
import Header from '../Header';
import Navigation from '../Navigation';
import QuizModal from '../QuizModal';
import { topics } from '../../constants';
import { TopicId, QuizQuestion } from '../../types';

const App: React.FC = () => {
    const [activeTopicId, setActiveTopicId] = useState<TopicId>('arrays');
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [quizTopicTitle, setQuizTopicTitle] = useState('');

    const activeTopic = useMemo(() => {
        return topics.find(t => t.id === activeTopicId)!;
    }, [activeTopicId]);

    const ActiveTopicComponent = activeTopic.component;

    const handleStartQuiz = () => {
        if (activeTopic.quizData && activeTopic.quizData.length > 0) {
            setQuizQuestions(activeTopic.quizData);
            setQuizTopicTitle(activeTopic.name);
            setQuizVisible(true);
        }
    };

    const handleCloseQuiz = () => {
        setQuizVisible(false);
    };
    
    const handleRetakeQuiz = () => {
        setQuizVisible(false);
        setTimeout(() => {
            if (activeTopic.quizData && activeTopic.quizData.length > 0) {
                setQuizQuestions(activeTopic.quizData);
                setQuizTopicTitle(activeTopic.name);
                setQuizVisible(true);
            }
        }, 300); // Small delay for smoother transition
    };

    return (
        <div className="bg-slate-100 min-h-screen text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header topics={topics} activeTopicId={activeTopicId} />
                <Navigation topics={topics} activeTopicId={activeTopicId} setActiveTopicId={setActiveTopicId} />
                <main className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg">
                    <ActiveTopicComponent onStartQuiz={handleStartQuiz} />
                </main>
            </div>
            {isQuizVisible && (
                <QuizModal 
                    topicTitle={quizTopicTitle}
                    questions={quizQuestions}
                    onClose={handleCloseQuiz}
                    onRetake={handleRetakeQuiz}
                />
            )}
        </div>
    );
};

export default App;