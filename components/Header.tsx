
import React from 'react';
import { Topic, TopicId } from '../types';

interface HeaderProps {
    topics: Topic[];
    activeTopicId: TopicId;
}

const Header: React.FC<HeaderProps> = ({ topics, activeTopicId }) => {
    const activeIndex = topics.findIndex(t => t.id === activeTopicId);
    const progressPercentage = ((activeIndex + 1) / topics.length) * 100;

    return (
        <header className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                هياكل البيانات المتقدمة
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-4xl mx-auto mb-6">
                رحلة  في عالم هياكل البيانات باستخدام C++ مع أمثلة تفاعلية واختبارات مبسطة
            </p>
              <p className="text-lg sm:text-xl text-slate-500 max-w-4xl mx-auto mb-6">
              _
            </p>  <p className="text-lg sm:text-xl text-slate-500 max-w-4xl mx-auto mb-6">
               م/أيمن عبدالله عبدالعزيز
            </p>
               
            <div className="bg-slate-200 rounded-full p-1 max-w-2xl mx-auto">
                <div 
                    className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </header>
    );
};

export default Header;
