
import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';
import { TopicComponentProps } from '../../types';

interface CircularNode {
    value: number;
    id: number;
}

const CircularLinkedListVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<CircularNode[]>([
        { value: 10, id: 1 },
        { value: 20, id: 2 },
        { value: 30, id: 3 },
    ]);
    const [inputValue, setInputValue] = useState('');

    const addNode = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            setNodes([...nodes, { value, id: Date.now() }]);
            setInputValue('');
        }
    };

    const removeLastNode = () => {
        if (nodes.length > 0) {
            setNodes(nodes.slice(0, -1));
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-cyan-500 shadow-md">
            <h3 className="text-xl font-bold text-cyan-700 mb-2 flex items-center gap-2"><span className="text-2xl">🔄</span> محاكي القائمة الدائرية</h3>
            <p className="text-slate-600 mb-4">لاحظ كيف تشير العقدة الأخيرة دائمًا إلى العقدة الأولى، مكونة حلقة مغلقة.</p>
            
            <div className="relative flex flex-wrap items-center justify-center p-8 min-h-[120px]">
                {nodes.length > 0 && (
                    <>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-purple-500 text-white font-bold px-3 py-1 rounded-lg shadow-md">Head</div>
                        {nodes.map((node, index) => (
                            <React.Fragment key={node.id}>
                                <div className="text-2xl font-bold text-slate-400 mx-1">→</div>
                                <div className="flex items-center bg-white rounded-lg shadow-lg animate-fade-in-up">
                                    <div className="bg-cyan-500 text-white font-mono font-bold w-12 h-12 flex items-center justify-center text-lg rounded-l-lg">{node.value}</div>
                                    <div className="bg-slate-300 w-8 h-12 flex items-center justify-center rounded-r-lg">
                                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                        <div className="text-2xl font-bold text-purple-500 mx-1 animate-pulse">→ (إلى Head)</div>
                    </>
                )}
                 {nodes.length === 0 && <p className="text-slate-500 font-bold">القائمة فارغة</p>}
            </div>

            <div className="mt-6 flex justify-center items-center gap-4 flex-wrap border-t pt-6">
                 <div>
                    <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="أدخل قيمة للإضافة" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 transition" />
                    <button onClick={addNode} className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition mr-2">إضافة</button>
                </div>
                 <div>
                    <button onClick={removeLastNode} className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition">حذف آخر عقدة</button>
                </div>
            </div>
        </div>
    );
};


const CircularLinkedListTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-transparent bg-clip-text">القوائم المرتبطة الدائرية</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    نوع خاص من القوائم المرتبطة حيث لا يوجد نهاية (`NULL`). العقدة الأخيرة تشير مباشرة إلى العقدة الأولى، مما يخلق حلقة.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">المفهوم الأساسي والتطبيقات</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <InfoCard icon="🔄" title="الهيكل الدائري" iconBgClass="bg-teal-500">
                        <p><strong>لا وجود لـ NULL:</strong> الفرق الجوهري هو أن مؤشر `next` في العقدة الأخيرة لا يشير إلى `NULL`، بل يعود ليشير إلى العقدة الأولى (Head).</p>
                        <p><strong>اجتياز لا نهائي:</strong> إذا لم يتم وضع شرط توقف صحيح، فإن المرور على القائمة سيستمر إلى الأبد في حلقة مفرغة.</p>
                    </InfoCard>
                    <InfoCard icon="🎮" title="التطبيقات العملية" iconBgClass="bg-fuchsia-500">
                        <p><strong>جدولة المهام (Round Robin):</strong> مثالية لتطبيقات الجدولة حيث تنتقل بين مجموعة من المهام بشكل دوري.</p>
                        <p><strong>قوائم تشغيل الوسائط:</strong> يمكن استخدامها لتكرار قائمة تشغيل أغاني أو فيديوهات بشكل مستمر.</p>
                        <p><strong>التنقل في الألعاب:</strong> للتحكم في حركة الشخصيات بين مجموعة من النقاط الثابتة على الخريطة.</p>
                    </InfoCard>
                </div>
            </section>
            
            <CircularLinkedListVisualizer />
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">التنفيذ باستخدام C++</h3>
                 <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">يعتمد التنفيذ على نفس بنية العقدة للقائمة البسيطة، ولكن المنطق يختلف عند الإضافة والعرض لضمان الحفاظ على الهيكل الدائري.</p>
                 
                <CodeBlock title="تعريف الفئة والتعامل مع المؤشر الأخير">
                    <Comment>// يمكن استخدام نفس تعريف العقدة (Node) للقائمة البسيطة</Comment>{'\n'}
                    <Keyword>class</Keyword> CircularLinkedList {'{'}{'\n'}
                    <Keyword>private</Keyword>:{'\n'}
                    {'    '}Node* last;  <Comment>// نستخدم مؤشرًا للعقدة الأخيرة بدلاً من الرأس لتسهيل الإضافة</Comment>{'\n\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Func>CircularLinkedList</Func>() : last(<Keyword>nullptr</Keyword>) {'{}'} {'\n'}
                     {'    '}<Comment>// إذا كان last لا يساوي nullptr، فإن last->next هو الرأس</Comment>{'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>addToEnd</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>display</Func>();{'\n'}
                    {'}'};
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">1. عرض عناصر القائمة الدائرية</h4>
                <p className="text-slate-600 mb-4">يبدأ الاجتياز من الرأس (`last->next`) ويتوقف عندما نعود إليه مرة أخرى.</p>
                <CodeBlock title="دالة display">
                    <Keyword>void</Keyword> CircularLinkedList::<Func>display</Func>() {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (last == <Keyword>nullptr</Keyword>) {'{'} <Comment>// 1. التحقق إذا كانت القائمة فارغة</Comment>{'\n'}
                    {'        '}cout &lt;&lt; <StringLiteral>"القائمة فارغة!"</StringLiteral> &lt;&lt; endl;{'\n'}
                    {'        '}<Keyword>return</Keyword>;{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}Node* temp = last-&gt;next; <Comment>// 2. البدء من الرأس</Comment>{'\n'}
                    {'    '}<Keyword>do</Keyword> {'{'} <Comment>// 3. استخدام do-while لطباعة الرأس مرة واحدة على الأقل</Comment>{'\n'}
                    {'        '}cout &lt;&lt; temp-&gt;data &lt;&lt; <StringLiteral>" -> "</StringLiteral>;{'\n'}
                    {'        '}temp = temp-&gt;next;{'\n'}
                    {'    '}{'}'} <Keyword>while</Keyword> (temp != last-&gt;next); <Comment>// 4. شرط التوقف هو العودة للرأس</Comment>{'\n'}
                    {'}'}
                </CodeBlock>
                
                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">2. الإضافة في القائمة</h4>
                 <p className="text-slate-600 mb-4">عند إضافة عنصر جديد، يجب أن يوضع بين العقدة الأخيرة والرأس، وتصبح هي العقدة الأخيرة الجديدة.</p>
                <CodeBlock title="دالة addToEnd">
                    <Keyword>void</Keyword> CircularLinkedList::<Func>addToEnd</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {/* FIX: Corrected JSX syntax for C++ aggregate initialization to prevent parsing errors. */}
                    {'    '}Node* newNode = <Keyword>new</Keyword> Node{'{'}{'value, '}<Keyword>nullptr</Keyword>{'}'};{'\n\n'}
                    {'    '}<Keyword>if</Keyword> (last == <Keyword>nullptr</Keyword>) {'{'} <Comment>// الحالة 1: القائمة فارغة</Comment>{'\n'}
                    {'        '}last = newNode;{'\n'}
                    {'        '}last-&gt;next = last; <Comment>// تشير إلى نفسها</Comment>{'\n'}
                    {'    '}{'}'} <Keyword>else</Keyword> {'{'} <Comment>// الحالة 2: القائمة تحتوي على عناصر</Comment>{'\n'}
                    {'        '}newNode-&gt;next = last-&gt;next; <Comment>// العقدة الجديدة تشير إلى الرأس القديم</Comment>{'\n'}
                    {'        '}last-&gt;next = newNode; <Comment>// العقدة الأخيرة القديمة تشير للعقدة الجديدة</Comment>{'\n'}
                    {'        '}last = newNode; <Comment>// العقدة الجديدة هي الآن الأخيرة</Comment>{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'}'}
                </CodeBlock>
            </section>
        </div>
    );
};

export default CircularLinkedListTopic;
