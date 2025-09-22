import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';
import { TopicComponentProps } from '../../types';

const QueueVisualizer: React.FC = () => {
    const MAX_ITEMS = 8;
    const [queue, setQueue] = useState<number[]>([10, 20, 30]);
    const [inputValue, setInputValue] = useState('');
    const [dequeuedValue, setDequeuedValue] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    const clearStatus = () => {
        setDequeuedValue(null);
        setError('');
    };

    const handleEnqueue = () => {
        clearStatus();
        const value = parseInt(inputValue, 10);
        if (isNaN(value)) {
            setError('الرجاء إدخال رقم صالح.');
            return;
        }
        if (queue.length >= MAX_ITEMS) {
            setError('الطابور ممتلئ! (Queue Overflow)');
            return;
        }
        setQueue([...queue, value]);
        setInputValue('');
    };

    const handleDequeue = () => {
        clearStatus();
        if (queue.length === 0) {
            setError('الطابور فارغ! (Queue Underflow)');
            return;
        }
        const firstValue = queue[0];
        setDequeuedValue(firstValue);
        setQueue(queue.slice(1));
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-teal-500 shadow-md">
            <h3 className="text-xl font-bold text-teal-700 mb-2 flex items-center gap-2"><span className="text-2xl">🚶‍♂️</span> محاكي الطابور التفاعلي</h3>
            <p className="text-slate-600 mb-4">جرب عمليات `enqueue` و `dequeue` لتفهم مبدأ "أول من يدخل، أول من يخرج" (FIFO).</p>
            
            <div className="flex items-center gap-2 min-h-[80px] bg-slate-200/50 rounded-lg p-4 border-2 border-slate-300 relative">
                <div className="absolute top-2 left-2 font-bold text-teal-600">Front</div>
                <div className="absolute top-2 right-2 font-bold text-rose-600">Rear</div>
                {queue.map((item, index) => (
                    <div key={index} className="bg-teal-500 text-white w-14 h-14 flex items-center justify-center font-bold text-lg rounded-md shadow-lg animate-fade-in-up">
                        {item}
                    </div>
                ))}
                {queue.length === 0 && <p className="text-slate-500 w-full text-center">الطابور فارغ</p>}
            </div>

            <div className="mt-6 flex justify-center items-center gap-3 flex-wrap border-t pt-6">
                <input type="number" value={inputValue} onChange={(e) => { setInputValue(e.target.value); clearStatus(); }} placeholder="أدخل قيمة" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" />
                <button onClick={handleEnqueue} className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition">Enqueue</button>
                <button onClick={handleDequeue} className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition">Dequeue</button>
            </div>
            {dequeuedValue !== null && (
                 <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center animate-fade-in-up">
                    <strong>تم إخراج القيمة:</strong> <span className="font-bold text-yellow-700">{dequeuedValue}</span>
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


const QueueTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-transparent bg-clip-text">الطابور (Queue)</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    هيكل بيانات خطي يتبع مبدأ "أول من يدخل، أول من يخرج" (FIFO). يشبه طابور الانتظار الحقيقي، حيث يتم خدمة الشخص الذي أتى أولاً.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">المفاهيم الأساسية للطابور</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <InfoCard icon="➡️" title="مبدأ FIFO" iconBgClass="bg-green-500">
                        <p><strong>First-In, First-Out:</strong> أول عنصر يتم إضافته (enqueue) إلى الطابور هو أول عنصر يتم إزالته (dequeue). هذا يجعله مثالياً لإدارة المهام والطلبات بالترتيب.</p>
                    </InfoCard>
                    <InfoCard icon="⚙️" title="العمليات الأساسية" iconBgClass="bg-orange-500">
                        <p><strong>Enqueue:</strong> إضافة عنصر إلى نهاية (rear) الطابور.</p>
                        <p><strong>Dequeue:</strong> إزالة العنصر من بداية (front) الطابور.</p>
                        <p><strong>Front (or Peek):</strong> عرض قيمة العنصر الأمامي دون إزالته.</p>
                        <p><strong>isEmpty:</strong> التحقق مما إذا كان الطابور فارغًا.</p>
                    </InfoCard>
                </div>
            </section>

            <QueueVisualizer />
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">التنفيذ باستخدام مصفوفة في C++</h3>
                <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">يمكن تنفيذ الطابور باستخدام مصفوفة ومؤشرين: `front` للإشارة إلى بداية الطابور و `rear` للإشارة إلى نهايته.</p>

                <CodeBlock title="تعريف فئة Queue">
                    <Keyword>#define</Keyword> MAX_SIZE 100{'\n\n'}
                    <Keyword>class</Keyword> Queue {'{'}{'\n'}
                    <Keyword>private</Keyword>:{'\n'}
                    {'    '}<Keyword>int</Keyword> arr[MAX_SIZE];{'\n'}
                    {'    '}<Keyword>int</Keyword> front;{'\n'}
                    {'    '}<Keyword>int</Keyword> rear;{'\n\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Func>Queue</Func>() {'{'} front = -<NumberLiteral>1</NumberLiteral>; rear = -<NumberLiteral>1</NumberLiteral>; {'}'}{'\n\n'}
                    {'    '}<Keyword>bool</Keyword> <Func>isFull</Func>();{'\n'}
                    {'    '}<Keyword>bool</Keyword> <Func>isEmpty</Func>();{'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>enqueue</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>int</Keyword> <Func>dequeue</Func>();{'\n'}
                    {'}'};
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">1. عملية Enqueue (الإضافة)</h4>
                <CodeBlock title="دالة enqueue">
                    <Keyword>void</Keyword> Queue::<Func>enqueue</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (rear == MAX_SIZE - <NumberLiteral>1</NumberLiteral>) {'{'} <Comment>// التحقق من الامتلاء</Comment>{'\n'}
                    {'        '}cout &lt;&lt; <StringLiteral>"Queue is full!"</StringLiteral>;{'\n'}
                    {'        '}<Keyword>return</Keyword>;{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (front == -<NumberLiteral>1</NumberLiteral>) front = <NumberLiteral>0</NumberLiteral>; <Comment>// عند إضافة أول عنصر</Comment>{'\n'}
                    {'    '}rear++;{'\n'}
                    {'    '}arr[rear] = value;{'\n'}
                    {'}'}
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">2. عملية Dequeue (الحذف)</h4>
                <CodeBlock title="دالة dequeue">
                    <Keyword>int</Keyword> Queue::<Func>dequeue</Func>() {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (front == -<NumberLiteral>1</NumberLiteral> || front > rear) {'{'} <Comment>// التحقق من الفراغ</Comment>{'\n'}
                    {'        '}cout &lt;&lt; <StringLiteral>"Queue is empty!"</StringLiteral>;{'\n'}
                    {'        '}<Keyword>return</Keyword> -<NumberLiteral>1</NumberLiteral>; <Comment>// قيمة خطأ</Comment>{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'    '}<Keyword>int</Keyword> value = arr[front];{'\n'}
                    {'    '}front++;{'\n'}
                    {'    '}<Keyword>return</Keyword> value;{'\n'}
                    {'}'}
                </CodeBlock>
            </section>
        </div>
    );
};

export default QueueTopic;
