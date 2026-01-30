import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calculator, Feather, Heart, 
  Map, Search, Wrench, RefreshCw, Download, 
  GraduationCap, CheckCircle2, BookOpen, UserCheck
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
      desc: "Вы человек дела. Вам нравится видеть осязаемый результат своей работы, работать с инструментами, техникой или природными объектами. Вы цените практическую пользу и надежность.",
      recommendation: "Развивайте навыки работы в команде и лидерство, чтобы переходить от простого исполнительства к управлению техническими проектами.",
      professions: ["Инженер-механик", "Системный администратор", "Архитектор", "Пилот", "Специалист по робототехнике"],
      vuzi: [
        "СевГУ (Политехнический институт) — Робототехника",
        "ЧВВМУ им. Нахимова — Эксплуатация судовых машин",
        "КФУ — Агроинженерия и строительство"
      ],
      colleges: [
        "Севастопольский промышленно-технологический колледж",
        "Севастопольский колледж информационных технологий",
        "Крымский многопрофильный колледж"
      ]
    },
    I: {
      name: "Интеллектуальный (Исследователь)",
      desc: "Ваш ум настроен на поиск истины. Вы любите анализировать данные, решать сложные логические задачи и заниматься наукой. Вам важна автономия и возможность глубокого погружения в тему.",
      recommendation: "Учитесь презентовать свои идеи широкой аудитории простым языком. Это поможет вашим исследованиям получить поддержку.",
      professions: ["Программист-разработчик", "Врач-исследователь", "Аналитик данных", "Физик-ядерщик", "Биохимик"],
      vuzi: [
        "СевГУ — Информационная безопасность",
        "КФУ — Медицинская академия (Лечебное дело)",
        "МГУ (филиал в Севастополе) — Прикладная математика"
      ],
      colleges: [
        "Медицинский колледж им. Жени Дерюгиной",
        "Керченский политехнический колледж (ИТ-направления)"
      ]
    },
    A: {
      name: "Артистичный (Творец)",
      desc: "Вы обладаете живым воображением и не терпите рутины. Выражение идей через образы и чувства — ваша сильная сторона. Вам нужна творческая свобода.",
      recommendation: "Освойте основы тайм-менеджмента. Дисциплина поможет вашим творческим порывам превращаться в завершенные проекты.",
      professions: ["Дизайнер", "Архитектор", "Арт-директор", "Журналист", "Актер/Режиссер"],
      vuzi: [
        "КИПУ — Дизайн и Искусство",
        "СевГУ — Архитектура и дизайн среды",
        "КФУ — Филология и журналистика"
      ],
      colleges: [
        "Крымское художественное училище им. Самокиша",
        "Севастопольский колледж сервиса и торговли (дизайн)"
      ]
    },
    S: {
      name: "Социальный (Наставник)",
      desc: "Вы обладаете высоким эмоциональным интеллектом. Помощь людям, обучение и лечение — сферы, где вы будете успешны. Вы мастер коммуникаций.",
      recommendation: "Учитесь выстраивать личные границы. Помогая другим, важно сохранять собственный ресурс и не брать на себя слишком много.",
      professions: ["Психолог", "Преподаватель", "HR-менеджер", "Врач-педиатр", "Социальный предприниматель"],
      vuzi: [
        "СевГУ — Психология и Педагогика",
        "КФУ — Факультет психологии",
        "КИПУ — Специальное (дефектологическое) образование"
      ],
      colleges: [
        "Севастопольский педагогический колледж",
        "Ялтинский медицинский колледж"
      ]
    },
    E: {
      name: "Предприимчивый (Лидер)",
      desc: "Вы лидер, умеющий вдохновлять. Энергия, риск и управление ресурсами — это про вас. Вы ориентированы на достижение высокого статуса и материального успеха.",
      recommendation: "Развивайте активное слушание. Учет мнений команды сделает ваше лидерство более устойчивым и эффективным.",
      professions: ["Предприниматель", "Менеджер по продажам", "Юрист", "Политик", "Продюсер"],
      vuzi: [
        "КФУ — Институт экономики и управления",
        "РЭУ им. Плеханова (филиал)",
        "СевГУ — Государственное управление"
      ],
      colleges: [
        "Севастопольский торгово-экономический колледж",
        "Крымский колледж экономики и управления"
      ]
    },
    C: {
      name: "Конвенциональный (Организатор)",
      desc: "Вы цените структуру и точность. Обработка информации, финансы и администрирование — ваши идеальные сферы. Вы надежны и внимательны к мелочам.",
      recommendation: "Пробуйте иногда отходить от правил в нестандартных ситуациях. Гибкость мышления поможет вам в условиях неопределенности.",
      professions: ["Бухгалтер", "Финансовый аналитик", "Специалист по БД", "Архивариус", "Налоговый инспектор"],
      vuzi: [
        "СевГУ — Бухгалтерский учет и аудит",
        "КФУ — Экономическая безопасность",
        "МГУ — Финансы и кредит"
      ],
      colleges: [
        "Севастопольский колледж информационных технологий",
        "Симферопольский колледж сервиса и дизайна"
      ]
    }
  };

  const questionTemplates = [
    { q: "Что вам ближе в работе?", opts: [{t:"Работа с техникой и оборудованием", s:'R'}, {t:"Анализ данных и поиск закономерностей", s:'I'}] },
    { q: "Как вы предпочитаете решать проблемы?", opts: [{t:"Творческим подходом без правил", s:'A'}, {t:"Проверенными инструкциями", s:'C'}] },
    { q: "Ваша роль в новом проекте?", opts: [{t:"Организация команды и лидерство", s:'E'}, {t:"Помощь участникам и обучение", s:'S'}] },
    { q: "В свободное время вы скорее...", opts: [{t:"Сделаете что-то своими руками", s:'R'}, {t:"Будете изучать что-то новое", s:'I'}] },
    { q: "Что вас больше вдохновляет?", opts: [{t:"Красота и гармония", s:'A'}, {t:"Порядок и четкая структура", s:'C'}] },
    { q: "В чем ваша сила?", opts: [{t:"Умение убеждать и вести за собой", s:'E'}, {t:"Умение сопереживать и слушать", s:'S'}] }
  ];

  const questions = Array.from({ length: 50 }, (_, i) => {
    const template = questionTemplates[i % questionTemplates.length];
    return {
      ...template,
      q: `${template.q}`
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

    // Отрисовка PDF (используем латиницу-транслит или английский для совместимости шрифтов)
    doc.setFontSize(22);
    doc.text("CAREER PATH REPORT", 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Type: ${topType} - ${data.name.split(' (')[0]}`, 20, 35);
    
    doc.setFontSize(10);
    doc.text("Description summary:", 20, 50);
    const splitDesc = doc.splitTextToSize(data.desc, 170);
    doc.text(splitDesc, 20, 55);

    doc.text("Key Professions:", 20, 80);
    data.professions.forEach((p, i) => doc.text(`- ${p}`, 25, 87 + (i * 6)));

    doc.text("Higher Education (Universities):", 20, 125);
    data.vuzi.forEach((v, i) => doc.text(`- ${v.split(' — ')[0]}`, 25, 132 + (i * 6)));

    doc.text("Vocational Education (Colleges):", 20, 160);
    data.colleges.forEach((c, i) => doc.text(`- ${c}`, 25, 167 + (i * 6)));

    doc.setFontSize(8);
    doc.text("Full interactive report is available in the FuturePath application.", 20, 280);

    doc.save("FuturePath_Report.pdf");
    setIsGenerating(false);
  };

  const bestType = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
  const result = reportData[bestType];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100 overflow-hidden relative">
        
        {currentStep === 'start' && (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-6">
              <GraduationCap className="text-white w-14 h-14" />
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">FuturePath <span className="text-indigo-600">Pro</span></h1>
            <p className="text-slate-500 mb-10 text-lg max-w-sm mx-auto">Интеллектуальная система подбора карьеры. 50 вопросов для анализа ваших талантов и выбора обучения в Крыму.</p>
            <button 
              onClick={() => setCurrentStep('test')} 
              className="w-full py-6 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-indigo-600 shadow-xl transition-all active:scale-95"
            >
              Начать тест
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Анализ талантов</span>
                <span className="text-slate-400 font-bold">{currentQuestion + 1} / 50</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
                  style={{width: `${((currentQuestion+1)/50)*100}%`}}
                ></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-10 leading-tight">{questions[currentQuestion].q}</h2>
            <div className="grid gap-4">
              {questions[currentQuestion].opts.map((o, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(o.s)} 
                  className="w-full p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-lg font-black text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {i === 0 ? 'A' : 'B'}
                  </div>
                  <span className="text-slate-700 font-bold text-lg">{o.t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="animate-in zoom-in duration-700 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2rem] p-8 text-white shadow-2xl border border-white/10">
               <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-indigo-500/20 rounded-xl backdrop-blur-md">
                    <UserCheck className="text-indigo-400 w-8 h-8" />
                 </div>
                 <h3 className="text-indigo-300 font-black uppercase tracking-widest text-xs">Ваш психотип найден</h3>
               </div>
               <h2 className="text-4xl font-black mb-4 tracking-tighter">{result.name}</h2>
               <p className="text-slate-300 leading-relaxed text-sm opacity-90">{result.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                    <h4 className="font-black text-emerald-900 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider">
                        <CheckCircle2 size={16}/> Профессии
                    </h4>
                    <ul className="text-emerald-800 text-sm space-y-2 font-bold">
                        {result.professions.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                    <h4 className="font-black text-blue-900 mb-3 flex items-center gap-2 uppercase text-xs tracking-wider">
                        <BookOpen size={16}/> Рекомендация
                    </h4>
                    <p className="text-blue-800 text-xs leading-relaxed font-semibold italic">"{result.recommendation}"</p>
                </div>
            </div>

            <div className="bg-white border-2 border-slate-50 rounded-3xl p-6">
              <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2 text-lg">
                <Map className="w-6 h-6 text-indigo-600" /> Где учиться (Крым и Севастополь):
              </h4>
              <div className="space-y-6">
                <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Высшее образование (ВУЗы)</span>
                    <div className="grid gap-2">
                        {result.vuzi.map((v, i) => (
                            <div key={i} className="px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 border border-slate-100">{v}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Среднее профессиональное (Колледжи)</span>
                    <div className="grid gap-2">
                        {result.colleges.map((c, i) => (
                            <div key={i} className="px-4 py-3 bg-indigo-50 rounded-xl text-xs font-bold text-indigo-900 border border-indigo-100">{c}</div>
                        ))}
                    </div>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={generatePDF} 
                disabled={isGenerating} 
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
              >
                <Download size={24} /> {isGenerating ? "ФОРМИРОВАНИЕ..." : "СКАЧАТЬ ОТЧЕТ PDF"}
              </button>
              <button 
                onClick={() => { setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start'); }} 
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-900 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCw size={16} /> Пройти исследование заново
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CareerTestApp;
