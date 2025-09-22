
import React from 'react';

interface InfoCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  iconBgClass: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, iconBgClass }) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className={`absolute top-0 right-0 left-0 h-1 ${iconBgClass}`}></div>
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl ${iconBgClass}`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            </div>
            <div className="text-slate-600 space-y-2 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default InfoCard;
