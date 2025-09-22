
import React from 'react';

interface CodeBlockProps {
    title: string;
    children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, children }) => {
    return (
        <div className="bg-[#1a1a2e] rounded-xl shadow-lg overflow-hidden my-6">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 flex items-center gap-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-300 text-sm font-medium">{title}</div>
            </div>
            <div className="p-6 text-sm text-slate-200 overflow-x-auto">
                <pre><code className="font-mono">{children}</code></pre>
            </div>
        </div>
    );
};

export const Keyword: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-blue-400 font-bold">{children}</span>;
export const StringLiteral: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-green-400">{children}</span>;
export const Comment: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-slate-500 italic">{children}</span>;
export const NumberLiteral: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-orange-400">{children}</span>;
export const Func: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-purple-400">{children}</span>;

export default CodeBlock;
