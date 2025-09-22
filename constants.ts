import { Topic, QuizQuestion } from './types';
import ArraysTopic from './components/topics/ArraysTopic';
import LinkedListTopic from './components/topics/LinkedListTopic';
import DoublyLinkedListTopic from './components/topics/DoublyLinkedListTopic';
import CircularLinkedListTopic from './components/topics/CircularLinkedListTopic';
import StackTopic from './components/topics/StackTopic';
import QueueTopic from './components/topics/QueueTopic';
import TreesTopic from './components/topics/TreesTopic';
import BstTopic from './components/topics/BstTopic';

const arraysQuizData: QuizQuestion[] = [
  {
    question: "ما هي الخاصية الأساسية للمصفوفات التي تميزها عن القوائم المرتبطة؟",
    options: ["حجم ديناميكي", "تخزين عناصر من أنواع مختلفة", "تخزين العناصر في أماكن ذاكرة متتالية", "سهولة الحذف والإضافة في المنتصف"],
    correct: 2,
    explanation: "الميزة الرئيسية للمصفوفات هي أنها تخزن عناصرها في كتل متجاورة من الذاكرة، مما يسمح بالوصول السريع والمباشر للعناصر باستخدام المؤشرات (O(1))."
  },
  {
    question: "ما هو مؤشر (index) العنصر الأول في مصفوفة بـ C++؟",
    options: ["1", "0", "-1", "يعتمد على نوع البيانات"],
    correct: 1,
    explanation: "في معظم لغات البرمجة بما في ذلك C++، تبدأ مؤشرات المصفوفات من 0. لذا، العنصر الأول يكون في الموقع `array[0]`."
  },
  {
      question: "في مصفوفة `int arr[10];`، ما هو المؤشر الصحيح لآخر عنصر؟",
      options: ["10", "9", "11", "arr.length"],
      correct: 1,
      explanation: "بما أن المؤشرات تبدأ من 0، فإن مصفوفة بحجم 10 ستحتوي على مؤشرات من 0 إلى 9. لذا، آخر عنصر هو `arr[9]`."
  },
  {
      question: "ما هو تعقيد الوقت (Time Complexity) للوصول إلى عنصر في مصفوفة باستخدام مؤشره؟",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correct: 0,
      explanation: "الوصول إلى عنصر في مصفوفة هو عملية ذات تعقيد زمني ثابت O(1) لأن عنوان الذاكرة يمكن حسابه مباشرة من المؤشر وعنوان بداية المصفوفة."
  },
  {
      question: "ماذا يحدث عند محاولة الوصول إلى مؤشر خارج حدود المصفوفة في C++؟",
      options: ["يحدث خطأ في الترجمة (compilation error)", "يتم إرجاع قيمة `null`", "يحدث سلوك غير محدد (undefined behavior)", "يتم تكبير حجم المصفوفة تلقائيًا"],
      correct: 2,
      explanation: "لا يقوم C++ بالتحقق من حدود المصفوفة تلقائيًا. الوصول إلى مؤشر خارج الحدود يؤدي إلى سلوك غير محدد، مما قد يتسبب في تعطل البرنامج أو قراءة/كتابة بيانات غير متوقعة."
  }
];

