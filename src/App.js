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

  // Вся "база" теперь здесь, внутри компонента. Это исключает ошибки импорта.
  const reportData = {
    R: {
      name: "Реалистичный (Технарь)",
      desc: "Вы человек дела. Вам нравится видеть осязаемый результат своей работы, работать с инструментами, техникой или природными объектами.",
      vuzi: [
        "СевГУ (Политехнический институт) — Робототехника",
        "ЧВВМУ им. Нахимова — Эксплуатация судовых машин",
        "КИПУ — Автомобильное хозяйство",
        "КФУ — Агроинженерия и строительство"
      ],
      profs: ["Инженер-конструктор", "Пилот", "Системный администратор"]
    },
    I: {
      name: "Интеллектуальный (Исследователь)",
      desc: "Ваш ум настроен на поиск истины. Вы любите анализировать данные, решать сложные логические задачи и заниматься наукой.",
      vuzi: [
        "СевГУ — Информационная безопасность",
        "КФУ — Медицинская академия (Лечебное дело)",
        "МГУ (филиал в Севастополе) — Прикладная математика",
        "КФУ — Физико-технический институт"
      ],
      profs: ["Программист-исследователь", "Врач-диагност", "Data Scientist"]
    },
    A: {
      name: "Артистичный (Творец)",
      desc: "Вы обладаете живым воображением и не терпите рутины. Выражение идей через образы и чувства — ваша сильная сторона.",
      vuzi: [
        "КИПУ — Дизайн и Искусство",
        "КФУ — Журналистика и медиакоммуникации",
        "СевГУ — Архитектура и дизайн среды",
        "Крымское художественное училище им. Самокиша"
      ],
      profs: ["Арт-директор", "Архитектор", "Контент-мейкер"]
    },
    S: {
      name: "Социальный (Наставник)",
      desc: "Вы обладаете высоким эмоциональным интеллектом. Помощь людям, обучение и лечение — сферы, где вы будете успешны.",
      vuzi: [
        "СевГУ — Психология и Педагогика",
        "КФУ — Факультет психологии",
        "КИПУ — Специальное (дефектологическое) образование",
        "ГПА КФУ (Ялта) — Педагогическое образование"
      ],
      profs: ["Психолог", "HR-менеджер", "Преподаватель"]
    },
    E: {
      name: "Предприимчивый (Лидер)",
      desc: "Вы лидер, умеющий вдохновлять. Энергия, риск и управление ресурсами — это про вас.",
      vuzi: [
        "КФУ — Институт экономики и управления",
        "СевГУ — Менеджмент и государственное управление",
        "РЭУ им. Плеханова (Севастопольский филиал)",
        "МГУ — Управление персоналом"
      ],
      profs: ["Предприниматель", "Юрист", "Продюсер"]
    },
    C: {
      name: "Конвенциональный (Организатор)",
      desc: "Вы цените структуру и точность. Обработка информации, финансы и администрирование — ваши идеальные сферы.",
      vuzi: [
        "СевГУ — Бухгалтерский учет и аудит",
        "КФУ — Экономическая безопасность",
        "КФУ — Государственное и муниципальное управление",
        "Колледж информационных технологий (Севастополь)"
      ],
      profs: ["Финансовый аналитик", "Аудитор", "IT-координатор"]
    }
  };

  const questions = [
    {
      q: "Чем бы вы предпочли заняться в выходной?",
      opts: [
        { t: "Собрать сложную модель или починить прибор", s: 'R' },
        { t: "Разгадывать сложные головоломки или читать научпоп", s: 'I' },
        { t: "Заняться творчеством: рисовать, писать или играть", s: 'A' },
        { t: "Провести время, помогая близким или друзьям", s: 'S' },
        { t: "Организовать крупное мероприятие или поездку", s: 'E' },
        { t: "Навести идеальный порядок в файлах или делах", s: 'C' }
      ]
    },
    {
      q: "Какую роль в команде вы обычно выбираете?",
      opts: [
        { t: "Исполнитель, отвечающий за техническую часть", s: 'R' },
        { t: "Генератор идей и аналитик", s: 'I' },
        { t: "Креативщик, создающий визуальный стиль", s: 'A' },
        { t: "Миротворец, следящий за климатом в группе", s: 'S' },
        { t: "Лидер, принимающий волевые решения", s: 'E' },
        { t: "Контролер, следящий за сроками и деталями", s: 'C' }
      ]
    },
    {
      q: "Какая новость в СМИ привлечет ваше внимание?",
      opts: [
        { t: "Выход нового мощного процессора или гаджета", s: 'R' },
        { t: "Открытие нового закона физики или биологии", s: 'I' },
        { t: "Победители премии в области дизайна или кино", s: 'A' },
        { t: "Успешная благотворительная акция", s: 'S' },
        { t: "Слияние двух крупнейших корпораций", s: 'E' },
        { t: "Изменение правил налогообложения или отчетности", s: 'C' }
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
    if (!window.jspdf) {
      console.error("jsPDF not loaded");
      return;
    }
    setIsGenerating(true);
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const sortedScores = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const topType = sortedScores[0][0];
    const data = reportData[topType];

    // Используем Helvetica (стандарт для PDF без кириллицы). 
    // Для полной поддержки русского в PDF нужны кастомные шрифты (.ttf), 
    // поэтому в заголовке отчета используем универсальные термины.
    doc.setFont("helvetica", "bold");
    doc.text("FuturePath: Career Guidance Report", 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Result Type: ${topType} (${data.name.split('(')[0]})`, 20, 40);
    doc.text("Recommended Universities (Crimea/Sevastopol):", 20, 60);
    
    data.vuzi.forEach((v, i) => {
      // Очищаем строки от спецсимволов для безопасности PDF
      const cleanText = v.replace(/[—]/g, '-');
      doc.text(`${i+1}. ${cleanText}`, 20, 75 + (i * 10));
    });

    doc.setFontSize(10);
    doc.text("Full analysis available in the web application results screen.", 20, 150);

    doc.save("my_career_path.pdf");
    setIsGenerating(false);
  };

  const bestType = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0];
  const result = reportData[bestType];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
        
        {currentStep === 'start' && (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 transition-transform hover:rotate-0">
              <GraduationCap className="text-white w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">FuturePath</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">Пройдите тест и получите список вузов Севастополя и Крыма, подходящих именно вам.</p>
            <button 
              onClick={() => setCurrentStep('test')} 
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Начать тест
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
                <span className="text-blue-600">{Math.round(((currentQuestion+1)/questions.length)*100)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                  style={{width: `${((currentQuestion+1)/questions.length)*100}%`}}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 leading-tight">{questions[currentQuestion].q}</h2>
            <div className="space-y-3">
              {questions[currentQuestion].opts.map((o, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(o.s)} 
                  className="w-full p-4 text-left border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">{i+1}</span>
                  <span className="text-slate-700 font-medium group-hover:text-blue-900">{o.t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="animate-in zoom-in duration-500">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white mb-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Ваш результат</h3>
              </div>
              <h2 className="text-3xl font-black mb-3">{result.name}</h2>
              <p className="text-sm leading-relaxed text-blue-50">{result.desc}</p>
            </div>

            <div className="mb-8">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" /> Рекомендуемые вузы:
              </h4>
              <div className="space-y-2">
                {result.vuzi.map((v, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={generatePDF} 
                disabled={isGenerating} 
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
              >
                <Download size={20} /> {isGenerating ? "Подготовка..." : "Скачать PDF отчет"}
              </button>
              <button 
                onClick={() => { setScores({R:0,I:0,A:0,S:0,E:0,C:0}); setCurrentQuestion(0); setCurrentStep('start'); }} 
                className="w-full py-4 text-slate-400 font-bold hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} /> Начать заново
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CareerTestApp;
