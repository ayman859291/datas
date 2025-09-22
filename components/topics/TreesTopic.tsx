import React, { useState, useEffect } from 'react';
import InfoCard from '../InfoCard';
import CodeBlock, { Keyword, StringLiteral, Comment, NumberLiteral, Func } from '../CodeBlock';
import { TopicComponentProps } from '../../types';

interface TreeNodeData {
    id: number;
    value: number;
    left?: number;
    right?: number;
    level: number;
    position: 'left' | 'right' | 'root';
}

const treeData: { [key: number]: TreeNodeData } = {
    2: { id: 2, value: 2, left: 0, right: 3, level: 0, position: 'root' },
    0: { id: 0, value: 0, left: 7, right: 1, level: 1, position: 'left' },
    3: { id: 3, value: 3, left: 9, level: 1, position: 'right' },
    7: { id: 7, value: 7, left: 6, right: 5, level: 2, position: 'left' },
    1: { id: 1, value: 1, right: 8, level: 2, position: 'right' },
    9: { id: 9, value: 9, left: 4, level: 2, position: 'left' },
    6: { id: 6, value: 6, level: 3, position: 'left' },
    5: { id: 5, value: 5, level: 3, position: 'right' },
    8: { id: 8, value: 8, level: 3, position: 'right' },
    4: { id: 4, value: 4, level: 3, position: 'left' },
};

const getTraversalSequence = (type: 'pre' | 'in' | 'post', startNodeId: number = 2): number[] => {
    const sequence: number[] = [];
    const node = treeData[startNodeId];
    if (!node) return [];

    const leftSequence = node.left !== undefined ? getTraversalSequence(type, node.left) : [];
    const rightSequence = node.right !== undefined ? getTraversalSequence(type, node.right) : [];

    switch (type) {
        case 'pre':
            sequence.push(node.id, ...leftSequence, ...rightSequence);
            break;
        case 'in':
            sequence.push(...leftSequence, node.id, ...rightSequence);
            break;
        case 'post':
            sequence.push(...leftSequence, ...rightSequence, node.id);
            break;
    }
    return sequence;
};

