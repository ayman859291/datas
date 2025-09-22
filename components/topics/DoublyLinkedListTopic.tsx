import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';
import { TopicComponentProps } from '../../types';

interface DoublyNode {
    value: number;
    id: number;
}

const DoublyLinkedListVisualizer: React.FC = () => {
    const [nodes, setNodes] = useState<DoublyNode[]>([
        { value: 10, id: 1 },
        { value: 20, id: 2 },
        { value: 30, id: 3 },
    ]);
    const [addValue, setAddValue] = useState('');
    const [removeValue, setRemoveValue] = useState('');

    const addNodeToEnd = () => {
        const value = parseInt(addValue, 10);
        if (!isNaN(value)) {
            setNodes([...nodes, { value, id: Date.now() }]);
            setAddValue('');
        }
    };
    
    const removeNodeByValue = () => {
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
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-amber-500 shadow-md">
            <h3 className="text-xl font-bold text-amber-700 mb-2 flex items-center gap-2"><span className="text-2xl">⛓️</span> محاكي القائمة المزدوجة</h3>
            <p className="text-slate-600 mb-4">أضف أو احذف عقدًا لتتخيل كيف تعمل القائمة المزدوجة وكيف يتم تحديث مؤشرات `next` و `prev`.</p>
            
            <div className="flex flex-wrap items-center justify-center p-4 min-h-[80px]">
                <div className="text-red-500 font-bold px-3 py-1 rounded-lg mr-2 text-lg">NULL</div>
                <div className="text-2xl font-bold text-slate-400 mx-1">↔</div>
                
                {nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                        <div className="flex items-center bg-white rounded-lg shadow-lg animate-fade-in-up">
                            <div className="bg-slate-300 w-8 h-12 flex items-center justify-center rounded-l-lg">
                                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                            <div className="bg-amber-500 text-white font-mono font-bold w-12 h-12 flex items-center justify-center text-lg">{node.value}</div>
                            <div className="bg-slate-300 w-8 h-12 flex items-center justify-center rounded-r-lg">
                                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                            </div>
                        </div>
                        {index < nodes.length - 1 && <div className="text-2xl font-bold text-slate-400 mx-1">↔</div>}
                    </React.Fragment>
                ))}
                 <div className="text-2xl font-bold text-slate-400 mx-1">↔</div>
                 <div className="text-red-500 font-bold px-3 py-1 rounded-lg ml-2 text-lg">NULL</div>
            </div>

            <div className="mt-6 flex justify-center items-center gap-4 flex-wrap border-t pt-6">
                 <div>
                    <input type="number" value={addValue} onChange={(e) => setAddValue(e.target.value)} placeholder="قيمة للإضافة للنهاية" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-400 transition" />
                    <button onClick={addNodeToEnd} className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition mr-2">إضافة</button>
                </div>
                 <div>
                    <input type="number" value={removeValue} onChange={(e) => setRemoveValue(e.target.value)} placeholder="قيمة للحذف" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-red-400 transition" />
                    <button onClick={removeNodeByValue} className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition mr-2">حذف</button>
                </div>
            </div>
        </div>
    );
};


const DoublyLinkedListTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">القوائم المرتبطة المزدوجة</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    تطور للقائمة البسيطة، حيث تحتوي كل عقدة على مؤشرين: واحد للعقدة التالية وآخر للعقدة السابقة، مما يتيح التنقل في كلا الاتجاهين.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">لماذا نستخدم القائمة المزدوجة؟</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <InfoCard icon="↔️" title="تنقل ثنائي الاتجاه" iconBgClass="bg-sky-500">
                        <p>الميزة الأكبر هي القدرة على اجتياز القائمة للأمام (باستخدام `next`) وللخلف (باستخدام `prev`). هذا مفيد جدًا في تطبيقات مثل محررات النصوص (للتنقل بين الأحرف) أو تاريخ المتصفح.</p>
                    </InfoCard>
                    <InfoCard icon="🗑️" title="حذف أسهل" iconBgClass="bg-rose-500">
                        <p>عملية الحذف تكون أبسط إلى حد ما. إذا كان لدينا مؤشر للعقدة التي نريد حذفها، يمكننا الوصول مباشرة إلى العقدة السابقة لها عبر مؤشر `prev` دون الحاجة إلى البحث عنها من البداية.</p>
                    </InfoCard>
                </div>
            </section>
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">البنية الأساسية للعقدة المزدوجة</h3>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <InfoCard icon="🧱" title="مكونات العقدة المزدوجة" iconBgClass="bg-indigo-500">
                       <p>كل عقدة في القائمة المزدوجة تحتوي على ثلاثة أجزاء رئيسية:</p>
                       <p><strong>1. المؤشر السابق (Prev Pointer):</strong> عنوان في الذاكرة يشير إلى العقدة السابقة. في العقدة الأولى (Head)، يكون `NULL`.</p>
                       <p><strong>2. البيانات (Data):</strong> القيمة الفعلية المخزنة.</p>
                       <p><strong>3. المؤشر التالي (Next Pointer):</strong> عنوان في الذاكرة يشير إلى العقدة التالية. في العقدة الأخيرة، يكون `NULL`.</p>
                    </InfoCard>
                     <div className="bg-white/50 p-4 rounded-lg shadow-md text-center">
                        <img src="https://i.imgur.com/3j7g5g8.png" alt="Doubly Linked List Structure" className="mx-auto rounded-lg" />
                        <p className="mt-2 text-sm text-slate-600">رسم توضيحي يوضح بنية العقدة المزدوجة.</p>
                    </div>
                </div>
            </section>

            <DoublyLinkedListVisualizer />
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">التنفيذ باستخدام C++</h3>
                <CodeBlock title="تعريف فئة Node و DoublyLinkedList">
                    <Comment>// فئة لتمثيل العقدة المزدوجة</Comment>{'\n'}
                    <Keyword>class</Keyword> Node {'{'}{'\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Keyword>int</Keyword> data;      <Comment>// البيانات</Comment>{'\n'}
                    {'    '}Node* next;    <Comment>// مؤشر للتالي</Comment>{'\n'}
                    {'    '}Node* prev;    <Comment>// مؤشر للسابق</Comment>{'\n'}
                    {'}'};{'\n\n'}
                    
                    <Keyword>class</Keyword> DoublyLinkedList {'{'}{'\n'}
                    <Keyword>private</Keyword>:{'\n'}
                    {'    '}Node* head;  <Comment>// مؤشر للبداية</Comment>{'\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Func>DoublyLinkedList</Func>() : head(<Keyword>nullptr</Keyword>) {'{}'} {'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>insertAtBeginning</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'    '}<Keyword>void</Keyword> <Func>deleteNode</Func>(<Keyword>int</Keyword> value);{'\n'}
                    {'}'};
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">1. الإضافة في بداية القائمة</h4>
                <p className="text-slate-600 mb-4">عند الإضافة في البداية، يجب تحديث مؤشر `prev` للرأس القديم (إذا كان موجودًا) ليشير إلى العقدة الجديدة.</p>
                <CodeBlock title="دالة insertAtBeginning">
                    <Keyword>void</Keyword> DoublyLinkedList::<Func>insertAtBeginning</Func>(<Keyword>int</Keyword> value) {'{'}{'\n'}
                    {'    '}Node* newNode = <Keyword>new</Keyword> Node(); <Comment>// 1. إنشاء عقدة جديدة</Comment>{'\n'}
                    {'    '}newNode-&gt;data = value;{'\n'}
                    {'    '}newNode-&gt;next = head; <Comment>// 2. ربطها بالرأس القديم</Comment>{'\n'}
                    {'    '}newNode-&gt;prev = <Keyword>nullptr</Keyword>; <Comment>// هي الآن العقدة الأولى</Comment>{'\n\n'}
                    {'    '}<Keyword>if</Keyword> (head != <Keyword>nullptr</Keyword>) {'{'} <Comment>// 3. إذا لم تكن القائمة فارغة</Comment>{'\n'}
                    {'        '}head-&gt;prev = newNode; <Comment>//   اجعل الرأس القديم يشير للخلف للعقدة الجديدة</Comment>{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}head = newNode; <Comment>// 4. تحديث الرأس</Comment>{'\n'}
                    {'}'}
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">2. حذف عقدة</h4>
                <p className="text-slate-600 mb-4">عند الحذف، يجب ربط العقدة السابقة بالعقدة التالية مباشرة، مع الانتباه للحالات الخاصة مثل حذف الرأس.</p>
                <CodeBlock title="دالة deleteNode">
                    <Comment>// ... (كود البحث عن العقدة المراد حذفها: `current`)</Comment>{'\n'}
                    <Keyword>if</Keyword> (current == <Keyword>nullptr</Keyword>) <Keyword>return</Keyword>; <Comment>// لم يتم العثور عليها</Comment>{'\n\n'}
                    <Keyword>if</Keyword> (current == head) {'{'} <Comment>// الحالة 1: حذف الرأس</Comment>{'\n'}
                    {'    '}head = current-&gt;next;{'\n'}
                    {'}'}{'\n\n'}
                    <Keyword>if</Keyword> (current-&gt;next != <Keyword>nullptr</Keyword>) {'{'} <Comment>// الحالة 2: تحديث مؤشر `prev` للعقدة التالية</Comment>{'\n'}
                    {'    '}current-&gt;next-&gt;prev = current-&gt;prev;{'\n'}
                    {'}'}{'\n\n'}
                    <Keyword>if</Keyword> (current-&gt;prev != <Keyword>nullptr</Keyword>) {'{'} <Comment>// الحالة 3: تحديث مؤشر `next` للعقدة السابقة</Comment>{'\n'}
                    {'    '}current-&gt;prev-&gt;next = current-&gt;next;{'\n'}
                    {'}'}{'\n\n'}
                    <Keyword>delete</Keyword> current; <Comment>// تحرير الذاكرة</Comment>{'\n'}
                </CodeBlock>
            </section>
        </div>
    );
};

export default DoublyLinkedListTopic;
