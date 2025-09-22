import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';
import { TopicComponentProps } from '../../types';

const StackVisualizer: React.FC = () => {
    const MAX_ITEMS = 8;
    const [stack, setStack] = useState<number[]>([10, 20, 30]);
    const [inputValue, setInputValue] = useState('');
    const [poppedValue, setPoppedValue] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    const clearStatus = () => {
        setPoppedValue(null);
        setError('');
    };

    const handlePush = () => {
        clearStatus();
        const value = parseInt(inputValue, 10);
        if (isNaN(value)) {
            setError('الرجاء إدخال رقم صالح.');
            return;
        }
        if (stack.length >= MAX_ITEMS) {
            setError('المكدس ممتلئ! (Stack Overflow)');
            return;
        }
        setStack([...stack, value]);
        setInputValue('');
    };

    const handlePop = () => {
        clearStatus();
        if (stack.length === 0) {
            setError('المكدس فارغ! (Stack Underflow)');
            return;
        }
        const lastValue = stack[stack.length - 1];
        setPoppedValue(lastValue);
        setStack(stack.slice(0, -1));
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-purple-500 shadow-md">
            <h3 className="text-xl font-bold text-purple-700 mb-2 flex items-center gap-2"><span className="text-2xl">📚</span> محاكي المكدس التفاعلي</h3>
            <p className="text-slate-600 mb-4">جرب عمليات `push` و `pop` لتفهم مبدأ "آخر من يدخل، أول من يخرج" (LIFO).</p>
            
            <div className="flex justify-center items-end gap-4 min-h-[300px] bg-slate-200/50 rounded-lg p-4 border-b-4 border-slate-300">
                {stack.map((item, index) => (
                    <div key={index} className="bg-purple-500 text-white w-16 h-12 flex items-center justify-center font-bold text-lg rounded-md shadow-lg animate-fade-in-up transform transition-transform" style={{bottom: `${index * 50}px`}}>
                        {item}
                    </div>
                ))}
                {stack.length === 0 && <p className="text-slate-500 self-center">المكدس فارغ</p>}
            </div>
             <div className="text-center mt-2 font-mono text-sm text-purple-600">
                {stack.length > 0 ? `Top = ${stack.length - 1}` : 'Top = -1'}
            </div>

            <div className="mt-6 flex justify-center items-center gap-3 flex-wrap border-t pt-6">
                <input type="number" value={inputValue} onChange={(e) => { setInputValue(e.target.value); clearStatus(); }} placeholder="أدخل قيمة" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" />
                <button onClick={handlePush} className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition">Push</button>
                <button onClick={handlePop} className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition">Pop</button>
            </div>
            {poppedValue !== null && (
                 <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center animate-fade-in-up">
                    <strong>تم سحب القيمة:</strong> <span className="font-bold text-yellow-700">{poppedValue}</span>
                </div>
            )}
            {error && (
                 <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center animate-fade-in-up font-semibold text-red-700">
                    {error}
                </div>
            )}
        </div>
    );
};


const StackTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">المكدس (Stack)</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    هيكل بيانات خطي يتبع مبدأ "آخر من يدخل، أول من يخرج" (LIFO). يمكن تخيلها ككومة من الكتب، حيث لا يمكنك إلا إضافة كتاب جديد في الأعلى أو إزالة الكتاب العلوي.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">المفاهيم الأساسية للمكدس</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <InfoCard icon="📥" title="مبدأ LIFO" iconBgClass="bg-blue-500">
                        <p><strong>Last-In, First-Out:</strong> آخر عنصر يتم إضافته (push) إلى المكدس هو أول عنصر يتم إزالته (pop). هذا السلوك البسيط هو أساس قوة المكدس في العديد من الخوارزميات.</p>
                    </InfoCard>
                    <InfoCard icon="⚙️" title="العمليات الأساسية" iconBgClass="bg-orange-500">
                        <p><strong>Push:</strong> إضافة عنصر إلى قمة المكدس.</p>
                        <p><strong>Pop:</strong> إزالة العنصر العلوي من المكدس.</p>
                        <p><strong>Peek (or Top):</strong> عرض قيمة العنصر العلوي دون إزالته.</p>
                        <p><strong>isEmpty:</strong> التحقق مما إذا كان المكدس فارغًا.</p>
                    </InfoCard>
                </div>
            </section>

            <StackVisualizer />
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">التنفيذ باستخدام مصفوفة في C++</h3>
                <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">أبسط طريقة لتنفيذ المكدس هي باستخدام مصفوفة ومؤشر (أو متغير) يسمى `top` لتتبع العنصر العلوي.</p>

                <CodeBlock title="تعريف فئة Stack">
                    <Keyword>#define</Keyword> MAX_SIZE 100 <Comment>// تحديد أقصى حجم للمكدس</Comment>{'\n\n'}
                    <Keyword>class</Keyword> Stack {'{'}{'\n'}
                    <Keyword>private</Keyword>:{'\n'}
                    {'    '}<Keyword>int</Keyword> arr[MAX_SIZE]; <Comment>// مصفوفة لتخزين العناصر</Comment>{'\n'}
                    {'    '}<Keyword>int</Keyword> top;             <Comment>// مؤشر لقمة المكدس</Comment>{'\n\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Func>Stack</Func>() {'{'} top = -<NumberLiteral>1</NumberLiteral>; {'}'} <Comment>// Constructor: المكدس فارغ في البداية</Comment>{'\n\n'}
                    {'    '}<Keyword>bool</Keyword> <Func>push</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>int</Keyword> <Func>pop</Func>();{'\n'}
                    {'    '}<Keyword>int</Keyword> <Func>peek</Func>();{'\n'}
                    {'    '}<Keyword>bool</Keyword> <Func>isEmpty</Func>();{'\n'}
                    {'}'};
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">1. عملية Push (الإضافة)</h4>
                <CodeBlock title="دالة push">
                    <Keyword>bool</Keyword> Stack::<Func>push</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (top &gt;= (MAX_SIZE - <NumberLiteral>1</NumberLiteral>)) {'{'} <Comment>// التحقق من الامتلاء (Overflow)</Comment>{'\n'}
                    {'        '}cout &lt;&lt; <StringLiteral>"Stack Overflow!"</StringLiteral>;{'\n'}
                    {'        '}<Keyword>return false</Keyword>;{'\n'}
                    {'    '}{'}'} <Keyword>else</Keyword> {'{'}{'\n'}
                    {'        '}arr[++top] = value; <Comment>// زيادة top ثم إضافة العنصر</Comment>{'\n'}
                    {'        '}<Keyword>return true</Keyword>;{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'}'}
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">2. عملية Pop (الحذف)</h4>
                <CodeBlock title="دالة pop">
                    <Keyword>int</Keyword> Stack::<Func>pop</Func>() {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (top &lt; <NumberLiteral>0</NumberLiteral>) {'{'} <Comment>// التحقق من الفراغ (Underflow)</Comment>{'\n'}
                    {'        '}cout &lt;&lt; <StringLiteral>"Stack Underflow!"</StringLiteral>;{'\n'}
                    {'        '}<Keyword>return</Keyword> <NumberLiteral>0</NumberLiteral>; <Comment>// أو قيمة خطأ</Comment>{'\n'}
                    {'    '}{'}'} <Keyword>else</Keyword> {'{'}{'\n'}
                    {'        '}<Keyword>int</Keyword> value = arr[top--]; <Comment>// أخذ القيمة ثم إنقاص top</Comment>{'\n'}
                    {'        '}<Keyword>return</Keyword> value;{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'}'}
                </CodeBlock>
                 <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">3. عملية Peek (النظر للقمة)</h4>
                <CodeBlock title="دالة peek">
                    <Keyword>int</Keyword> Stack::<Func>peek</Func>() {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (top &lt; <NumberLiteral>0</NumberLiteral>) {'{'} <Comment>// التحقق من الفراغ</Comment>{'\n'}
                    {'        '}cout &lt;&lt; <StringLiteral>"Stack is Empty!"</StringLiteral>;{'\n'}
                    {'        '}<Keyword>return</Keyword> <NumberLiteral>0</NumberLiteral>;{'\n'}
                    {'    '}{'}'} <Keyword>else</Keyword> {'{'}{'\n'}
                    {'        '}<Keyword>return</Keyword> arr[top]; <Comment>// إرجاع العنصر العلوي</Comment>{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'}'}
                </CodeBlock>
            </section>
        </div>
    );
};

export default StackTopic;