const treesQuizData: QuizQuestion[] = [
    {
        question: "ما هو الحد الأقصى لعدد الأبناء (children) الذي يمكن أن تمتلكه كل عقدة في شجرة ثنائية؟",
        options: ["1", "2", "3", "غير محدود"],
        correct: 1,
        explanation: "بحكم تعريفها، تحتوي العقدة في الشجرة الثنائية على مؤشرين، واحد للابن الأيسر والآخر للأيمن، لذا يمكن أن يكون لديها ابنان على الأكثر."
    },
    {
        question: "في أي ترتيب اجتياز (traversal) تتم زيارة العقدة الجذر (root) أولاً؟",
        options: ["In-Order (بالترتيب)", "Pre-Order (قبل الترتيب)", "Post-Order (بعد الترتيب)", "Level-Order (ترتيب المستوى)"],
        correct: 1,
        explanation: "اجتياز Pre-Order يتبع نمط (الجذر، اليسار، اليمين)، حيث تتم معالجة العقدة الجذرية قبل أي من أشجارها الفرعية."
    },
    {
        question: "ماذا تسمى العقدة التي ليس لديها أي أبناء؟",
        options: ["عقدة جذر (Root node)", "عقدة داخلية (Internal node)", "عقدة ورقية (Leaf node)", "عقدة أصل (Parent node)"],
        correct: 2,
        explanation: "العقد الورقية هي العقد النهائية في الشجرة (أو أي فرع)، وليس لديها أي عقد أبناء."
    },
    {
        question: "بالنظر إلى شجرة بسيطة (الجذر 7، الابن الأيسر 6، الابن الأيمن 5)، ما هو ناتج اجتياز In-Order؟",
        options: ["[7, 6, 5]", "[6, 5, 7]", "[6, 7, 5]", "[5, 6, 7]"],
        correct: 2,
        explanation: "اجتياز In-Order يتبع نمط (اليسار، الجذر، اليمين). نزور الابن الأيسر (6)، ثم الجذر (7)، ثم الابن الأيمن (5)."
    },
    {
        question: "ما هو المفهوم الأساسي الذي يُبنى عليه تعريف الشجرة الثنائية وتعتمد عليه خوارزميات الاجتياز؟",
        options: ["التكرار (Iteration)", "العودية (Recursion)", "الطابور (Queues)", "المكدس (Stacks)"],
        correct: 1,
        explanation: "يتم تعريف الشجرة بشكل عودي (recursive) على أنها جذر وشجرتان فرعيتان (يسرى ويمنى). خوارزميات الاجتياز هي بطبيعتها عودية أيضًا."
    },
    {
        question: "ما هو ناتج اجتياز Post-Order للشجرة البسيطة (الجذر 7، الابن الأيسر 6، الابن الأيمن 5)؟",
        options: ["[7, 6, 5]", "[6, 5, 7]", "[6, 7, 5]", "[5, 7, 6]"],
        correct: 1,
        explanation: "اجتياز Post-Order يتبع نمط (اليسار، اليمين، الجذر). نزور الابن الأيسر (6)، ثم الابن الأيمن (5)، وأخيرًا الجذر (7)."
    },
    {
        question: "ما هي العقدة الوحيدة في الشجرة التي ليس لها أصل (parent)؟",
        options: ["العقدة الورقية (Leaf node)", "العقدة الداخلية (Internal node)", "العقدة الجذر (Root node)", "أي عقدة"],
        correct: 2,
        explanation: "الجذر هو العقدة العليا في الشجرة وهو نقطة الدخول إليها، وبالتالي ليس له أصل."
    }
];

export const topics: Topic[] = [
  {
    id: 'arrays',
    name: 'المصفوفات',
    icon: '📦',
    component: ArraysTopic,
    quizData: arraysQuizData,
  },
  {
    id: 'linkedlist',
    name: 'القوائم المرتبطة',
    icon: '🔗',
    component: LinkedListTopic,
    quizData: [],
  },
  {
    id: 'doubly',
    name: 'القوائم المزدوجة',
    icon: '⛓️',
    component: DoublyLinkedListTopic,
    quizData: [],
  },
  {
    id: 'circular',
    name: 'القوائم الدائرية',
    icon: '🔄',
    component: CircularLinkedListTopic,
    quizData: [],
  },
  {
    id: 'stack',
    name: 'المكدس',
    icon: '📚',
    component: StackTopic,
    quizData: [],
  },
  {
    id: 'queue',
    name: 'الطابور',
    icon: '🚶‍♂️',
    component: QueueTopic,
    quizData: [],
  },
  {
    id: 'trees',
    name: 'الأشجار',
    icon: '🌳',
    component: TreesTopic,
    quizData: treesQuizData,
  },
  {
    id: 'bst',
    name: 'أشجار البحث',
    icon: '🌲',
    component: BstTopic,
  },
];