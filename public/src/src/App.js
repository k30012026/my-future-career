import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calculator, Feather, Heart, 
  Map, Search, Wrench, PieChart, Smile, 
  CheckCircle, AlertTriangle, XCircle, ArrowRight, RefreshCw 
} from 'lucide-react';

/**
 * CareerTestApp - Полное приложение для профориентации подростков.
 * Содержит 30 вопросов и детальную логику анализа по системе Холланда (RIASEC).
 */
const CareerTestApp = () => {
  const [currentStep, setCurrentStep] = useState('start'); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });

  // Список из 30 вопросов, адаптированных для подростков
  const questions = [
    {
      id: 1,
      text: "Представь, что в школе день самоуправления. Какую роль ты выберешь?",
      options: [
        { text: "Директор: буду руководить и принимать решения", type: 'E' },
        { text: "Художник: оформлю школу и сделаю афиши", type: 'A' },
        { text: "Завуч: составлю идеальное расписание", type: 'C' },
        { text: "Волонтер: буду помогать младшим классам", type: 'S' },
        { text: "Техник: настрою звук и свет в актовом зале", type: 'R' },
        { text: "Аналитик: соберу отзывы и подведу итоги дня", type: 'I' },
      ]
    },
    {
      id: 2,
      text: "Какой школьный предмет кажется тебе самым логичным?",
      options: [
        { text: "Информатика или Алгебра (алгоритмы)", type: 'C' },
        { text: "Физика или Биология (законы природы)", type: 'I' },
        { text: "Литература или МХК (искусство)", type: 'A' },
        { text: "Технология или Физкультура (практика)", type: 'R' },
        { text: "Обществознание (управление и право)", type: 'E' },
        { text: "Иностранный язык (коммуникация)", type: 'S' },
      ]
    },
    {
      id: 3,
      text: "Ты делаешь групповой проект. Твоя любимая часть работы?",
      options: [
        { text: "Поиск глубокой информации и фактов", type: 'I' },
        { text: "Создание красивого дизайна слайдов", type: 'A' },
        { text: "Публичное выступление и защита", type: 'E' },
        { text: "Помощь участникам команды в спорах", type: 'S' },
        { text: "Сборка физического макета проекта", type: 'R' },
        { text: "Проверка всех дат и списка литературы", type: 'C' },
      ]
    },
    {
      id: 4,
      text: "Что тебя больше всего утомляет?",
      options: [
        { text: "Долгие разговоры без конкретного дела", type: 'R' },
        { text: "Действия без четкого логического плана", type: 'I' },
        { text: "Жесткая дисциплина и отсутствие творчества", type: 'A' },
        { text: "Работа в одиночестве без людей", type: 'S' },
        { text: "Подчинение чужим правилам без обсуждения", type: 'E' },
        { text: "Беспорядок и хаос в делах", type: 'C' },
      ]
    },
    {
      id: 5,
      text: "Если бы ты писал статью, о чем бы она была?",
      options: [
        { text: "Как устроен новый двигатель или смартфон", type: 'R' },
        { text: "Тайны возникновения Вселенной", type: 'I' },
        { text: "Влияние музыки на настроение человека", type: 'A' },
        { text: "Как научиться понимать чувства друзей", type: 'S' },
        { text: "Как запустить успешный стартап", type: 'E' },
        { text: "Статистика использования соцсетей в мире", type: 'C' },
      ]
    },
    {
      id: 6,
      text: "У тебя 3 часа свободного времени. Что выберешь?",
      options: [
        { text: "Посмотреть научный фильм или почитать", type: 'I' },
        { text: "Покататься на велике или починить что-то", type: 'R' },
        { text: "Встретиться с большой компанией друзей", type: 'S' },
        { text: "Заняться своим хобби (рисование/музыка)", type: 'A' },
        { text: "Разобрать вещи и навести порядок в телефоне", type: 'C' },
        { text: "Подумать над планом саморазвития или бизнеса", type: 'E' },
      ]
    },
    {
      id: 7,
      text: "Твой стиль игры в компьютерных играх:",
      options: [
        { text: "Изучаю мир, ищу секреты и пасхалки", type: 'I' },
        { text: "Создаю клан и руковожу другими игроками", type: 'E' },
        { text: "Играю за саппорта (лекаря), помогаю всем", type: 'S' },
        { text: "Создаю красивые постройки или скины", type: 'A' },
        { text: "Крафчу предметы и улучшаю технику", type: 'R' },
        { text: "Выполняю все квесты строго по порядку", type: 'C' },
      ]
    },
    {
      id: 8,
      text: "Какой кружок в школе тебе ближе?",
      options: [
        { text: "Робототехника / Моделирование", type: 'R' },
        { text: "Школа лидерства / Дебаты", type: 'E' },
        { text: "Волонтерский центр / Психология", type: 'S' },
        { text: "Театральная студия / Дизайн", type: 'A' },
        { text: "Шахматы / Программирование", type: 'I' },
        { text: "Математика / Редакция газеты", type: 'C' },
      ]
    },
    {
      id: 9,
      text: "О чем бы ты вел свой блог?",
      options: [
        { text: "DIY: ремонт своими руками", type: 'R' },
        { text: "Научпоп: интересные факты", type: 'I' },
        { text: "Арт-дневник: рисунки и творчество", type: 'A' },
        { text: "Советы по отношениям и дружбе", type: 'S' },
        { text: "Бизнес и путь к успеху", type: 'E' },
        { text: "Обзоры и сравнения (топ-списки)", type: 'C' },
      ]
    },
    {
      id: 10,
      text: "Что тебя больше радует в результате работы?",
      options: [
        { text: "То, что вещь теперь работает", type: 'R' },
        { text: "То, что я узнал истину", type: 'I' },
        { text: "То, что получилось красиво и необычно", type: 'A' },
        { text: "Благодарность людей", type: 'S' },
        { text: "Прибыль или достижение лидерства", type: 'E' },
        { text: "То, что всё сделано идеально правильно", type: 'C' },
      ]
    },
    {
      id: 11,
      text: "Сломался телефон. Твоя первая мысль?",
      options: [
        { text: "Попробую разобрать его сам", type: 'R' },
        { text: "Найду в интернете схему поломки", type: 'I' },
        { text: "Он был частью моего имиджа, жаль!", type: 'A' },
        { text: "Спрошу у друзей, где хороший мастер", type: 'S' },
        { text: "Сдам в ремонт и потребую скидку", type: 'E' },
        { text: "Проверю, осталась ли гарантия и чеки", type: 'C' },
      ]
    },
    {
      id: 12,
      text: "Выбираем фильм на вечер. Твой жанр?",
      options: [
        { text: "Про выживание или гонки", type: 'R' },
        { text: "Детектив или научная фантастика", type: 'I' },
        { text: "Авторское кино или фэнтези", type: 'A' },
        { text: "Добрая комедия про отношения", type: 'S' },
        { text: "Байопик про миллионера", type: 'E' },
        { text: "Историческая реконструкция", type: 'C' },
      ]
    },
    {
      id: 13,
      text: "Друг просит списать. Как поступишь?",
      options: [
        { text: "Просто дам тетрадку, мне не жалко", type: 'R' },
        { text: "Объясню ему решение, чтобы он понял", type: 'I' },
        { text: "Предложу сделать задание креативнее", type: 'A' },
        { text: "Сделаю за него, чтобы выручить", type: 'S' },
        { text: "Договорюсь о взаимной услуге", type: 'E' },
        { text: "Помогу найти ошибки в его работе", type: 'C' },
      ]
    },
    {
      id: 14,
      text: "В книжном магазине ты идешь в раздел...",
      options: [
        { text: "Техника, авто, спорт", type: 'R' },
        { text: "Наука, история, философия", type: 'I' },
        { text: "Искусство, дизайн, поэзия", type: 'A' },
        { text: "Психология, медицина", type: 'S' },
        { text: "Экономика, политика, лидерство", type: 'E' },
        { text: "Энциклопедии, справочники", type: 'C' },
      ]
    },
    {
      id: 15,
      text: "Идеальный отпуск для тебя:",
      options: [
        { text: "Поход с костром и палатками", type: 'R' },
        { text: "Тур по обсерваториям и лабораториям", type: 'I' },
        { text: "Фототур в горы или Париж", type: 'A' },
        { text: "Волонтерская поездка в приют", type: 'S' },
        { text: "Отдых в дорогом современном отеле", type: 'E' },
        { text: "Четко расписанная экскурсия по гиду", type: 'C' },
      ]
    },
    {
      id: 16,
      text: "Твоя суперспособность (выбери одну):",
      options: [
        { text: "Мгновенно чинить любой механизм", type: 'R' },
        { text: "Видеть мир в формулах и цифрах", type: 'I' },
        { text: "Создавать миры силой воображения", type: 'A' },
        { text: "Чувствовать боль и радость других", type: 'S' },
        { text: "Убеждать людей в своей правоте", type: 'E' },
        { text: "Идеально планировать будущее", type: 'C' },
      ]
    },
    {
      id: 17,
      text: "Что важнее всего в работе будущего?",
      options: [
        { text: "Работа руками или с техникой", type: 'R' },
        { text: "Возможность открывать новое", type: 'I' },
        { text: "Свобода творчества и графика", type: 'A' },
        { text: "Принесение пользы обществу", type: 'S' },
        { text: "Высокий доход и власть", type: 'E' },
        { text: "Стабильность и четкие задачи", type: 'C' },
      ]
    },
    {
      id: 18,
      text: "Как ты ведешь себя в споре?",
      options: [
        { text: "Доказываю правоту делом", type: 'R' },
        { text: "Опираюсь на логику и факты", type: 'I' },
        { text: "Использую яркие сравнения и образы", type: 'A' },
        { text: "Стараюсь помирить стороны", type: 'S' },
        { text: "Беру инициативу и убеждаю всех", type: 'E' },
        { text: "Ссылаюсь на правила и авторитеты", type: 'C' },
      ]
    },
    {
      id: 19,
      text: "Если бы ты строил дом, ты бы...",
      options: [
        { text: "Клал кирпичи и вел проводку сам", type: 'R' },
        { text: "Разработал систему умного дома", type: 'I' },
        { text: "Придумал уникальный стиль фасада", type: 'A' },
        { text: "Сделал его уютным для гостей", type: 'S' },
        { text: "Руководил бригадой строителей", type: 'E' },
        { text: "Контролировал смету и сроки", type: 'C' },
      ]
    },
    {
      id: 20,
      text: "Что ты откладываешь на самый последний момент?",
      options: [
        { text: "Написание длинных текстов", type: 'R' },
        { text: "Продажи и переговоры", type: 'I' },
        { text: "Заполнение скучных таблиц", type: 'A' },
        { text: "Технические задачи", type: 'S' },
        { text: "Научный анализ", type: 'E' },
        { text: "Публичные выступления", type: 'C' },
      ]
    },
    {
      id: 21,
      text: "Где бы ты хотел подработать летом?",
      options: [
        { text: "Помощник автослесаря / Курьер", type: 'R' },
        { text: "Лаборант / IT-тестировщик", type: 'I' },
        { text: "Фотограф / Оформитель", type: 'A' },
        { text: "Аниматор / Няня", type: 'S' },
        { text: "Промоутер / Помощник менеджера", type: 'E' },
        { text: "Сотрудник архива / Почты", type: 'C' },
      ]
    },
    {
      id: 22,
      text: "Перед тобой куча деталей Lego. Твои действия?",
      options: [
        { text: "Соберу машину строго по инструкции", type: 'R' },
        { text: "Изучу, как работают крепления", type: 'I' },
        { text: "Соберу фантастическое существо", type: 'A' },
        { text: "Позову друзей собирать вместе", type: 'S' },
        { text: "Организую выставку-продажу моделей", type: 'E' },
        { text: "Разложу все детали по цветам", type: 'C' },
      ]
    },
    {
      id: 23,
      text: "Твоя комната в идеале:",
      options: [
        { text: "Мастерская со множеством инструментов", type: 'R' },
        { text: "Библиотека с мощным компьютером", type: 'I' },
        { text: "Творческая студия с ярким декором", type: 'A' },
        { text: "Место для посиделок с друзьями", type: 'S' },
        { text: "Стильный кабинет будущего лидера", type: 'E' },
        { text: "Идеально чистое пространство без лишних вещей", type: 'C' },
      ]
    },
    {
      id: 24,
      text: "Что важнее всего в жизни?",
      options: [
        { text: "Уметь всё делать своими руками", type: 'R' },
        { text: "Постоянно развивать интеллект", type: 'I' },
        { text: "Найти свой уникальный путь", type: 'A' },
        { text: "Помогать тем, кто нуждается", type: 'S' },
        { text: "Достичь успеха и признания", type: 'E' },
        { text: "Жить в порядке и гармонии", type: 'C' },
      ]
    },
    {
      id: 25,
      text: "Ты выиграл грант. На что потратишь?",
      options: [
        { text: "Куплю профессиональное оборудование", type: 'R' },
        { text: "Оплачу обучение в топовом вузе", type: 'I' },
        { text: "Организую свою выставку или концерт", type: 'A' },
        { text: "Пожертвую на благотворительность", type: 'S' },
        { text: "Открою небольшую кофейню или онлайн-шоп", type: 'E' },
        { text: "Положу на счет в банке", type: 'C' },
      ]
    },
    {
      id: 26,
      text: "В случае зомби-апокалипсиса ты...",
      options: [
        { text: "Укрепляешь убежище и чинишь транспорт", type: 'R' },
        { text: "Ищешь антидот в лаборатории", type: 'I' },
        { text: "Рисуешь граффити о надежде на стенах", type: 'A' },
        { text: "Заботишься о раненых и детях", type: 'S' },
        { text: "Становишься лидером выживших", type: 'E' },
        { text: "Ведешь учет запасов еды и воды", type: 'C' },
      ]
    },
    {
      id: 27,
      text: "Какое животное тебе симпатичнее?",
      options: [
        { text: "Трудолюбивый бобр", type: 'R' },
        { text: "Мудрая сова", type: 'I' },
        { text: "Яркий павлин", type: 'A' },
        { text: "Верная собака", type: 'S' },
        { text: "Гордый лев", type: 'E' },
        { text: "Организованный муравей", type: 'C' },
      ]
    },
    {
      id: 28,
      text: "Видишь несправедливость на улице. Твоя реакция?",
      options: [
        { text: "Вмешаюсь, если нужно применить силу", type: 'R' },
        { text: "Вызову спецслужбы и прослежу за ними", type: 'I' },
        { text: "Сниму видео для соцсетей, чтобы поднять шум", type: 'A' },
        { text: "Подойду и попробую успокоить пострадавшего", type: 'S' },
        { text: "Найду свидетелей и организую помощь", type: 'E' },
        { text: "Зафиксирую детали происшествия на бумаге", type: 'C' },
      ]
    },
    {
      id: 29,
      text: "Твой девиз:",
      options: [
        { text: "Меньше слов, больше дела", type: 'R' },
        { text: "Знание — сила", type: 'I' },
        { text: "Красота спасет мир", type: 'A' },
        { text: "Один за всех и все за одного", type: 'S' },
        { text: "Всё или ничего", type: 'E' },
        { text: "Порядок прежде всего", type: 'C' },
      ]
    },
    {
      id: 30,
      text: "Кем ты себя видишь через 10 лет?",
      options: [
        { text: "Профессионалом в технической сфере", type: 'R' },
        { text: "Ученым с мировым именем", type: 'I' },
        { text: "Известным творческим деятелем", type: 'A' },
        { text: "Человеком, изменившим чью-то жизнь", type: 'S' },
        { text: "Влиятельным руководителем / Владельцем бизнеса", type: 'E' },
        { text: "Успешным специалистом в крупной корпорации", type: 'C' },
      ]
    }
  ];

  const typesInfo = {
    R: { name: "Реалистичный", icon: <Wrench className="w-8 h-8 text-blue-500" />, desc: "Твой талант — работа с техникой и инструментами. Ты ценишь конкретику и результат." },
    I: { name: "Интеллектуальный", icon: <Search className="w-8 h-8 text-purple-500" />, desc: "Ты — исследователь. Любишь анализировать, решать сложные задачи и искать истину." },
    A: { name: "Артистичный", icon: <Feather className="w-8 h-8 text-pink-500" />, desc: "Творчество — твоя стихия. Ты не терпишь рамок и ценишь самовыражение." },
    S: { name: "Социальный", icon: <Heart className="w-8 h-8 text-red-500" />, desc: "Твое призвание — люди. Ты умеешь сопереживать, учить и помогать другим." },
    E: { name: "Предприимчивый", icon: <Briefcase className="w-8 h-8 text-orange-500" />, desc: "Ты — лидер. Тебе нравится управлять процессами, влиять на людей и достигать успеха." },
    C: { name: "Конвенциональный", icon: <Calculator className="w-8 h-8 text-green-500" />, desc: "Ты — человек системы. Ценишь порядок, точность и работу с данными." },
  };

  const getResultProfessions = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top1 = sorted[0][0];
    const top2 = sorted[1][0];
    const bottom = sorted[5][0];

    // Группы профессий (примерные)
    const profBase = {
      RI: ["Робототехник", "Инженер-механик", "Системный администратор", "Агроном", "Пилот"],
      RA: ["Архитектор", "Ландшафтный дизайнер", "Ювелир", "Фотограф", "Реставратор"],
      RS: ["Хирург", "Ветеринар", "Тренер", "Эколог", "Спасатель"],
      RE: ["Прораб", "Фермер", "Логист", "Инженер по ТБ", "Предприниматель"],
      RC: ["Оператор ЧПУ", "Картограф", "Техник ПК", "Диспетчер", "Бухгалтер"],
      IA: ["Веб-дизайнер", "Геймдизайнер", "Урбанист", "Лингвист", "Писатель"],
      IS: ["Психолог", "Врач-диагност", "Биолог", "Социолог", "Преподаватель"],
      IE: ["Маркетолог-аналитик", "Юрист", "Product Manager", "Инвест-консультант", "Журналист"],
      IC: ["Data Scientist", "Финансовый аналитик", "Экономист", "Аудитор", "Статистик"],
      AS: ["Учитель литературы", "Блогер", "Актер", "PR-менеджер", "Искусствовед"],
      AE: ["Продюсер", "Event-менеджер", "Стилист", "Арт-директор", "Копирайтер"],
      AC: ["Редактор", "Музейный работник", "Иллюстратор", "Библиотекарь", "Верстальщик"],
      SE: ["Менеджер по продажам", "Риелтор", "Адвокат", "Турагент", "HR-директор"],
      SC: ["Секретарь", "Кадровик", "Операционист", "Администратор клиники", "Медсестра"],
      EC: ["Банкир", "Налоговый инспектор", "Аудитор", "Менеджер отеля", "Закупщик"]
    };

    const key = profBase[top1 + top2] ? top1 + top2 : (profBase[top2 + top1] ? top2 + top1 : "RE");
    const antiKey = profBase[bottom + (sorted[4][0])] ? bottom + (sorted[4][0]) : "RC";

    return {
      perfect: profBase[key] || ["Специалист по развитию", "Консультант", "Менеджер проектов"],
      middle: ["Фрилансер", "Координатор", "Администратор", "Аналитик", "Оператор"],
      anti: profBase[antiKey] || ["Разнорабочий", "Охранник", "Дворник"]
    };
  };

  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('result');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {currentStep === 'start' && (
          <div className="p-8 text-center space-y-6">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Map className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Твой Путь в Будущее</h1>
            <p className="text-slate-600 text-lg">Расширенный тест из 30 вопросов. Узнай, какие профессии идеально подходят твоему характеру, а какие — нет.</p>
            <button 
              onClick={() => setCurrentStep('test')}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl text-xl hover:bg-blue-700 transition transform hover:scale-105"
            >
              Начать тест
            </button>
          </div>
        )}

        {currentStep === 'test' && (
          <div className="p-6 md:p-10">
            <div className="flex justify-between items-center mb-6 text-sm font-bold text-slate-400">
              <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">{questions[currentQuestion].text}</h2>
            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.sort(() => Math.random() - 0.5).map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(opt.type)}
                  className="p-4 text-left border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition font-medium text-slate-700"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="p-8 space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Твой Профиль Готов!</h2>
              <p className="text-slate-500">Результаты анализа 30 параметров</p>
            </div>

            {/* Ведущие типы */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(scores).sort((a,b) => b[1]-a[1]).slice(0, 2).map(([type, score], i) => (
                <div key={type} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm">{typesInfo[type].icon}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">{i === 0 ? "Главный талант" : "Дополнительный"}</div>
                    <div className="font-bold text-slate-800 text-lg">{typesInfo[type].name}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Списки профессий */}
            <div className="space-y-4">
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                <h3 className="flex items-center gap-2 font-bold text-green-800 mb-4">
                  <CheckCircle className="w-5 h-5" /> Идеально подходят:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getResultProfessions().perfect.map(p => (
                    <span key={p} className="bg-white px-3 py-1 rounded-lg text-sm font-bold text-green-700 shadow-sm border border-green-200">{p}</span>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
                <h3 className="flex items-center gap-2 font-bold text-yellow-800 mb-4">
                  <AlertTriangle className="w-5 h-5" /> Подходят 50/50:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getResultProfessions().middle.map(p => (
                    <span key={p} className="bg-white px-3 py-1 rounded-lg text-sm font-bold text-yellow-700 shadow-sm border border-yellow-200">{p}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 opacity-60">
                <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
                  <XCircle className="w-5 h-5" /> Скорее не подходят:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getResultProfessions().anti.map(p => (
                    <span key={p} className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-slate-500 line-through decoration-slate-300">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setScores({R:0, I:0, A:0, S:0, E:0, C:0}); setCurrentQuestion(0); setCurrentStep('start'); }}
              className="w-full py-3 text-slate-400 font-bold hover:text-blue-600 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Пройти заново
            </button>
          </div>
        )}
      </div>
      <p className="mt-6 text-slate-400 text-sm">Приложение адаптировано для мобильных устройств</p>
    </div>
  );
};

export default CareerTestApp;
