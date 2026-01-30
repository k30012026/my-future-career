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

  // Подключаем jsPDF через скрипт, так как это гарантирует работу в онлайн-редакторе
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const reportData = {
    R: { strengths: "Практическое мышление, работа с техникой.", vuzi: ["СевГУ", "ЧВВМУ", "КИПУ"], action: "Технические кружки." },
    I: { strengths: "Аналитика, исследования.", vuzi: ["СевГУ (ИТ)", "КФУ (Мед)", "КИПУ"], action: "Научные проекты." },
    A: { strengths: "Креативность, дизайн.", vuzi: ["КИПУ (Дизайн)", "КФУ (Медиа)"], action: "Портфолио." },
    S: { strengths: "Помощь людям, обучение.", vuzi: ["СевГУ (Пед)", "КФУ (Псих)", "КИПУ"], action: "Волонтерство." },
    E: { strengths: "Лидерство, бизнес.", vuzi: ["КФУ (Экономика)", "СевГУ (Менеджмент)"], action: "Стартап-идеи." },
    C: { strengths: "Системность, данные.", vuzi: ["СевГУ (Госуправление)", "КФУ (Учет)"], action: "Курсы Excel." }
  };

  const questions = [
    {
      id: 1,
      text: "Чем займешься в свободное время?",
      options: [
        { text: "Чинить технику", type: 'R' },
        { text: "Изучать науку", type: 'I' },
        { text: "Рисовать", type: 'A' },
        { text: "Общаться", type: 'S' },
        { text: "Продавать", type: 'E' },
        { text: "Считать", type: 'C' }
      ]
    },
    {
      id: 2,
      text: "Любимый школьный предмет?",
      options: [
        { text: "Труд", type: 'R' },
        { text: "Физика", type: 'I' },
        { text: "Искусство", type: 'A' },
        { text: "Общество", type: 'S' },
        { text: "Английский", type: 'E' },
        { text: "Математика", type: 'C' }
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

  const generatePDF = async () => {
    if (!window.jspdf) {
      alert("Библиотека PDF еще загружается. Пожалуйста, подождите секунду.");
      return;
    }

    try {
      setIsGenerating(true);
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const topType = sorted[0][0];
      const info = reportData[topType];
      const typeName = typesInfo[topType].name;

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("FuturePath Career Report", 20, 20);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text(`Type: ${typeName}`, 20, 40);
      
      doc.setFontSize(12);
      doc.text("Strengths:", 20, 60);
      doc.text(info.strengths, 20, 70);

      doc.text("Recommended Universities:", 20, 90);
      info.vuzi.forEach((vuz, i) => {
        doc.text(`- ${vuz}`, 20, 100 + (i * 10));
      });

      doc.save(`Career_Report_${topType}.pdf`);
    } catch (error) {
      console.error("Ошибка PDF:", error);
      alert("Не удалось создать PDF. Попробуйте еще раз.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        {currentStep === 'start' && (
          <div className="text-center space-y-6">
            <Map className="w-16 h-16 text-blue-600 mx-auto" />
            <h1 className="text-3xl font-bold">FuturePath</h1>
            <p className="text-slate-500">Тест на профориентацию</p>
            <button onClick={() => setCurrentStep('test')} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition">Начать</button>
          </div>
        )}

        {currentStep === 'test' && (
          <div>
            <div className="mb-4 text-sm text-slate-400">Вопрос {currentQuestion + 1} из {questions.length}</div>
            <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].text}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.type)} className="w-full p-4 border rounded-xl hover:bg-blue-50 text-left transition">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Ваш результат</h2>
            <div className="p-6 bg-blue-50 rounded-2xl flex flex-col items-center">
              <div className="mb-2 scale-150">{typesInfo[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].icon}</div>
              <p className="text-xl font-bold text-blue-700">
                {typesInfo[Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]].name}
              </p>
            </div>
            <button 
              onClick={generatePDF} 
              disabled={isGenerating}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
            >
              <Download size={20} /> {isGenerating ? "Загрузка..." : "Скачать PDF"}
            </button>
            <button 
              onClick={() => {setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start');}}
              className="text-slate-400 hover:text-blue-600 transition flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw size={16} /> Пройти заново
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTestApp;
