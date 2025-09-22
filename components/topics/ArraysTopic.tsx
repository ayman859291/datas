import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';

const MemoryVisualizer: React.FC = () => {
    const memoryData = {
        values: [45, 23, 67, 12, 89, 34, 56, 78],
        addresses: [1000, 1004, 1008, 1012, 1016, 1020, 1024, 1028]
    };

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleCellClick = (index: number) => {
        setActiveIndex(index);
        setInputValue(String(index));
    };

    const handleAccess = () => {
        const index = parseInt(inputValue, 10);
        if (!isNaN(index) && index >= 0 && index < memoryData.values.length) {
            setActiveIndex(index);
        } else {
            setActiveIndex(null);
            alert('يرجى إدخال مؤشر صالح بين 0 و 7');
        }
    };
    
    const handleReset = () => {
        setActiveIndex(null);
        setInputValue('');
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-green-500 shadow-md">
            <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2"><span className="text-2xl">🧮</span> محاكي الذاكرة التفاعلي</h3>
            <p className="text-slate-600 mb-4">انقر على الخانات أو أدخل مؤشرًا لتصور كيفية تخزين المصفوفة في الذاكرة.</p>
            <div className="text-center font-mono text-slate-700 mb-4">
                <strong>المصفوفة: int numbers[8] = {'{45, 23, 67, 12, 89, 34, 56, 78}'}</strong>
            </div>
            <div className="flex justify-center gap-1 my-4">
                {memoryData.values.map((value, index) => (
                    <div key={index} onClick={() => handleCellClick(index)} 
                        className={`
                            relative group w-14 h-12 flex items-center justify-center font-bold border-2 rounded-md cursor-pointer transition-all duration-300
                            ${activeIndex === index ? 'bg-green-500 text-white border-green-600 scale-110 shadow-lg' : 'bg-slate-200 border-slate-400 hover:bg-slate-300 hover:border-slate-500'}
                        `}>
                        {value}
                        <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 bg-slate-800 text-white text-xs px-2 py-1 rounded">
                            {`addr: ${memoryData.addresses[index]}`}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center font-mono text-sm text-slate-500 mb-6">
                <div className="flex justify-center gap-1">
                  {memoryData.addresses.map((_, index) => <div key={index} className="w-14">{index}</div>)}
                </div>
                <div className="text-xs">المؤشرات</div>
            </div>
             <div className="flex justify-center items-center gap-3 flex-wrap">
                <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="أدخل المؤشر (0-7)" min="0" max="7" className="p-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition" />
                <button onClick={handleAccess} className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition">الوصول للعنصر</button>
                <button onClick={handleReset} className="bg-slate-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-slate-600 transition">إعادة تعيين</button>
            </div>
            {activeIndex !== null && (
                 <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center animate-fade-in-up">
                    <strong>النتيجة:</strong> المؤشر: <span className="font-bold text-blue-600">{activeIndex}</span> | 
                    القيمة: <span className="font-bold text-blue-600">{memoryData.values[activeIndex]}</span> | 
                    العنوان: <span className="font-bold text-blue-600">{memoryData.addresses[activeIndex]}</span> | 
                    التعقيد: <span className="font-bold text-blue-600">O(1)</span>
                </div>
            )}
        </div>
    );
};

interface ArraysTopicProps {
    onStartQuiz: () => void;
}

const ArraysTopic: React.FC<ArraysTopicProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">المصفوفات (Arrays)</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    المصفوفات هي أبسط وأهم هياكل البيانات، حيث تخزن مجموعة من العناصر من نفس النوع في مواضع ذاكرة متتالية. تتميز بالوصول السريع للعناصر عبر المؤشرات.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل (15 سؤال)
                    </button>
                </div>
            </header>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">ما هي المصفوفات؟</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoCard icon="📏" title="الخصائص الأساسية" iconBgClass="bg-blue-500">
                        <p><strong>الحجم الثابت:</strong> يتم تحديد حجم المصفوفة عند التصريح ولا يمكن تغييره لاحقاً.</p>
                        <p><strong>العناصر المتجانسة:</strong> جميع العناصر يجب أن تكون من نفس نوع البيانات.</p>
                        <p><strong>الذاكرة المتتالية:</strong> تُخزن العناصر في الذاكرة في أماكن متجاورة، مما يسمح بالوصول السريع.</p>
                    </InfoCard>
                    <InfoCard icon="⚙️" title="مصطلحات أساسية" iconBgClass="bg-purple-500">
                        <p><strong>العنصر (Element):</strong> كل قيمة مخزنة في المصفوفة.</p>
                        <p><strong>المؤشر (Index):</strong> رقم فريد يحدد موقع كل عنصر، ويبدأ من 0.</p>
                        <p><strong>مُحدِّد الحجم (Size Declarator):</strong> الرقم الذي يحدد عدد العناصر التي يمكن للمصفوفة تخزينها.</p>
                    </InfoCard>
                    <InfoCard icon="🎯" title="التطبيقات العملية" iconBgClass="bg-pink-500">
                        <p><strong>معالجة الصور:</strong> تمثيل شبكة البيكسلات.</p>
                        <p><strong>الحوسبة العلمية:</strong> تمثيل المصفوفات والمتجهات الرياضية.</p>
                        <p><strong>الألعاب:</strong> تصميم خرائط المستويات أو شبكات اللعبة.</p>
                    </InfoCard>
                </div>
                <CodeBlock title="التصريح الأساسي عن مصفوفة">
                    <Comment>// التصريح عن مصفوفة من نوع عدد صحيح (integer) يمكنها تخزين 5 عناصر</Comment>{'\n'}
                    <Keyword>int</Keyword> scores[<NumberLiteral>5</NumberLiteral>];{'\n\n'}
                    <Comment>// من الأفضل دائمًا استخدام ثابت لتحديد الحجم لتسهيل التعديلات المستقبلية</Comment>{'\n'}
                    <Keyword>const int</Keyword> NUMBER_OF_STUDENTS = <NumberLiteral>25</NumberLiteral>;{'\n'}
                    <Keyword>double</Keyword> grades[NUMBER_OF_STUDENTS];
                </CodeBlock>
            </section>

            <MemoryVisualizer />

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">الوصول للعناصر واستخدام الحلقات</h3>
                <p className="text-center text-slate-600 mb-6 max-w-2xl mx-auto">يتم الوصول لكل عنصر في المصفوفة بشكل فردي باستخدام اسمه متبوعًا بمؤشر العنصر بين قوسين `[]`. الحلقات التكرارية هي الطريقة المثلى لمعالجة جميع عناصر المصفوفة بكفاءة.</p>
                <CodeBlock title="التعامل مع عناصر المصفوفة">
                    <Keyword>const int</Keyword> SIZE = <NumberLiteral>3</NumberLiteral>;{'\n'}
                    <Keyword>int</Keyword> values[SIZE];{'\n\n'}
                    <Comment>// إسناد قيم لعناصر المصفوفة</Comment>{'\n'}
                    values[<NumberLiteral>0</NumberLiteral>] = <NumberLiteral>10</NumberLiteral>; <Comment>// العنصر الأول</Comment>{'\n'}
                    values[<NumberLiteral>1</NumberLiteral>] = <NumberLiteral>20</NumberLiteral>; <Comment>// العنصر الثاني</Comment>{'\n'}
                    values[<NumberLiteral>2</NumberLiteral>] = <NumberLiteral>30</NumberLiteral>; <Comment>// العنصر الثالث</Comment>{'\n\n'}
                    <Comment>// استخدام الحلقات لطباعة جميع العناصر</Comment>{'\n'}
                    cout &lt;&lt; <StringLiteral>"عناصر المصفوفة هي: "</StringLiteral>;{'\n'}
                    <Keyword>for</Keyword> (<Keyword>int</Keyword> i = <NumberLiteral>0</NumberLiteral>; i &lt; SIZE; i++) {'{'}{'\n'}
                    {'    '}cout &lt;&lt; values[i] &lt;&lt; <StringLiteral>" "</StringLiteral>;{'\n'}
                    {'}'}{'\n'}
                    <Comment>// الناتج: عناصر المصفوفة هي: 10 20 30</Comment>
                </CodeBlock>
            </section>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">تهيئة المصفوفات</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-700">التهيئة الكاملة والضمنية</h4>
                        <p className="text-slate-600 mb-4">يمكنك إعطاء المصفوفة قيمًا أولية عند التصريح عنها باستخدام قائمة التهيئة `{}`. إذا لم تحدد الحجم، سيقوم المترجم بتحديده بناءً على عدد العناصر في القائمة.</p>
                        <CodeBlock title="Full & Implicit Initialization">
                            <Comment>// تهيئة كاملة مع تحديد الحجم</Comment>{'\n'}
                            <Keyword>int</Keyword> temps[<NumberLiteral>4</NumberLiteral>] = {'{'} <NumberLiteral>34</NumberLiteral>, <NumberLiteral>36</NumberLiteral>, <NumberLiteral>33</NumberLiteral>, <NumberLiteral>30</NumberLiteral> {'}'};{'\n\n'}
                            <Comment>// تهيئة ضمنية، الحجم يتحدد بـ 4 تلقائياً</Comment>{'\n'}
                            <Keyword>int</Keyword> quizzes[] = {'{'} <NumberLiteral>12</NumberLiteral>, <NumberLiteral>17</NumberLiteral>, <NumberLiteral>15</NumberLiteral>, <NumberLiteral>11</NumberLiteral> {'}'};
                        </CodeBlock>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-700">التهيئة الجزئية</h4>
                        <p className="text-slate-600 mb-4">إذا كانت قائمة التهيئة تحتوي على عناصر أقل من حجم المصفوفة، سيتم تهيئة العناصر المتبقية بالقيمة صفر تلقائيًا.</p>
                         <CodeBlock title="Partial Initialization">
                            <Comment>// مصفوفة حجمها 7، تم تهيئة أول 4 عناصر فقط</Comment>{'\n'}
                            <Keyword>int</Keyword> numbers[<NumberLiteral>7</NumberLiteral>] = {'{'} <NumberLiteral>1</NumberLiteral>, <NumberLiteral>2</NumberLiteral>, <NumberLiteral>4</NumberLiteral>, <NumberLiteral>8</NumberLiteral> {'}'};{'\n\n'}
                            <Comment>// محتوى المصفوفة سيكون:</Comment>{'\n'}
                            {/* FIX: Wrapped comment in a string literal to prevent JSX parsing errors. */}
                            <Comment>{'// { 1, 2, 4, 8, 0, 0, 0 }'}</Comment>
                        </CodeBlock>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">العمليات الأساسية على المصفوفات</h3>
                
                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-6">1. البحث (Search)</h4>
                <p className="text-slate-600 mb-4">البحث الخطي هو أبسط طريقة، حيث نمر على كل عنصر في المصفوفة ونقارنه بالقيمة المطلوبة حتى نجدها أو نصل إلى نهاية المصفوفة.</p>
                <CodeBlock title="دالة البحث الخطي">
                    <Keyword>int</Keyword> <Func>linearSearch</Func>(<Keyword>int</Keyword> arr[], <Keyword>int</Keyword> size, <Keyword>int</Keyword> key) {'{'}{'\n'}
                    {'    '}<Keyword>for</Keyword> (<Keyword>int</Keyword> i = <NumberLiteral>0</NumberLiteral>; i &lt; size; i++) {'{'}{'\n'}
                    {'        '}<Keyword>if</Keyword> (arr[i] == key) {'{'}{'\n'}
                    {'            '}<Keyword>return</Keyword> i; <Comment>// تم العثور على العنصر، أرجع مؤشره</Comment>{'\n'}
                    {'        '}{'}'}{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'    '}<Keyword>return</Keyword> -<NumberLiteral>1</NumberLiteral>; <Comment>// لم يتم العثور على العنصر</Comment>{'\n'}
                    {'}'}
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">2. الإضافة (Insertion)</h4>
                <p className="text-slate-600 mb-4">لإضافة عنصر في منتصف المصفوفة، يجب إزاحة جميع العناصر التي تليه بمقدار خانة واحدة إلى اليمين لتوفير مساحة للعنصر الجديد. هذه العملية تجعل تعقيد الإضافة O(n).</p>
                <CodeBlock title="دالة إضافة عنصر في مؤشر محدد">
                    <Comment>// arr: المصفوفة, n: عدد العناصر الحالي, capacity: سعة المصفوفة القصوى</Comment>{'\n'}
                    <Comment>// key: القيمة المراد إضافتها, index: المكان المراد الإضافة فيه</Comment>{'\n'}
                    <Keyword>bool</Keyword> <Func>insertAtIndex</Func>(<Keyword>int</Keyword> arr[], <Keyword>int</Keyword>& n, <Keyword>int</Keyword> capacity, <Keyword>int</Keyword> key, <Keyword>int</Keyword> index) {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (n &gt;= capacity || index &lt; <NumberLiteral>0</NumberLiteral> || index &gt; n) {'{'}{'\n'}
                    {'        '}<Keyword>return false</Keyword>; <Comment>// لا يمكن الإضافة</Comment>{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}<Comment>// إزاحة العناصر إلى اليمين</Comment>{'\n'}
                    {'    '}<Keyword>for</Keyword> (<Keyword>int</Keyword> i = n - <NumberLiteral>1</NumberLiteral>; i &gt;= index; i--) {'{'}{'\n'}
                    {'        '}arr[i + <NumberLiteral>1</NumberLiteral>] = arr[i];{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}arr[index] = key; <Comment>// وضع العنصر الجديد</Comment>{'\n'}
                    {'    '}n++; <Comment>// زيادة عدد العناصر</Comment>{'\n'}
                    {'    '}<Keyword>return true</Keyword>;{'\n'}
                    {'}'}
                </CodeBlock>

                <h4 className="font-bold text-xl mb-2 text-slate-700 mt-8">3. الحذف (Deletion)</h4>
                <p className="text-slate-600 mb-4">لحذف عنصر، نقوم بإزاحة جميع العناصر التي تليه بمقدار خانة واحدة إلى اليسار لتغطية الفراغ الذي تركه العنصر المحذوف. هذه العملية أيضًا تعقيدها O(n).</p>
                 <CodeBlock title="دالة حذف عنصر من مؤشر محدد">
                    <Comment>// arr: المصفوفة, n: عدد العناصر الحالي</Comment>{'\n'}
                    <Comment>// index: مؤشر العنصر المراد حذفه</Comment>{'\n'}
                    <Keyword>bool</Keyword> <Func>deleteFromIndex</Func>(<Keyword>int</Keyword> arr[], <Keyword>int</Keyword>& n, <Keyword>int</Keyword> index) {'{'}{'\n'}
                    {'    '}<Keyword>if</Keyword> (index &lt; <NumberLiteral>0</NumberLiteral> || index &gt;= n) {'{'}{'\n'}
                    {'        '}<Keyword>return false</Keyword>; <Comment>// مؤشر غير صالح</Comment>{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}<Comment>// إزاحة العناصر إلى اليسار</Comment>{'\n'}
                    {'    '}<Keyword>for</Keyword> (<Keyword>int</Keyword> i = index; i &lt; n - <NumberLiteral>1</NumberLiteral>; i++) {'{'}{'\n'}
                    {'        '}arr[i] = arr[i + <NumberLiteral>1</NumberLiteral>];{'\n'}
                    {'    '}{'}'}{'\n\n'}
                    {'    '}n--; <Comment>// إنقاص عدد العناصر</Comment>{'\n'}
                    {'    '}<Keyword>return true</Keyword>;{'\n'}
                    {'}'}
                </CodeBlock>

            </section>
        </div>
    );
};

export default ArraysTopic;