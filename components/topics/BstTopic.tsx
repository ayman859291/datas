
import React from 'react';
import { TopicComponentProps } from '../../types';

const PlaceholderTopic: React.FC<{ title: string; gradient: string; onStartQuiz: () => void }> = ({ title, gradient, onStartQuiz }) => {
    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className={`text-4xl font-extrabold mb-3 bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>{title}</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    المحتوى التفاعلي المفصل لهذا الموضوع قيد الإعداد وسيتم إضافته قريباً. في الأثناء، يمكنك استكشاف موضوع المصفوفات.
                </p>
                 <div className="flex justify-center gap-4 flex-wrap">
                     <button 
                        onClick={onStartQuiz} 
                        disabled 
                        className="bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold py-3 px-6 rounded-full transform transition shadow-md cursor-not-allowed opacity-50"
                     >
                        <span className="mr-2">🧪</span> اختبار (قريباً)
                    </button>
                </div>
            </div>
             <div className="bg-slate-100 rounded-2xl p-8 text-center">
                 <h3 className="text-2xl font-bold text-slate-700 mb-4">قيد الإنشاء</h3>
                 <p className="text-slate-500">نعمل حاليًا على تطوير أمثلة تفاعلية ومحتوى تعليمي غني لهذا الموضوع. </p>
                 <div className="mt-6 text-5xl animate-bounce">🏗️</div>
             </div>
        </div>
    );
};

const BstTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return <PlaceholderTopic 
                title="أشجار البحث الثنائية" 
                gradient="from-rose-500 to-pink-500"
                onStartQuiz={onStartQuiz}
            />;
};

export default BstTopic;
