
import React from 'react';
import { Topic, TopicId } from '../types';

interface NavigationProps {
    topics: Topic[];
    activeTopicId: TopicId;
    setActiveTopicId: (id: TopicId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ topics, activeTopicId, setActiveTopicId }) => {
    return (
        <nav className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 mt-8 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {topics.map(topic => (
                    <button
                        key={topic.id}
                        onClick={() => setActiveTopicId(topic.id as TopicId)}
                        className={`
                            group relative w-full flex flex-col items-center justify-center gap-2 p-3 rounded-xl text-white font-semibold text-center transition-all duration-300 ease-in-out
                            transform hover:-translate-y-1 hover:shadow-xl
                            ${activeTopicId === topic.id 
                                ? 'bg-gradient-to-br from-green-400 to-blue-500 shadow-lg' 
                                : 'bg-gradient-to-br from-indigo-500 to-purple-600'}
                        `}
                    >
                        <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{topic.icon}</span>
                        <span className="text-sm">{topic.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
