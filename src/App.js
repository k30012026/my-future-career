import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calculator, Feather, Heart, 
  Map, Search, Wrench, RefreshCw, Download 
} from 'lucide-react';

const CareerTestApp = () => {
  const [currentStep, setCurrentStep] = useState('start'); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [isGenerating, setIsGenerating] = useState(false);

  // Динамическое подключение библиотеки для PDF с проверкой
  useEffect(() => {
    const loadJsPDF = () => {
      if (!window.jspdf) {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script.async = true;
        script.onload = () => console.log("jsPDF loaded");
        document.body.appendChild(script);
      }
    };
    loadJsPDF();
  }, []);

  // РАСШИРЕННАЯ БАЗА ДАННЫХ
  const reportData = {
    R: {
      name: "Реалистичный (Технарь/Мастер)",
      strengths: "Практическое мышление, работа с техникой, четкий осязаемый результат. Вы человек дела.",
      vuzi: [
        "Севастополь: СевГУ (Политехнический институт — Машиностроение, Робототехника)",
        "Севастополь: ЧВВМУ им. Нахимова (Эксплуатация судовых машин)",
        "Крым: КИПУ (Технологический факультет — Автосервис, Строительство)",
        "Симферополь: КФУ (Агротехнологическая академия — Механизация сельхозпроизводства)"
      ],
      professions: ["Инженер-механик", "Системный администратор", "Строитель-архитектор", "Технолог"],
      action: "Рекомендуется: техническое творчество, робототехника, работа в мастерских."
    },
    I: {
      name: "Интеллектуальный (Исследователь)",
      strengths: "Аналитическое мышление, решение сложных логических задач, научный подход к жизни.",
      vuzi: [
        "Севастополь: СевГУ (Институт ИТ и кибербезопасности — ИИ, Программирование)",
        "Крым: КФУ (Медицинская академия — Врачи всех специальностей)",
        "Симферополь: КФУ (Физико-технический институт — Физика, Биология)",
        "Филиал МГУ в Севастополе (Прикладная математика)"
      ],
      professions: ["Программист-разработчик", "Ученый-исследователь", "Врач-диагност", "Data Scientist"],
      action: "Рекомендуется: научные проекты, участие в олимпиадах по программированию, самообразование."
    },
    A: {
      name: "Артистичный (Творец)",
      strengths: "Креативность, развитая интуиция, эстетический взгляд на мир. Не любите жестких рамок.",
      vuzi: [
        "Крым: КИПУ (Дизайн, музыкальное искусство, актерское мастерство)",
        "Крым: КФУ (Журналистика, филология, медиакоммуникации)",
        "Севастополь: СевГУ (Институт развития города — Дизайн городской среды)",
        "Крымское художественное училище им. Самокиша"
      ],
      professions: ["Дизайнер", "Журналист/Блогер", "Архитектор", "Режиссер"],
      action: "Рекомендуется: создание творческого портфолио, изучение графических редакторов."
    },
    S: {
      name: "Социальный (Наставник)",
      strengths: "Высокая эмпатия, умение убеждать и обучать, потребность приносить пользу обществу.",
      vuzi: [
        "Севастополь: СевГУ (Гуманитарно-педагогический институт — Педагогика, Психология)",
        "Крым: КФУ (Факультет психологии)",
        "Крым: КИПУ (Специальное дефектологическое образование)",
        "Медицинские колледжи Крыма (Сестринское дело)"
      ],
      professions: ["Учитель/Преподаватель", "Психолог", "Врач-терапевт", "HR-менеджер"],
      action: "Рекомендуется: волонтерская деятельность, социальные проекты, работа с детьми."
    },
    E: {
      name: "Предприимчивый (Лидер)",
      strengths: "Энергия, организаторские способности, готовность к риску и лидерству.",
      vuzi: [
        "Крым: КФУ (Институт экономики и управления — Маркетинг, Менеджмент)",
        "Севастополь: СевГУ (Институт финансов и управления — Международный бизнес)",
        "Филиал МГУ в Севастополе (Государственное управление)",
        "Севастопольский филиал РЭУ им. Плеханова"
      ],
      professions: ["Предприниматель", "Руководитель проектов", "Юрист", "Маркетолог"],
      action: "Рекомендуется: лидерские школы, запуск своих мини-проектов, изучение финансов."
    },
    C: {
      name: "Конвенциональный (Организатор)",
      strengths: "Аккуратность, системность, умение работать со структурами и большими данными.",
      vuzi: [
        "Севастополь: СевГУ (Бухгалтерский учет, Анализ и аудит)",
        "Крым: КФУ (Экономика, Государственное и муниципальное управление)",
        "Симферополь: Академия строительства — Сметное дело",
        "Банковские и финансовые колледжи"
      ],
      professions: ["Бухгалтер", "Финансовый аналитик", "Специалист по кибербезопасности", "Нотариус"],
      action: "Рекомендуется: углубленное изучение Excel, аналитика данных, курсы по праву."
    }
  };

  // ОБНОВЛЕННЫЙ СПИСОК ВОПРОСОВ (Добавлено больше вариантов)
  const questions = [
    {
      id: 1,
      text: "Чем тебе больше всего нравится заниматься в свободное время?",
      options: [
        { text: "Разбирать технику или создавать что-то своими руками", type: 'R' },
        { text: "Искать ответы на сложные вопросы в интернете или книгах", type: 'I' },
        { text: "Заниматься творчеством: рисовать, писать, петь", type: 'A' },
        { text: "Общаться с людьми, помогать советом или делом", type: 'S' },
        { text: "Организовывать мероприятия или придумывать идеи для бизнеса", type: 'E' },
        { text: "Систематизировать информацию, наводить порядок в делах", type: 'C' }
      ]
    },
    {
      id: 2,
      text: "Какой школьный проект вызвал бы у тебя наибольший интерес?",
      options: [
        { text: "Сборка макета двигателя или робота", type: 'R' },
        { text: "Анализ исторических фактов или научное исследование", type: 'I' },
        { text: "Создание видеоролика или дизайн школьной газеты", type: 'A' },
        { text: "Проведение благотворительной акции", type: 'S' },
        { text: "Подготовка презентации по продвижению товара", type: 'E' },
        { text: "Составление архива или базы данных школы", type: 'C' }
      ]
    },
    {
      id: 3,
      text: "Если бы ты выбирал работу в компании мечты, кем бы ты стал?",
      options: [
        { text: "Техническим экспертом, работающим с оборудованием", type: 'R' },
        { text: "Аналитиком в лаборатории или отделе данных", type: 'I' },
        { text: "Креативным дизайнером или автором контента", type: 'A' },
        { text: "Координатором по работе с клиентами и обучению", type: 'S' },
        { text: "Директором по развитию или отделом продаж", type: 'E' },
        { text: "Главным бухгалтером или аудитором", type: 'C' }
      ]
    },
    {
      id: 4,
      text: "В какой среде тебе комфортнее всего работать?",
      options: [
        { text: "В мастерской или на производстве", type: 'R' },
        { text: "В тихом кабинете или библиотеке", type: 'I' },
        { text: "В творческой студии с гибким графиком", type: 'A' },
        { text: "В коллективе, где много общения и взаимодействия", type: 'S' },
        { text: "В динамичном офисе, где постоянно нужно принимать решения", type: 'E' },
        { text: "В четко структурированном офисе с правилами", type: 'C' }
      ]
    }
  ];

  const typesInfo = {
    R: { icon: <Wrench className="text-blue-500 w-12 h-12" /> },
    I: { icon: <Search className="text-purple-500 w-12 h-12" /> },
    A: { icon: <Feather className="text-pink-500 w-12 h-12" /> },
    S: { icon: <Heart className="text-red-500 w-12 h-12" /> },
    E: { icon: <Briefcase className="text-orange-500 w-12 h-12" /> },
    C: { icon: <Calculator className="text-green-500 w-12 h-12" /> },
  };

  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const generatePDF = async () => {
    if (!window.jspdf) {
      alert("Пожалуйста, подождите, модуль PDF загружается (проверьте интернет-соединение).");
      return;
    }

    try {
      setIsGenerating(true);
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const topTypeCode = sorted[0][0];
      const data = reportData[topTypeCode];

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Генерация PDF (с учетом ограничений кириллицы в стандартных шрифтах jspdf)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("FuturePath: Career Guidance Report", 20, 20);
      
      doc.setFontSize(16);
      doc.text(`Psychotype Result: ${topTypeCode}`, 20, 40);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Strengths and Recommendations:", 20, 60);
      
      const strengthsText = `Result: ${data.name}. ${data.strengths}`;
      const splitText = doc.splitTextToSize(strengthsText, 170);
      doc.text(splitText, 20, 70);

      doc.setFont("helvetica", "bold");
      doc.text("Top Universities & Professions:", 20, 110);
      doc.setFont("helvetica", "normal");
      
      let yPos = 120;
      data.vuzi.slice(0, 4).forEach((vuz) => {
        const vuzLine = doc.splitTextToSize(`- ${vuz}`, 170);
        doc.text(vuzLine, 20, yPos);
        yPos += (vuzLine.length * 7);
      });

      doc.text("Suggested Professions:", 20, yPos + 10);
      doc.text(data.professions.join(", "), 20, yPos + 20);

      doc.save(`Career_Report_${topTypeCode}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при создании PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetTest = () => {
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setCurrentQuestion(0);
    setCurrentStep('start');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-100 overflow-hidden">
        
        {currentStep === 'start' && (
          <div className="text-center space-y-8 py-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto rotate-3 shadow-xl">
              <Map className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-slate-800 tracking-tight">FuturePath</h1>
              <p className="text-slate-500 mt-3 text-xl">Твой навигатор в мире профессий Крыма и Севастополя</p>
            </div>
            <button 
              onClick={() => setCurrentStep('test')} 
              className="w-full py-6 bg-blue-600 text-white rounded-2xl font-bold text-2xl hover:bg-blue-700 transition-all hover:shadow-2xl active:scale-95 transform"
            >
              Начать исследование
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="flex justify-between items-center mb-10">
              <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-black uppercase tracking-widest">
                {currentQuestion + 1} / {questions.length}
              </span>
              <div className="flex-1 ml-6 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-700 ease-out" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-10 leading-snug">
              {questions[currentQuestion].text}
            </h2>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt.type)} 
                  className="w-full p-6 border-2 border-slate-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50 text-left transition-all font-semibold text-slate-700 flex items-center gap-5 group"
                >
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black group-hover:bg-blue-600 group-hover:text-white transition-colors">{i + 1}</span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <h2 className="text-4xl font-black text-slate-800">Результат готов!</h2>
            
            <div className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[3rem] border-2 border-white shadow-inner relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 p-6 bg-white rounded-3xl shadow-lg ring-4 ring-blue-100">
                  {typesInfo[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].icon}
                </div>
                <h3 className="text-3xl font-black text-blue-900 leading-tight">
                  {reportData[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].name}
                </h3>
                <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                  {reportData[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].strengths}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={generatePDF} 
                disabled={isGenerating}
                className="w-full py-6 bg-emerald-600 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-4 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
              >
                <Download size={28} /> 
                {isGenerating ? "Создание..." : "Скачать PDF-отчет"}
              </button>
              
              <button 
                onClick={resetTest}
                className="w-full py-4 text-slate-400 hover:text-blue-600 font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} /> Пройти заново
              </button>
            </div>

            <div className="pt-6 border-t-2 border-slate-50">
              <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">
                Для молодежи Крыма и Севастополя
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTestApp;
