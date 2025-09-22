import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';
import { TopicComponentProps } from '../../types';

interface Node {
    value: number;
    id: number;
}

const LinkedListVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>([
        { value: 10, id: 1 },
        { value: 20, id: 2 },
        { value: 30, id: 3 },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [removeValue, setRemoveValue] = useState('');

    const addNode = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            setNodes([...nodes, { value, id: Date.now() }]);
            setInputValue('');
        }
    };
    
    const removeNode = () => {
        const value = parseInt(removeValue, 10);
        if (!isNaN(value)) {
            const nodeIndex = nodes.findIndex(n => n.value === value);
            if(nodeIndex !== -1) {
                setNodes(nodes.filter((_, index) => index !== nodeIndex));
            } else {
                alert('العقدة غير موجودة!');
            }
            setRemoveValue('');
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-blue-500 shadow-md">
            <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2"><span className="text-2xl">🔗</span> محاكي القائمة المرتبطة</h3>
            <p className="text-slate-600 mb-4">أضف أو احذف عقدًا لتتخيل كيف تعمل القائمة المرتبطة وكيف تتغير المؤشرات.</p>
            
            <div className="flex flex-wrap items-center justify-center p-4 min-h-[80px]">
                <div className="bg-purple-500 text-white font-bold px-3 py-1 rounded-lg mr-2 shadow-md">Head</div>
                {nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                        <div className="text-2xl font-bold text-slate-400 mx-1">→</div>
                        <div className="flex items-center bg-white rounded-lg shadow-lg animate-fade-in-up">
                            <div className="bg-indigo-500 text-white font-mono font-bold w-12 h-12 flex items-center justify-center text-lg rounded-l-lg">{node.value}</div>
                            <div className="bg-slate-300 w-8 h-12 flex items-center justify-center rounded-r-lg">
                                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
                 <div className="text-2xl font-bold text-slate-400 mx-1">→</div>
                 <div className="text-red-500 font-bold px-3 py-1 rounded-lg ml-2 text-lg">NULL</div>
            </div>

            <div className="mt-6 flex justify-center items-center gap-4 flex-wrap border-t pt-6">
                 <div>
                    <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="أدخل قيمة للإضافة" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition" />
                    <button onClick={addNode} className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition mr-2">إضافة للنهاية</button>
                </div>
                 <div>
                    <input type="number" value={removeValue} onChange={(e) => setRemoveValue(e.target.value)} placeholder="أدخل قيمة للحذف" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition" />
                    <button onClick={removeNode} className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition mr-2">حذف عقدة</button>
                </div>
            </div>
        </div>
    );
};


const LinkedListTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">القوائم المترابطة (Linked Lists)</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    بنية بيانات ديناميكية تتكون من سلسلة من العُقد، حيث تحتوي كل عقدة على بيانات ومؤشر للعقدة التالية. إنها بديل مرن للمصفوفات.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل (15 سؤال)
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">لماذا نستخدم القوائم المرتبطة؟</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <InfoCard icon="⚡" title="الميزة الديناميكية" iconBgClass="bg-green-500">
                        <p><strong>حجم مرن:</strong> يمكن للقوائم المرتبطة أن تنمو وتتقلص بسهولة أثناء تشغيل البرنامج، على عكس المصفوفات التي لها حجم ثابت يتم تحديده عند الترجمة.</p>
                        <p><strong>لا حاجة للتخمين:</strong> لا نحتاج إلى معرفة عدد العناصر مسبقًا. يتم إنشاء العقد في الذاكرة حسب الحاجة.</p>
                    </InfoCard>
                    <InfoCard icon="🚀" title="إضافة وحذف فعال" iconBgClass="bg-orange-500">
                        <p><strong>سرعة في التعديل:</strong> لإدراج أو حذف عنصر، كل ما نحتاجه هو إعادة توجيه بعض المؤشرات، وهي عملية سريعة جدًا (O(1)).</p>
                        <p><strong>لا حاجة للإزاحة:</strong> على عكس المصفوفات، لا نحتاج إلى إزاحة العناصر الأخرى عند الإضافة أو الحذف، مما يوفر الكثير من الوقت عند التعامل مع كميات كبيرة من البيانات.</p>
                    </InfoCard>
                </div>
            </section>

             <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">البنية الأساسية للقائمة المرتبطة</h3>
                 <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <InfoCard icon="🧱" title="مكونات العقدة (Node)" iconBgClass="bg-indigo-500">
                           <p>كل قائمة مرتبطة تتكون من عقد. كل عقدة هي كائن يحتوي على جزأين رئيسيين:</p>
                           <p><strong>1. البيانات (Data):</strong> القيمة الفعلية التي نريد تخزينها (رقم، نص، كائن، إلخ).</p>
                           <p><strong>2. المؤشر (Next Pointer):</strong> عنوان في الذاكرة يشير إلى العقدة التالية في السلسلة. العقدة الأخيرة تشير إلى `NULL`.</p>
                        </InfoCard>
                         <InfoCard icon="📍" title="المؤشر الرئيسي (Head)" iconBgClass="bg-purple-500">
                           <p>الـ `Head` هو مؤشر خاص يشير دائمًا إلى العقدة الأولى في القائمة. إنه نقطة البداية والوصول للقائمة بأكملها. إذا فقدنا مؤشر `Head`، فإننا نفقد القائمة بأكملها.</p>
                        </InfoCard>
                    </div>
                     <div className="bg-white/50 p-4 rounded-lg shadow-md text-center">
                        <img src="https://i.imgur.com/v1bA5VB.png" alt="Linked List Structure" className="mx-auto rounded-lg" />
                        <p className="mt-2 text-sm text-slate-600">رسم توضيحي يوضح ترابط العقد من `Head` إلى `NULL`.</p>
                    </div>
                 </div>
            </section>

            <LinkedListVisualizer />
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">التنفيذ باستخدام C++</h3>
                <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">عادةً، نستخدم فئتين (classes) لتنفيذ قائمة مرتبطة: فئة `Node` لتمثيل العقدة، وفئة `LinkedList` لإدارة العمليات على القائمة مثل الإضافة، الحذف، والبحث.</p>

                <CodeBlock title="تعريف فئة Node و LinkedList">
                    <Comment>// فئة لتمثيل العقدة الواحدة</Comment>{'\n'}
                    <Keyword>class</Keyword> Node {'{'}{'\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Keyword>int</Keyword> data;      <Comment>// البيانات المخزنة</Comment>{'\n'}
                    {'    '}Node* next;    <Comment>// مؤشر للعقدة التالية</Comment>{'\n'}
                    {'}'};{'\n\n'}
                    
                    <Comment>// فئة لإدارة عمليات القائمة المرتبطة</Comment>{'\n'}
                    <Keyword>class</Keyword> LinkedList {'{'}{'\n'}
                    <Keyword>private</Keyword>:{'\n'}
                    {'    '}Node* head;  <Comment>// مؤشر لأول عقدة في القائمة</Comment>{'\n\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Func>LinkedList</Func>() {'{'} head = <Keyword>nullptr</Keyword>; {'}'} <Comment>// Constructor</Comment>{'\n\n'}
                    {'    '}<Keyword>void</Keyword> <Func>insertAtEnd</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>insertAtBeginning</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>bool</Keyword> <Func>deleteNode</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>display</Func>();{'\n'}
                    {'}'};
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">1. الإضافة في نهاية القائمة</h4>
                <CodeBlock title="دالة insertAtEnd">
                    <Keyword>void</Keyword> LinkedList::<Func>insertAtEnd</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {'    '}Node* newNode = <Keyword>new</Keyword> Node(); <Comment>// 1. إنشاء عقدة جديدة</Comment>{'\n'}
                    {'    '}newNode-&gt;data = value;{'\n'}
                    {'    '}newNode-&gt;next = <Keyword>nullptr</Keyword>; <Comment>// ستكون العقدة الأخيرة</Comment>{'\n\n'}
                    {'    '}<Keyword>if</Keyword> (head == <Keyword>nullptr</Keyword>) {'{'} <Comment>// 2. إذا كانت القائمة فارغة</Comment>{'\n'}
                    {'        '}head = newNode;{'\n'}
                    {'        '}<Keyword>return</Keyword>;{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}Node* temp = head; <Comment>// 3. المرور إلى نهاية القائمة</Comment>{'\n'}
                    {'    '}<Keyword>while</Keyword> (temp-&gt;next != <Keyword>nullptr</Keyword>) {'{'}{'\n'}
                    {'        '}temp = temp-&gt;next;{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}temp-&gt;next = newNode; <Comment>// 4. ربط العقدة الأخيرة بالعقدة الجديدة</Comment>{'\n'}
                    {'}'}
                </CodeBlock>
                 <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">2. الإضافة في بداية القائمة</h4>
                <CodeBlock title="دالة insertAtBeginning">
                    <Keyword>void</Keyword> LinkedList::<Func>insertAtBeginning</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {'    '}Node* newNode = <Keyword>new</Keyword> Node(); <Comment>// 1. إنشاء عقدة جديدة</Comment>{'\n'}
                    {'    '}newNode-&gt;data = value;{'\n\n'}
                    {'    '}newNode-&gt;next = head; <Comment>// 2. جعل العقدة الجديدة تشير إلى الرأس القديم</Comment>{'\n'}
                    {'    '}head = newNode; <Comment>// 3. تحديث الرأس ليصبح العقدة الجديدة</Comment>{'\n'}
                    {'}'}
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">3. حذف عقدة</h4>
                <CodeBlock title="دالة deleteNode">
                    <Keyword>bool</Keyword> LinkedList::<Func>deleteNode</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (head == <Keyword>nullptr</Keyword>) <Keyword>return false</Keyword>; <Comment>// القائمة فارغة</Comment>{'\n\n'}
                    {'    '}<Comment>// الحالة 1: العقدة المراد حذفها هي الرأس</Comment>{'\n'}
                    {'    '}<Keyword>if</Keyword> (head-&gt;data == value) {'{'}{'\n'}
                    {'        '}Node* temp = head;{'\n'}
                    {'        '}head = head-&gt;next;{'\n'}
                    {'        '}<Keyword>delete</Keyword> temp;{'\n'}
                    {'        '}<Keyword>return true</Keyword>;{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}<Comment>// الحالة 2: البحث عن العقدة وحذفها</Comment>{'\n'}
                    {'    '}Node* current = head;{'\n'}
                    {'    '}Node* prev = <Keyword>nullptr</Keyword>;{'\n'}
                    {'    '}<Keyword>while</Keyword> (current != <Keyword>nullptr</Keyword> && current-&gt;data != value) {'{'}{'\n'}
                    {'        '}prev = current;{'\n'}
                    {'        '}current = current-&gt;next;{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}<Keyword>if</Keyword> (current == <Keyword>nullptr</Keyword>) <Keyword>return false</Keyword>; <Comment>// لم يتم العثور على العقدة</Comment>{'\n\n'}
                    {'    '}prev-&gt;next = current-&gt;next; <Comment>// تجاوز العقدة المراد حذفها</Comment>{'\n'}
                    {'    '}<Keyword>delete</Keyword> current;{'\n'}
                    {'    '}<Keyword>return true</Keyword>;{'\n'}
                    {'}'}
                </CodeBlock>
            </section>
        </div>
    );
};

export default LinkedListTopic;