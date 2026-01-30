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

  // Динамическое подключение библиотеки для PDF
  useEffect(() => {
    if (!window.jspdf) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // ПОЛНАЯ БАЗА ДАННЫХ (Вузы и описания)
  const reportData = {
    R: {
      name: "Реалистичный (Технарь/Мастер)",
      strengths: "Практическое мышление, работа с техникой, четкий результат.",
      vuzi: [
        "Севастополь: СевГУ (Политехнический институт)",
        "Севастополь: ЧВВМУ им. Нахимова (Инженерные специальности)",
        "Крым: КИПУ (Технологический факультет)",
        "Симферополь: КФУ (Агротехнологическая академия)"
      ],
      action: "Рекомендуется: техническое творчество, моделирование, IT-инженерия."
    },
    I: {
      name: "Интеллектуальный (Исследователь)",
      strengths: "Аналитика, решение сложных логических задач, наука.",
      vuzi: [
        "Севастополь: СевГУ (Институт ИТ и кибербезопасности)",
        "Крым: КФУ (Медицинская академия)",
        "Симферополь: КФУ (Физико-технический институт)"
      ],
      action: "Рекомендуется: научные проекты, программирование, глубокое обучение."
    },
    A: {
      name: "Артистичный (Творец)",
      strengths: "Креативность, богатое воображение, нестандартный взгляд.",
      vuzi: [
        "Крым: КИПУ (Дизайн, музыка, искусство)",
        "Крым: КФУ (Журналистика и медиакоммуникации)",
        "Севастополь: СевГУ (Институт развития города - Дизайн)"
      ],
      action: "Рекомендуется: создание портфолио, медиа-проекты, курсы дизайна."
    },
    S: {
      name: "Социальный (Наставник)",
      strengths: "Эмпатия, умение объяснять, желание помогать людям.",
      vuzi: [
        "Севастополь: СевГУ (Гуманитарно-педагогический институт)",
        "Крым: КФУ (Психология и педагогика)",
        "Крым: КИПУ (Психолого-педагогический факультет)"
      ],
      action: "Рекомендуется: волонтерство, педагогика, работа с группами."
    },
    E: {
      name: "Предприимчивый (Лидер)",
      strengths: "Энергичность, лидерство, умение убеждать и вести бизнес.",
      vuzi: [
        "Крым: КФУ (Институт экономики и управления)",
        "Севастополь: СевГУ (Институт финансов и управления)",
        "Филиал МГУ в Севастополе (Управление)"
      ],
      action: "Рекомендуется: лидерские школы, бизнес-игры, дебаты."
    },
    C: {
      name: "Конвенциональный (Организатор)",
      strengths: "Системность, внимание к деталям, работа с данными.",
      vuzi: [
        "Севастополь: СевГУ (Государственное и муниципальное управление)",
        "Крым: КФУ (Экономика и учет)",
        "Симферополь: Академия строительства и архитектуры"
      ],
      action: "Рекомендуется: изучение систем управления, аналитика данных, логистика."
    }
  };

  // ТЕСТОВЫЕ ВОПРОСЫ
  const questions = [
    {
      id: 1,
      text: "Какое занятие тебе больше по душе в выходной день?",
      options: [
        { text: "Собирать мебель или чинить велосипед", type: 'R' },
        { text: "Разгадывать сложные головоломки или кодить", type: 'I' },
        { text: "Рисовать, писать музыку или стихи", type: 'A' },
        { text: "Организовать праздник для друзей", type: 'S' },
        { text: "Придумывать, как заработать на своем хобби", type: 'E' },
        { text: "Наводить порядок в папках и документах", type: 'C' }
      ]
    },
    {
      id: 2,
      text: "Какой школьный проект был бы тебе интересен?",
      options: [
        { text: "Создание действующей модели робота", type: 'R' },
        { text: "Исследование влияния радиации на растения", type: 'I' },
        { text: "Постановка школьного спектакля", type: 'A' },
        { text: "Проведение тренинга по общению для младших классов", type: 'S' },
        { text: "Разработка бизнес-плана школьной кофейни", type: 'E' },
        { text: "Создание удобной системы учета книг в библиотеке", type: 'C' }
      ]
    },
    {
      id: 3,
      text: "Если бы ты работал в крупной компании, кем бы ты был?",
      options: [
        { text: "Главным инженером производства", type: 'R' },
        { text: "Ведущим аналитиком или ученым", type: 'I' },
        { text: "Креативным директором", type: 'A' },
        { text: "Руководителем отдела обучения персонала", type: 'S' },
        { text: "Генеральным директором, принимающим решения", type: 'E' },
        { text: "Финансовым аудитором или юристом", type: 'C' }
      ]
    }
  ];

  const typesInfo = {
    R: { icon: <Wrench className="text-blue-500" /> },
    I: { icon: <Search className="text-purple-500" /> },
    A: { icon: <Feather className="text-pink-500" /> },
    S: { icon: <Heart className="text-red-500" /> },
    E: { icon: <Briefcase className="text-orange-500" /> },
    C: { icon: <Calculator className="text-green-500" /> },
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
      alert("Подождите, модуль PDF загружается...");
      return;
    }

    try {
      setIsGenerating(true);
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const topTypeCode = sorted[0][0];
      const data = reportData[topTypeCode];

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // ВНИМАНИЕ: Стандартный PDF не поддерживает русский без шрифтов.
      // Поэтому в отчете мы используем латиницу для структуры и транслит/английский
      // Либо выводим основные данные визуально.
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("FuturePath: Career Report", 20, 20);
      
      doc.setFontSize(14);
      doc.text(`Resulting Type: ${topTypeCode} (${data.name.split('(')[0]})`, 20, 40);
      
      doc.setFontSize(12);
      doc.text("Your Strengths:", 20, 60);
      doc.setFont("helvetica", "normal");
      const strengths = doc.splitTextToSize(data.strengths, 160);
      doc.text(strengths, 20, 70);

      doc.setFont("helvetica", "bold");
      doc.text("Recommended Universities (Region):", 20, 100);
      doc.setFont("helvetica", "normal");
      data.vuzi.forEach((vuz, i) => {
        doc.text(`- ${vuz}`, 20, 110 + (i * 10));
      });

      doc.save(`Career_Report_${topTypeCode}.pdf`);
    } catch (error) {
      console.error(error);
      alert("Ошибка при создании файла. Попробуйте еще раз.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100">
        
        {currentStep === 'start' && (
          <div className="text-center space-y-8 py-6">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto rotate-3 shadow-lg">
              <Map className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">FuturePath</h1>
              <p className="text-slate-500 mt-2 text-lg">Твой навигатор в мире профессий Крыма</p>
            </div>
            <button 
              onClick={() => setCurrentStep('test')} 
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all hover:shadow-xl active:scale-95"
            >
              Начать исследование
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <span className="px-4 py-1 bg-slate-100 rounded-full text-slate-500 text-sm font-bold">
                Вопрос {currentQuestion + 1} / {questions.length}
              </span>
              <div className="flex-1 ml-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(opt.type)} 
                  className="w-full p-5 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 text-left transition-all font-medium text-slate-700 flex items-center gap-4"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-bold">{i + 1}</span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <h2 className="text-3xl font-black text-slate-800">Результат готов!</h2>
            
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
                  {typesInfo[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].icon}
                </div>
                <h3 className="text-2xl font-black text-blue-800">
                  {reportData[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].name}
                </h3>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {reportData[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].strengths}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={generatePDF} 
                disabled={isGenerating}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
              >
                <Download size={24} /> 
                {isGenerating ? "Создаем отчет..." : "Скачать PDF-отчет"}
              </button>
              
              <button 
                onClick={() => {setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start');}}
                className="w-full py-4 text-slate-400 hover:text-blue-600 font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Пройти еще раз
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                Рекомендовано для Севастополя и Крыма
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTestApp;
