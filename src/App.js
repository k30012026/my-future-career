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

  // Подключение библиотеки jsPDF через CDN
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Данные для финального отчета
  const reportData = {
    R: {
      strengths: "Практическое мышление, работа с техникой, выносливость и наглядный результат.",
      vuzi: [
        "Севастополь: СевГУ (Политехнический институт)",
        "Севастополь: ЧВВМУ им. Нахимова (Инженерные факультеты)",
        "Крым: КИПУ (Технологический факультет)"
      ],
      action: "Рекомендуется: технические кружки, робототехника, работа с оборудованием."
    },
    I: {
      strengths: "Аналитический склад ума, любовь к исследованиям, решение сложных задач.",
      vuzi: [
        "Севастополь: СевГУ (Институт ИТ и кибербезопасности)",
        "Крым: КФУ (Медицинская академия)",
        "Крым: КИПУ (Информатика)"
      ],
      action: "Рекомендуется: научные проекты, курсы программирования, олимпиады."
    },
    A: {
      strengths: "Креативность, самовыражение, эстетика и нестандартный подход.",
      vuzi: [
        "Крым: КИПУ (Дизайн и искусство)",
        "Крым: КФУ (Журналистика и медиакоммуникации)"
      ],
      action: "Рекомендуется: создание портфолио, художественные мастер-классы, музыка."
    },
    S: {
      strengths: "Эмпатия, коммуникация, желание помогать и обучать людей.",
      vuzi: [
        "Севастополь: СевГУ (Педагогический институт)",
        "Крым: КФУ (Психология)",
        "Крым: КИПУ (Психолого-педагогический факультет)"
      ],
      action: "Рекомендуется: волонтерство, ораторское мастерство, работа в команде."
    },
    E: {
      strengths: "Лидерство, влияние, предпринимательская жилка и уверенность.",
      vuzi: [
        "Крым: КФУ (Институт экономики и управления)",
        "Севастополь: СевГУ (Институт финансов и управления)"
      ],
      action: "Рекомендуется: бизнес-проекты, лидерские курсы, дебаты."
    },
    C: {
      strengths: "Системность, внимание к деталям, работа с документами и данными.",
      vuzi: [
        "Севастополь: СевГУ (Государственное управление)",
        "Крым: КФУ (Экономика и учет)"
      ],
      action: "Рекомендуется: изучение Excel/SQL, тайм-менеджмент, архитектура систем."
    }
  };

  const questions = [
    {
      id: 1,
      text: "В какой сфере тебе было бы интереснее всего провести выходной?",
      options: [
        { text: "В мастерской: чинить или собирать что-то своими руками", type: 'R' },
        { text: "В библиотеке: изучать новые факты или проводить опыты", type: 'I' },
        { text: "В галерее или на концерте: искать вдохновение", type: 'A' },
        { text: "В центре помощи: помогать людям или проводить занятия", type: 'S' },
        { text: "На бизнес-форуме: искать идеи для своего стартапа", type: 'E' },
        { text: "Дома: организовывать личные дела и файлы в идеальный порядок", type: 'C' }
      ]
    },
    {
      id: 2,
      text: "Какой предмет в школе тебе ближе по духу?",
      options: [
        { text: "Технология или Физкультура (практика)", type: 'R' },
        { text: "Математика или Физика (логика)", type: 'I' },
        { text: "Литература или МХК (искусство)", type: 'A' },
        { text: "История или Обществознание (люди)", type: 'S' },
        { text: "Английский или Право (переговоры)", type: 'E' },
        { text: "Информатика или Бухгалтерский учет (структура)", type: 'C' }
      ]
    },
    {
      id: 3,
      text: "Если бы ты создавал приложение, за что бы ты отвечал?",
      options: [
        { text: "За техническую сборку и «железо»", type: 'R' },
        { text: "За сложные алгоритмы и анализ данных", type: 'I' },
        { text: "За визуальный стиль и интерфейс", type: 'A' },
        { text: "За поддержку пользователей и обучение", type: 'S' },
        { text: "За продажи и продвижение на рынке", type: 'E' },
        { text: "За базу данных и системную архитектуру", type: 'C' }
      ]
    }
  ];

  const typesInfo = {
    R: { name: "Реалистичный", icon: <Wrench className="text-blue-500" /> },
    I: { name: "Интеллектуальный", icon: <Search className="text-purple-500" /> },
    A: { name: "Артистичный", icon: <Feather className="text-pink-500" /> },
    S: { name: "Социальный", icon: <Heart className="text-red-500" /> },
    E: { name: "Предприимчивый", icon: <Briefcase className="text-orange-500" /> },
    C: { name: "Конвенциональный", icon: <Calculator className="text-green-500" /> },
  };

  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const generatePDF = () => {
    setIsGenerating(true);
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topType = sorted[0][0];
    const info = reportData[topType];
    const typeName = typesInfo[topType].name;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Оформление PDF
    doc.setFontSize(20);
    doc.setTextColor(30, 64, 175);
    doc.text("FuturePath: Career Report", 20, 30);
    
    doc.setDrawColor(30, 64, 175);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Personality Type: ${typeName}`, 20, 50);

    doc.setFontSize(12);
    doc.text("Strengths:", 20, 65);
    doc.setFontSize(10);
    const strengths = doc.splitTextToSize(info.strengths, 160);
    doc.text(strengths, 20, 75);

    doc.setFontSize(12);
    doc.text("Recommended Universities (Crimea & Sevastopol):", 20, 100);
    doc.setFontSize(10);
    info.vuzi.forEach((vuz, i) => {
      doc.text(`- ${vuz}`, 25, 110 + (i * 8));
    });

    doc.setFontSize(12);
    doc.text("Action Plan:", 20, 150);
    doc.setFontSize(10);
    const action = doc.splitTextToSize(info.action, 160);
    doc.text(action, 20, 160);

    doc.save(`Career_Report_${topType}.pdf`);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {currentStep === 'start' && (
          <div className="p-10 text-center space-y-6">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Map className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-800">FuturePath</h1>
            <p className="text-slate-600">Найди идеальную профессию и узнай, где учиться в Крыму и Севастополе.</p>
            <button 
              onClick={() => setCurrentStep('test')} 
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl text-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
            >
              Начать тест
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="p-8">
            <div className="mb-6 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{questions[currentQuestion].text}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt.type)} 
                  className="w-full p-4 text-left border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition font-medium text-slate-700"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="p-10 text-center space-y-6 animate-in fade-in zoom-in">
            <h2 className="text-2xl font-bold text-slate-800">Твой результат:</h2>
            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="flex justify-center scale-150 mb-4">
                {typesInfo[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].icon}
              </div>
              <p className="text-2xl font-black text-blue-700">
                {typesInfo[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].name}
              </p>
            </div>
            <button 
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
            >
              <Download className="w-6 h-6" />
              {isGenerating ? "Создаем отчет..." : "Скачать PDF-отчет"}
            </button>
            <button 
              onClick={() => {setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start');}}
              className="text-slate-400 hover:text-blue-600 transition flex items-center justify-center gap-2 mx-auto pt-4"
            >
              <RefreshCw className="w-4 h-4" /> Пройти заново
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTestApp;