const TreeVisualizer: React.FC = () => {
    const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
    const [traversalResult, setTraversalResult] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup timeouts if component unmounts
            setIsAnimating(false);
        };
    }, []);

    const animateTraversal = (sequence: number[]) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTraversalResult([]);
        setHighlightedNode(null);
        
        sequence.forEach((nodeId, index) => {
            setTimeout(() => {
                if (!isAnimating) return;
                setHighlightedNode(nodeId);
                setTraversalResult(prev => [...prev, treeData[nodeId].value]);
                if (index === sequence.length - 1) {
                    setIsAnimating(false);
                    setTimeout(() => setHighlightedNode(null), 1000);
                }
            }, index * 800);
        });
    };

    const renderNode = (nodeId: number) => {
        const node = treeData[nodeId];
        const leftChild = node.left !== undefined ? treeData[node.left] : null;
        const rightChild = node.right !== undefined ? treeData[node.right] : null;

        return (
            <div key={node.id} className="flex flex-col items-center relative p-2">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === node.id ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>
                    {node.value}
                </div>
                {(leftChild || rightChild) && (
                    <div className="flex justify-center absolute top-full mt-2">
                        {leftChild && renderNode(leftChild.id)}
                        {rightChild && renderNode(rightChild.id)}
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 my-8 border-l-4 border-green-500 shadow-md">
            <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2"><span className="text-2xl">🌳</span> محاكي اجتياز الشجرة</h3>
            <p className="text-slate-600 mb-4">انقر على أحد أنواع الاجتياز لتصور الترتيب الذي تتم به زيارة العقد.</p>
            
            <div className="flex justify-center items-start p-4 min-h-[250px] overflow-x-auto">
                {/* This is a simplified visual representation. A real one would need lines and complex positioning */}
                <div className="flex flex-col items-center space-y-8 p-4">
                    {/* Level 0 */}
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === 2 ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>{treeData[2].value}</div>
                    {/* Level 1 */}
                    <div className="flex gap-24">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === 0 ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>{treeData[0].value}</div>
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === 3 ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>{treeData[3].value}</div>
                    </div>
                    {/* Level 2 */}
                     <div className="flex gap-8 w-full -ml-8">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === 7 ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>{treeData[7].value}</div>
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === 1 ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>{treeData[1].value}</div>
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg transition-all duration-300 ${highlightedNode === 9 ? 'bg-green-500 text-white border-green-700 scale-110' : 'bg-white border-slate-400'}`}>{treeData[9].value}</div>
                    </div>
                </div>
            </div>
            
             <div className="mt-4 flex justify-center items-center gap-3 flex-wrap border-t pt-6">
                <button onClick={() => animateTraversal(getTraversalSequence('pre'))} disabled={isAnimating} className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition disabled:opacity-50">Pre-order</button>
                <button onClick={() => animateTraversal(getTraversalSequence('in'))} disabled={isAnimating} className="bg-purple-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-purple-600 transition disabled:opacity-50">In-order</button>
                <button onClick={() => animateTraversal(getTraversalSequence('post'))} disabled={isAnimating} className="bg-orange-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-orange-600 transition disabled:opacity-50">Post-order</button>
            </div>
            
            <div className="mt-4 p-3 bg-slate-200 rounded-lg text-center min-h-[50px]">
                <strong className="mr-2">الناتج:</strong>
                <span className="font-mono font-bold text-lg text-slate-700 tracking-wider">
                    [{traversalResult.join(', ')}]
                </span>
            </div>
        </div>
    );
};

const TreesTopic: React.FC<TopicComponentProps> = ({ onStartQuiz }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            <header className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-green-500 to-lime-500 text-transparent bg-clip-text">الأشجار الثنائية (Binary Trees)</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
                    بنية بيانات هرمية غير خطية، حيث كل عقدة لديها على الأكثر ابنان. إنها أساس للعديد من هياكل البيانات الأكثر تعقيدًا مثل أشجار البحث الثنائية.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                     <button onClick={onStartQuiz} className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition shadow-md">
                        <span className="mr-2">🧪</span> اختبار شامل (7 أسئلة)
                    </button>
                </div>
            </header>
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">ما هي الشجرة الثنائية؟</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoCard icon="🌳" title="التعريف الأساسي" iconBgClass="bg-blue-500">
                        <p>الشجرة الثنائية هي مجموعة من العقد، إما أن تكون فارغة أو تتكون من عقدة جذرية (root) وشجرتين فرعيتين: يسرى ويمنى، وهما أيضًا أشجار ثنائية.</p>
                    </InfoCard>
                    <InfoCard icon="📜" title="مصطلحات أساسية" iconBgClass="bg-purple-500">
                        <p><strong>الجذر (Root):</strong> العقدة العلوية في الشجرة.</p>
                        <p><strong>الأصل (Parent):</strong> العقدة التي تتفرع منها عقدة أخرى.</p>
                        <p><strong>الابن (Child):</strong> العقدة المتفرعة من عقدة أخرى.</p>
                        <p><strong>الورقة (Leaf):</strong> عقدة ليس لها أبناء.</p>
                    </InfoCard>
                     <InfoCard icon="🔄" title="الطبيعة العودية (Recursive)" iconBgClass="bg-pink-500">
                        <p>التعريف نفسه عودي. هذه الخاصية تجعل الخوارزميات التي تعمل على الأشجار، مثل البحث والاجتياز، بسيطة وأنيقة عند كتابتها باستخدام الدوال العودية.</p>
                    </InfoCard>
                </div>
            </section>

            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">التنفيذ باستخدام C++</h3>
                <CodeBlock title="تعريف فئة Node">
                    <Comment>// فئة لتمثيل العقدة الواحدة في الشجرة</Comment>{'\n'}
                    <Keyword>class</Keyword> Node {'{'}{'\n'}
                    <Keyword>public</Keyword>:{'\n'}
                    {'    '}<Keyword>int</Keyword> data;      <Comment>// البيانات المخزنة</Comment>{'\n'}
                    {'    '}Node* left;    <Comment>// مؤشر للابن الأيسر</Comment>{'\n'}
                    {'    '}Node* right;   <Comment>// مؤشر للابن الأيمن</Comment>{'\n\n'}
                    {'    '}<Comment>// Constructor لسهولة الإنشاء</Comment>{'\n'}
                    {'    '}<Func>Node</Func>(<Keyword>int</Keyword> val) {'{'}{'\n'}
                    {'        '}data = val;{'\n'}
                    {'        '}left = <Keyword>NULL</Keyword>;{'\n'}
                    {'        '}right = <Keyword>NULL</Keyword>;{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'}'};
                </CodeBlock>
            </section>
            
            <section>
                <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">اجتياز الشجرة (Tree Traversal)</h3>
                <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">
                    الاجتياز هو عملية زيارة كل عقدة في الشجرة مرة واحدة بالضبط. هناك ثلاث طرق رئيسية لاجتياز البحث بالعمق أولاً (DFS).
                </p>

                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-700">1. Pre-order (الجذر، اليسار، اليمين)</h4>
                        <CodeBlock title="دالة اجتياز Pre-order">
                            <Keyword>void</Keyword> <Func>preOrder</Func>(Node* root) {'{'}{'\n'}
                            {'  '}<Keyword>if</Keyword> (root == <Keyword>NULL</Keyword>) <Keyword>return</Keyword>;{'\n\n'}
                            {'  '}cout &lt;&lt; root-&gt;data &lt;&lt; <StringLiteral>" "</StringLiteral>; <Comment>// زيارة الجذر</Comment>{'\n'}
                            {'  '}<Func>preOrder</Func>(root-&gt;left); <Comment>// زيارة الشجرة اليسرى</Comment>{'\n'}
                            {'  '}<Func>preOrder</Func>(root-&gt;right); <Comment>// زيارة الشجرة اليمنى</Comment>{'\n'}
                            {'}'}
                        </CodeBlock>
                    </div>
                     <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-700">2. In-order (اليسار، الجذر، اليمين)</h4>
                        <CodeBlock title="دالة اجتياز In-order">
                            <Keyword>void</Keyword> <Func>inOrder</Func>(Node* root) {'{'}{'\n'}
                            {'  '}<Keyword>if</Keyword> (root == <Keyword>NULL</Keyword>) <Keyword>return</Keyword>;{'\n\n'}
                            {'  '}<Func>inOrder</Func>(root-&gt;left); <Comment>// زيارة الشجرة اليسرى</Comment>{'\n'}
                            {'  '}cout &lt;&lt; root-&gt;data &lt;&lt; <StringLiteral>" "</StringLiteral>; <Comment>// زيارة الجذر</Comment>{'\n'}
                            {'  '}<Func>inOrder</Func>(root-&gt;right); <Comment>// زيارة الشجرة اليمنى</Comment>{'\n'}
                            {'}'}
                        </CodeBlock>
                    </div>
                     <div>
                        <h4 className="font-bold text-xl mb-2 text-slate-700">3. Post-order (اليسار، اليمين، الجذر)</h4>
                        <CodeBlock title="دالة اجتياز Post-order">
                            <Keyword>void</Keyword> <Func>postOrder</Func>(Node* root) {'{'}{'\n'}
                            {'  '}<Keyword>if</Keyword> (root == <Keyword>NULL</Keyword>) <Keyword>return</Keyword>;{'\n\n'}
                            {'  '}<Func>postOrder</Func>(root-&gt;left); <Comment>// زيارة الشجرة اليسرى</Comment>{'\n'}
                            {'  '}<Func>postOrder</Func>(root-&gt;right); <Comment>// زيارة الشجرة اليمنى</Comment>{'\n'}
                            {'  '}cout &lt;&lt; root-&gt;data &lt;&lt; <StringLiteral>" "</StringLiteral>; <Comment>// زيارة الجذر</Comment>{'\n'}
                            {'}'}
                        </CodeBlock>
                    </div>
                </div>
            </section>
            
            <TreeVisualizer />
        </div>
    );
};

export default TreesTopic;