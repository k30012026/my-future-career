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

  // Подгружаем jsPDF для экспорта
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const reportData = {
    R: {
      name: "Реалистичный (Технарь)",
      desc: "Вам нравится работать руками и техникой. Вы цените четкий результат.",
      vuzi: [
        "СевГУ (Политех) — Робототехника",
        "ЧВВМУ им. Нахимова — Судовождение",
        "КИПУ — Строительство и автосервис",
        "КФУ — Агроинженерия"
      ],
      profs: ["Инженер", "Механик", "Системный администратор"]
    },
    I: {
      name: "Интеллектуальный (Исследователь)",
      desc: "Ваша стихия — анализ, наука и решение сложных логических задач.",
      vuzi: [
        "СевГУ — Кибербезопасность и ИИ",
        "КФУ — Медицинская академия",
        "МГУ (Севастополь) — Прикладная математика",
        "КФУ — Физико-технический институт"
      ],
      profs: ["Программист", "Врач", "Ученый", "Data Scientist"]
    },
    A: {
      name: "Артистичный (Творец)",
      desc: "Вы креативны, эмоциональны и не любите жестких рамок.",
      vuzi: [
        "КИПУ — Дизайн и Искусство",
        "КФУ — Журналистика и Медиа",
        "СевГУ — Архитектура",
        "Крымское училище им. Самокиша"
      ],
      profs: ["Дизайнер", "Архитектор", "Маркетолог", "Блогер"]
    },
    S: {
      name: "Социальный (Наставник)",
      desc: "Вы умеете слушать, сопереживать и эффективно обучать других.",
      vuzi: [
        "СевГУ — Педагогика и Психология",
        "КФУ — Факультет психологии",
        "КИПУ — Дефектология",
        "Медколледжи — Сестринское дело"
      ],
      profs: ["Учитель", "Психолог", "Врач-терапевт", "HR"]
    },
    E: {
      name: "Предприимчивый (Лидер)",
      desc: "Вы лидер по натуре, умеете убеждать и брать на себя ответственность.",
      vuzi: [
        "КФУ — Институт экономики",
        "СевГУ — Управление и бизнес",
        "РЭУ им. Плеханова (филиал)",
        "МГУ — Государственное управление"
      ],
      profs: ["Предприниматель", "Юрист", "Менеджер", "Политик"]
    },
    C: {
      name: "Конвенциональный (Организатор)",
      desc: "Вы любите порядок, точность и работу с данными или документами.",
      vuzi: [
        "СевГУ — Бухучет и Аудит",
        "КФУ — Государственное управление",
        "КФУ — Финансовый анализ",
        "Банковские колледжи Крыма"
      ],
      profs: ["Бухгалтер", "Финансист", "Аналитик", "Архивариус"]
    }
  };

  const questions = [
    {
      q: "Что вам ближе всего?",
      opts: [
        { t: "Ремонтировать гаджеты или мебель", s: 'R' },
        { t: "Изучать теорию черных дыр", s: 'I' },
        { t: "Рисовать или монтировать видео", s: 'A' },
        { t: "Помогать друзьям решать их проблемы", s: 'S' },
        { t: "Организовать платный турнир по играм", s: 'E' },
        { t: "Вести личный бюджет и график", s: 'C' }
      ]
    },
    {
      q: "В каком проекте вы бы поучаствовали?",
      opts: [
        { t: "Сборка гоночного болида", s: 'R' },
        { t: "Создание вакцины в лаборатории", s: 'I' },
        { t: "Постановка театрального шоу", s: 'A' },
        { t: "Волонтерство в детском лагере", s: 'S' },
        { t: "Переговоры с крупным инвестором", s: 'E' },
        { t: "Создание идеальной базы данных", s: 'C' }
      ]
    }
  ];

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
    const topType = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
    const data = reportData[topType];

    doc.setFont("helvetica", "bold");
    doc.text("FuturePath Report", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Type: ${data.name}`, 20, 40);
    doc.text("Recommended Universities in Crimea:", 20, 60);
    
    data.vuzi.forEach((v, i) => {
      doc.text(`${i+1}. ${v}`, 20, 70 + (i * 10));
    });

    doc.save("career_path.pdf");
    setIsGenerating(false);
  };

  const bestType = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
  const result = reportData[bestType];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        
        {currentStep === 'start' && (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
              <GraduationCap className="text-white w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-4">FuturePath</h1>
            <p className="text-slate-500 mb-8">Найди свой университет в Крыму и Севастополе</p>
            <button onClick={() => setCurrentStep('test')} className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-xl hover:bg-blue-700 transition-all">
              Начать тест
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div>
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span>Вопрос {currentQuestion + 1}</span>
                <span>{Math.round(((currentQuestion+1)/questions.length)*100)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{width: `${((currentQuestion+1)/questions.length)*100}%`}}></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{questions[currentQuestion].q}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].opts.map((o, i) => (
                <button key={i} onClick={() => handleAnswer(o.s)} className="w-full p-4 text-left border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold">{i+1}</span>
                  {o.t}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="animate-in fade-in duration-700">
            <div className="bg-blue-600 rounded-2xl p-6 text-white mb-6">
              <h3 className="text-sm font-bold opacity-80 uppercase mb-1">Твой психотип</h3>
              <h2 className="text-2xl font-black mb-2">{result.name}</h2>
              <p className="text-sm leading-relaxed opacity-90">{result.desc}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" /> Рекомендуемые вузы:
              </h4>
              <div className="space-y-2">
                {result.vuzi.map((v, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={generatePDF} disabled={isGenerating} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700">
                <Download size={20} /> {isGenerating ? "Создаем..." : "Скачать PDF"}
              </button>
              <button onClick={() => { setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start'); }} className="w-full py-4 text-slate-400 font-bold hover:text-blue-600 transition-colors">
                Пройти заново
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CareerTestApp;
