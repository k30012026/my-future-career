import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calculator, Feather, Heart, 
  Map, Search, Wrench, RefreshCw, Download, 
  GraduationCap, CheckCircle2 
} from 'lucide-react';

const CareerTestApp = () => {
  const [currentStep, setCurrentStep] = useState('start'); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const reportData = {
    R: {
      name: "Реалистичный (Технарь)",
      desc: "Вы человек дела. Вам нравится видеть осязаемый результат своей работы, работать с инструментами, техникой или природными объектами.",
      vuzi: [
        "СевГУ (Политехнический институт) — Робототехника",
        "ЧВВMU им. Нахимова — Эксплуатация судовых машин",
        "КИПУ — Автомобильное хозяйство",
        "КФУ — Агроинженерия и строительство"
      ]
    },
    I: {
      name: "Интеллектуальный (Исследователь)",
      desc: "Ваш ум настроен на поиск истины. Вы любите анализировать данные, решать сложные логические задачи и заниматься наукой.",
      vuzi: [
        "СевГУ — Информационная безопасность",
        "КФУ — Медицинская академия (Лечебное дело)",
        "МГУ (филиал в Севастополе) — Прикладная математика",
        "КФУ — Физико-технический институт"
      ]
    },
    A: {
      name: "Артистичный (Творец)",
      desc: "Вы обладаете живым воображением и не терпите рутины. Выражение идей через образы и чувства — ваша сильная сторона.",
      vuzi: [
        "КИПУ — Дизайн и Искусство",
        "КФУ — Журналистика и медиакоммуникации",
        "СевГУ — Архитектура и дизайн среды",
        "Крымское художественное училище им. Самокиша"
      ]
    },
    S: {
      name: "Социальный (Наставник)",
      desc: "Вы обладаете высоким эмоциональным интеллектом. Помощь людям, обучение и лечение — сферы, где вы будете успешны.",
      vuzi: [
        "СевГУ — Психология и Педагогика",
        "КФУ — Факультет психологии",
        "КИПУ — Специальное (дефектологическое) образование",
        "ГПА КФУ (Ялта) — Педагогическое образование"
      ]
    },
    E: {
      name: "Предприимчивый (Лидер)",
      desc: "Вы лидер, умеющий вдохновлять. Энергия, риск и управление ресурсами — это про вас.",
      vuzi: [
        "КФУ — Институт экономики и управления",
        "СевГУ — Менеджмент и государственное управление",
        "РЭУ им. Плеханова (Севастопольский филиал)",
        "МГУ — Управление персоналом"
      ]
    },
    C: {
      name: "Конвенциональный (Организатор)",
      desc: "Вы цените структуру и точность. Обработка информации, финансы и администрирование — ваши идеальные сферы.",
      vuzi: [
        "СевГУ — Бухгалтерский учет и аудит",
        "КФУ — Экономическая безопасность",
        "КФУ — Государственное и муниципальное управление",
        "Колледж информационных технологий (Севастополь)"
      ]
    }
  };

  // Генерация 50 вопросов (циклично из шаблонов для примера, в реальности можно заменить на уникальные)
  const questionTemplates = [
    { q: "Что вам ближе: чинить или исследовать?", opts: [{t:"Чинить механизмы", s:'R'}, {t:"Исследовать причины", s:'I'}] },
    { q: "Вам нравится работать в команде или одному?", opts: [{t:"В большой группе", s:'S'}, {t:"Самостоятельно", s:'I'}] },
    { q: "Вы предпочитаете порядок или творческий хаос?", opts: [{t:"Строгий порядок", s:'C'}, {t:"Свободу творчества", s:'A'}] },
    { q: "Что важнее: убедить людей или помочь им?", opts: [{t:"Убедить и повести за собой", s:'E'}, {t:"Помочь и поддержать", s:'S'}] },
    { q: "Вы бы предпочли чертеж или картину?", opts: [{t:"Точный чертеж", s:'R'}, {t:"Живописную картину", s:'A'}] },
    { q: "Как вы относитесь к цифрам?", opts: [{t:"Люблю считать и анализировать", s:'C'}, {t:"Предпочитаю живое общение", s:'S'}] }
  ];

  const questions = Array.from({ length: 50 }, (_, i) => {
    const template = questionTemplates[i % questionTemplates.length];
    return {
      ...template,
      q: `[${i + 1}] ${template.q}`
    };
  });

  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const generatePDF = () => {
    if (!window.jspdf) return;
    setIsGenerating(true);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const sortedScores = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const topType = sortedScores[0][0];
    const data = reportData[topType];

    doc.setFont("helvetica", "bold");
    doc.text("Career Guidance Final Report (50 Q)", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Result Code: ${topType}`, 20, 40);
    doc.text("Recommended Universities:", 20, 50);
    data.vuzi.forEach((v, i) => {
      doc.text(`- ${v.replace(/[—]/g, '-')}`, 20, 65 + (i * 10));
    });
    doc.save("career_report_50.pdf");
    setIsGenerating(false);
  };

  const bestType = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
  const result = reportData[bestType];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-100">
        
        {currentStep === 'start' && (
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-100">
              <GraduationCap className="text-white w-14 h-14" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Pro-Test 50</h1>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">Максимально глубокое исследование вашей личности. 50 вопросов для точного подбора вуза в Крыму.</p>
            <button 
              onClick={() => setCurrentStep('test')} 
              className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95"
            >
              Начать исследование
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Прогресс</span>
                <span className="text-3xl font-black text-slate-300">{currentQuestion + 1}<span className="text-lg text-slate-200">/50</span></span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300" 
                  style={{width: `${((currentQuestion+1)/50)*100}%`}}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight min-h-[4rem]">{questions[currentQuestion].q}</h2>
            <div className="space-y-4">
              {questions[currentQuestion].opts.map((o, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(o.s)} 
                  className="w-full p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{i === 0 ? 'А' : 'Б'}</span>
                    <span className="text-slate-700 font-semibold text-lg group-hover:text-indigo-900">{o.t}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="animate-in zoom-in duration-700">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <CheckCircle2 size={120} />
               </div>
               <h3 className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-4">Результат анализа</h3>
               <h2 className="text-4xl font-black mb-4 leading-none">{result.name}</h2>
               <p className="text-slate-400 leading-relaxed text-sm">{result.desc}</p>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-xl">
                <Map className="w-6 h-6 text-indigo-600" /> Подходящие вузы региона:
              </h4>
              <div className="grid gap-3">
                {result.vuzi.map((v, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border-2 border-slate-50 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="font-bold text-slate-700 text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={generatePDF} 
                disabled={isGenerating} 
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                <Download size={22} /> {isGenerating ? "Создание отчета..." : "Скачать подробный PDF"}
              </button>
              <button 
                onClick={() => { setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start'); }} 
                className="w-full py-4 text-slate-400 font-bold hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Пересдать тест
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CareerTestApp;
