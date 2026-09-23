const positions = ['малыш', 'малыш-топотушка', 'юнга', 'матрос', 'старший матрос', 'морской волк'];
const MENTORS_API_URL = 'https://script.google.com/macros/s/AKfycbxIYt1Aqi7-zUL6x918nP6Vn1-p-esx1ql4a050c99y8PKna-GtbFbdajHMStELLLqJrQ/exec';
const rankTypes = {
    'юнги': { mentor: true, pirate: false, fem: false, label: 'юнги' },
    'матросы': { mentor: false, pirate: true, fem: true, label: 'матросы' },
    'старшие матросы': { mentor: false, pirate: false, fem: true, label: 'старшие матросы' },
    'морские волки': { mentor: false, pirate: false, fem: true, label: 'морские волки' }
};
const medalGroups = {
    'Для малышей': ['Юный активист', 'Непревзойденный активист', 'Юный непоседа', 'Неповторимый непоседа', 'Юный страж', 'Превосходный страж'],
    'За навыки': ['Острые когти', 'Умелый боец', 'Покоритель волн', 'Покоривший море', 'Покоритель вершин', 'Покоривший солёные скалы', 'Археолог-любитель', 'Великий кладоискатель', 'Собачий нюх', 'Совершенное чутьё'],
    'Каратели': ['Правосудие', 'Ветеран передовой', 'Ни шагу назад', 'Наш дом — наша крепость'],
    'Связанные со сферами': ['Спокойные берега', 'Блюститель порядка', 'Всегда начеку', 'Спокойствие бесценно', 'Прирождённый охотник', 'Неутомимый добытчик', 'Молодой поварёнок', 'Талантливый кулинар', 'Любимец доктора', 'Опытный травник', 'Проворный зверолов', 'Прошедший тысячи троп', 'Исцеляющий взгляд', 'Заклинатель трав'],
    'Связанные с отрядами': ['Опыт предков', 'Мудрость поколений', 'Верный напарник', 'Крепкая лапа', 'Перо знаний', 'Мозгодуй', 'Голос прошлого', 'Связь времён', 'Исследующий морские глубины', 'Пересчитавший все песчинки на морском дне', 'Хитрый вор перьев', 'Прозвавшийся птичьим несчастьем', 'Обнаруживший залежи драгоценностей', 'Хранитель морских сокровищ', 'Слушающий причитания моря', 'Позаботившийся о морском покое', 'Мастер кисти', 'Виртуоз кисти', 'Овладевающий морским искусством', 'Мастер морского боя', 'Боевой товарищ', 'Старший зверь', 'Ловкий добытчик лакомства', 'Бесплатный сыр лишь в мышеловке', 'Сырный любитель', 'Сырная душа', 'Ловец горячих новостей', 'Охотник за сенсациями', 'Искусство убеждения', 'Продай мне эту ручку', 'Игривый друг', 'Мастер развлечений', 'Подмастерье настроения', 'Хранитель праздника', 'Летописец', 'Миротворец', 'Тянущийся к морским звёздам', 'Знаток глубин', 'Душа компании', 'Главный затейник', 'Ни соринки на борту', 'Чистые лапы грязи не боятся'],
    'Остальные медали': ['Триумф', 'Коллективные узы', 'Объединяющий дух', 'Лапа помощи', 'Мастер слова', 'Виртуоз слова', 'Паучьи сети', 'Ловкий собиратель', 'Всегда на связи', 'Опутанный всемирной паутиной', 'Верный компаньон', 'Образцовый проводник', 'Плечом к плечу', 'Мы — едины', 'Незримый помощник', 'Опора экипажа'],
    'Отрядные медали': ['Господин-праздник', 'Сказитель легенд', 'Зубастый крепыш', 'Белопёрый поздравитель', 'Море знаний', 'Дарящий улыбку', 'Чистота и порядок', 'Пернатый крикун', 'Резвость дельфина'],
    'Доска поручений': ['Лëгкие крылышки — тонкое чутьë', 'Моё собственное королевство', 'Дары природы', 'Пряный апельсин и хвоя'],
    'Ордена': ['Гордость команды', 'Многократный чемпион', '«Богатство — вода: пришла и ушла»', 'Дарование Моря']
};
const trophyGroups = {
    'Общекомандные трофеи': ['Треклятый дублон', 'Кинжал триумфа', 'Медный компас', 'Бутылочка из душистой кладовой', 'Верный путь', 'Записки краболова', 'Ракушковый кораблик', 'Жаба', 'Мешок с золотом', 'Созвездие морского конька', 'Созвездие акулы', 'Созвездие дельфина', 'Созвездие косатки', 'Созвездие осьминога', 'Созвездие мурены', 'Созвездие ската', 'Созвездие черепахи', 'Созвездие крылатки', 'Созвездие медузы', 'Созвездие летучей рыбы', 'Созвездие марлина', 'Созвездие нарвала', 'Созвездие кита'],
    'Отрядные трофеи': ['Задорный компаньон', 'Безупречность осьминога', 'Китовая забота', 'Неугомонность чайки', 'Акулья свирепость', 'Рыбья задорность', 'Черепашья мудрость', 'Прирождённый творец', 'Коралловый хохотун', 'Рубиновый глаз', 'Красноречивый рассказчик', 'Задорность малька', 'Путеводная звезда'],
    'Должностные трофеи': ['Пистоль', 'Абордажный палаш', 'Монета мертвецов'],
    'Праздничные трофеи': ['Крепкий панголин', 'Пушистая генета', 'Забавная игрунка', 'Сонная капибара', 'Болтливый попугай ара']
};
const costumeGroups = {
    'Общекомандные костюмы': {
        'Коллекционер трофеев': [], 'Одеяние зверя': [], 'Любитель сидра': [], 'Шапка-жабка': [],
        'Шапка-мухомор': [], 'Шапка-сидр': [], 'Паладин хаоса': [], 'Фаворит': ['с налапниками', 'без налапников'],
        'Вояка': [], 'Владелец диковинок': [], 'Пелагея': [], 'Мастер абордажа': [], 'Маленький матрос': [],
        'Боевой авантюрист': [], 'Шельфовый исследователь': [], 'Цветочный ансамбль': ['вариант 1', 'вариант 2', 'вариант 3'],
        'Тупик': [], 'Провинившийся': []
    },
    'Отрядные костюмы': {
        'Охотник на акул': [], 'Буревестник': [], 'Вестник морей': [], 'Образцовый чистюля': [],
        'Сверкающая жемчужина': [], 'Менестрель слова': [], 'Дары морей': ['с картой', 'без карты'],
        'Опытный чтец': [], 'Искусный травовед': ['красный цвет', 'черный цвет'], 'Пилигрим': [],
        'Рыба-Клоун': [], 'Заядлый рыболов': []
    },
    'Должностные костюмы': {
        'Костюм юнги': ['Красный', 'Зеленый', 'Синий'],
        'Костюм юнги №2': ['Красный', 'Синий', 'Коричневый'],
        'Костюм матроса': ['Красный', 'Зеленый', 'Синий', 'Фиолетовый', 'Серый'],
        'Костюм матроса №2': ['Красный', 'Зеленый', 'Синий', 'Фиолетовый', 'Серый'],
        'Костюм старшего матроса': ['Красный', 'Зеленый', 'Синий', 'Фиолетовый', 'Серый']
    },
    'Праздничные костюмы': {
        'Праздничный звездочёт': [],
        'Цветочный ансамбль': ['вариант 1', 'вариант 2', 'вариант 3']
    }
};
const titleGroups = {
    'Прилагательная должность': {
        'юнга': ['Озорной юнга', 'Дерзкий юнга'],
        'матрос': ['Умелый матрос', 'Прыткий матрос'],
        'старший матрос': ['Смекалистый старый матрос', 'Свирепый старый матрос'],
        'малыш': ['Дурашливый(ая) малыш(ка)', 'Смышлёны(ая) малыш(ка)'],
        'terms': ['на две недели', 'на месяц']
    },
    'Уникальная должность': {
        'items': ['Любимец морского дьявола', 'Гроза морей', 'Лихой корсар', 'Морской змей', 'Джентльмен удачи', 'Леди удачи'],
        'terms': ['на месяц', 'на два месяца']
    }
};
const toddlerLocs = ['Верхняя палуба', 'Капитанский мостик', 'Подвал', 'Камбуз', 'Палубная рубка', 'Пологий Берег', 'Отдаленный Пологий Берег', 'Скрытый лаз'];

// ====== СПИСОК РЕСУРСОВ ДЛЯ АКУЛ ======
const SHARK_RESOURCES = [
    'Ресурс на сон',
    'ресурс на 15 ПУ',
    'Ресурс на 20 ПУ',
    'Ресурс на 28 ПУ',
    'Ресурс на 30 ПУ',
    'Синее перо',
    'Аренда красного пера',
    'Аренда чёрного пера'
];

// ===================== БАЗОВЫЕ ХЕЛПЕРЫ =====================
const qs = (id) => document.getElementById(id);
const val = (id, fallback = '-') => {
    const el = qs(id);
    const v = el ? el.value.trim() : '';
    return v || fallback;
};

function calculateTimeDifference(timeString) {
    const times = timeString.match(/(\d{1,2})[:.](\d{2})/g);
    if (!times || times.length !== 2) {
        return { minutes: 0, formatted: "00:00", startStr: "00.00", endStr: "00.00" };
    }
    const startStr = times[0].replace(':', '.');
    const endStr = times[1].replace(':', '.');
    const [startH, startM] = startStr.split('.').map(Number);
    const [endH, endM] = endStr.split('.').map(Number);
    let startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;
    if (endTotal < startTotal) endTotal += 24 * 60;
    const diffMinutes = endTotal - startTotal;
    const h = Math.floor(diffMinutes / 60);
    const m = diffMinutes % 60;
    return {
        minutes: diffMinutes,
        formatted: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        startStr: startStr,
        endStr: endStr
    };
}
function getMoscowDate() {
    try {
        const parts = new Intl.DateTimeFormat('ru-RU', {
            timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', year: '2-digit'
        }).formatToParts(new Date());
        const map = {};
        parts.forEach(part => { if (part.type !== 'literal') map[part.type] = part.value; });
        return `${map.day}.${map.month}.${map.year}`;
    } catch (e) {
        const d = new Date();
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getFullYear()).slice(-2)}`;
    }
}
function fillValidDates() {
    const select = qs('rankDate');
    if (!select) return;
    const validDays = [0, 1, 3, 5];
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dates = [];
    let d = new Date();
    while (dates.length < 5) {
        if (validDays.includes(d.getDay())) {
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = String(d.getFullYear()).slice(-2);
            dates.push({ val: `${day}.${month}.${year}`, text: `${day}.${month}.${year} (${dayNames[d.getDay()]})` });
        }
        d.setDate(d.getDate() + 1);
    }
    select.innerHTML = '';
    dates.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.val;
        opt.textContent = d.text;
        select.append(opt);
    });
    select.selectedIndex = 0;
}
function fillSelect(select, items) {
    if (!select) return;
    select.innerHTML = '';
    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        select.append(opt);
    });
}
function makeProofs(raw) {
    if (!raw || !raw.trim()) return '[b]Доказательства:[/b] скриншот.';
    const links = raw.trim().split(/\s+/).filter(Boolean);
    let text = `[b]Доказательства:[/b] [[url=${links[0]}]скриншот[/url]]`;
    for (let i = 1; i < links.length; i++) {
        text += ` [[url=${links[i]}]скриншот${i + 1}[/url]]`;
    }
    return text + '.';
}
function setForm(formId) {
    document.querySelectorAll('.form-view').forEach(el => el.classList.add('hidden'));
    const target = qs(`form-${formId}`);
    if (target) target.classList.remove('hidden');
    document.querySelectorAll('[data-form]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.form === formId);
    });
}

// ===================== ОТРЯД КИТОВ =====================
if (qs('kitsType')) {
    qs('kitsType').onchange = () => {
        const t = qs('kitsType').value;
        qs('kitsCoinsWrap').classList.toggle('hidden', t !== 'teach_educator');
        qs('kitsTerritoryWrap').classList.toggle('hidden', t !== 'tour_educator');
        qs('kitsStaffLabel').textContent = t.includes('educator')
            ? 'Имя воспитателя'
            : 'Имя наставника';
    };
    qs('kitsType').onchange();
}
if (qs('kitsGenerate')) {
    qs('kitsGenerate').onclick = () => {
        const t = qs('kitsType').value;
        const cId = val('kitsChildId');
        const cName = val('kitsChildName');
        const sName = val('kitsStaffName');
        const sId = val('kitsStaffId');
        let text = '';
        if (t === 'teach_educator') {
            const coinsBox = qs('kitsCoins100');
            const coins = (coinsBox && coinsBox.checked) ? 100 : 0;
            text = `#Обучение_Воспитатели — ${sName} [${sId}]\n${cName} [${cId}] прошел(ла) обучение. (${coins} монеток)`;
        } else if (t === 'teach_mentor') {
            text = `#Обучение_Наставники — ${sName} [${sId}]\n${cName} [${cId}] прошел(ла) обучение.`;
        } else if (t === 'tour_educator') {
            text = `#Экскурсия_Воспитатели — ${sName} [${sId}]\n${cName} [${cId}], ${qs('kitsTerritory').value}`;
        } else if (t === 'tour_mentor') {
            text = `#Экскурсия_Наставники — ${sName} [${sId}]\n${cName} [${cId}], внелагерная территория`;
        }
        qs('kitsResult').value = text;
    };
}

const routes = {
    'main-blog':        'main',
    'awards-blog':      'nagrady',
    'activity-blog':    'activity',
    'shelter-blog':     'priyut',
    'pirate-code':      'codex',
    'squad-kits':       'kiti',
    'squad-turtles':    'cherepahi',
    'squad-sharks':     'akula',
    'squad-seagulls':   'chaiki',
    'squad-octopus':    'osminogi',
    'squad-flyingfish': 'letriba',
    'squad-albatross':  'albatros',
    'squad-dolphins':   'delfin',
    'squad-clownfish':  'clownriba',
    'squad-toddlers':   'malki',
    'sphere-guard':     'ohranka',
    'sphere-food':      'prodovolka',
    'sphere-heal':      'vrach',
    'sphere-squadron':  'escadra',
    'task-board':       'doska',
    'other-journal':    'journal',
    'other-ad':         'ad',
    'other-calc':       'word'
};

document.addEventListener("DOMContentLoaded", () => {
    const mainInputs = document.querySelectorAll('.save-id');
    const extraInputs = document.querySelectorAll('.extra-id');
    const savedUserId = localStorage.getItem('shrk_user_id');
    if (savedUserId) {
        mainInputs.forEach(input => { input.value = savedUserId; });
        extraInputs.forEach(input => { input.value = savedUserId; });
    }
    mainInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const newValue = event.target.value.trim();
            localStorage.setItem('shrk_user_id', newValue);
            mainInputs.forEach(otherInput => {
                if (otherInput !== event.target) otherInput.value = newValue;
            });
        });
    });
    extraInputs.forEach(input => { input.addEventListener('input', () => {}); });
    const nameInputs = document.querySelectorAll('.save-name');
    const savedUserName = localStorage.getItem('shrk_user_name');
    if (savedUserName) { nameInputs.forEach(input => { input.value = savedUserName; }); }
    nameInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const newValue = event.target.value.trim();
            localStorage.setItem('shrk_user_name', newValue);
            nameInputs.forEach(otherInput => {
                if (otherInput !== event.target) otherInput.value = newValue;
            });
        });
    });
    document.querySelectorAll('.save-date').forEach(input => {
        if (!input.value) input.value = getMoscowDate();
    });
});
function getHashByFormId(formId) { return routes[formId] || formId; }
function getFormIdByHash(hash) {
    for (let key in routes) { if (routes[key] === hash) return key; }
    return hash;
}
document.querySelectorAll('[data-form]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const formId = btn.dataset.form;
        setForm(formId);
        const titleEl = qs('workAreaTitle');
        if (titleEl) titleEl.textContent = btn.textContent.replace('▾', '').trim();
        window.location.hash = getHashByFormId(formId);
    });
});
function openTabFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const formId = getFormIdByHash(hash);
        const activeBtn = document.querySelector(`[data-form="${formId}"]`);
        if (activeBtn) {
            const accItem = activeBtn.closest('.acc-item');
            if (accItem) accItem.classList.add('open');
            setForm(formId);
            if (qs('workAreaTitle')) qs('workAreaTitle').textContent = activeBtn.textContent.trim();
        }
    }
}
window.addEventListener('DOMContentLoaded', openTabFromHash);
window.addEventListener('hashchange', openTabFromHash);
const mainLogoTitle = document.querySelector('.topbar h1');
if (mainLogoTitle) {
    mainLogoTitle.style.cursor = 'pointer';
    mainLogoTitle.addEventListener('click', () => {
        setForm('welcome');
        if (qs('workAreaTitle')) qs('workAreaTitle').textContent = 'Приветствие';
        document.querySelectorAll('[data-form]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.acc-item').forEach(item => item.classList.remove('open'));
        window.history.replaceState(null, null, window.location.pathname);
    });
}
document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
        const el = qs(btn.dataset.copy);
        if (el && el.value) {
            navigator.clipboard.writeText(el.value).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Скопировано!';
                setTimeout(() => { btn.textContent = originalText; }, 2000);
            }).catch(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Ошибка!';
                setTimeout(() => { btn.textContent = originalText; }, 2000);
            });
        }
    });
});
const navToggle = qs('navToggle');
const navCol = qs('navCol');
if (navToggle && navCol) {
    navToggle.addEventListener('click', () => {
        navCol.classList.toggle('mobile-open');
        navToggle.textContent = navCol.classList.contains('mobile-open') ? 'Скрыть навигацию' : 'Показать навигацию';
    });
}
document.querySelectorAll('.acc-head').forEach(btn => {
    btn.addEventListener('click', function () {
        const currentItem = this.closest('.acc-item');
        document.querySelectorAll('.acc-item').forEach(item => { if (item !== currentItem) item.classList.remove('open'); });
        currentItem.classList.toggle('open');
    });
});
fillValidDates();
fillSelect(qs('awardsDol'), positions);
fillSelect(qs('rankType'), Object.keys(rankTypes));

function setMentorSelectState(text) {
    const select = qs('rankMentor');
    if (!select) return;
    fillSelect(select, [text]);
}
async function loadMentorsFromTable() {
    const select = qs('rankMentor');
    if (!select) return;
    setMentorSelectState('Загрузка из таблицы...');
    try {
        const res = await fetch(MENTORS_API_URL, { cache: 'no-store' });
        const data = await res.json();
        const mentors = (data.mentors || [])
            .filter(m => m && m.name && m.status && m.status.toLowerCase().includes('открыт'))
            .map(m => m.name.trim());
        if (!mentors.length) { setMentorSelectState('Нет открытых наставников'); return; }
        fillSelect(select, ['-', ...mentors]);
    } catch (error) {
        setMentorSelectState('Ошибка загрузки таблицы');
    }
}
loadMentorsFromTable();

function updateRankFields() {
    const rankVal = qs('rankType').value;
    const cfg = rankTypes[rankVal];
    qs('rankMentorWrap').classList.toggle('hidden', !cfg.mentor);
    qs('rankPirateWrap').classList.toggle('hidden', !cfg.pirate);
    qs('rankFemWrap').classList.toggle('hidden', !cfg.fem);
    const speechWrap = qs('rankSpeechWrap');
    if (speechWrap) {
        speechWrap.classList.toggle('full', rankVal === 'матросы');
    }
}
if (qs('rankType')) qs('rankType').onchange = updateRankFields;
if (qs('rankGenerate')) {
    qs('rankGenerate').onclick = () => {
        const cfg = rankTypes[qs('rankType').value];
        const id = qs('rankId').value.trim() || 'ID';
        const baseNameInput = qs('rankBaseName');
        const baseName = (baseNameInput && baseNameInput.value.trim()) ? baseNameInput.value.trim() : '-';
        const nameInput = qs('rankPirateName');
        const pirateName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : '-';
        const date = qs('rankDate').value;
        const proofs = makeProofs(qs('rankProof').value);
        const speech = qs('rankSpeech').value;
        let text = `Я, [link${id}] [${id}], желаю посвятиться в [b]${cfg.label}[/b] (${date}).\n`;
        text += `${proofs}\n\n`;
        text += `[b]Имя:[/b] ${baseName}\n`;
        if (cfg.pirate) text += `[b]Пиратское имя:[/b] ${pirateName}\n`;
        if (cfg.mentor) text += `[b]Наставник:[/b] ${qs('rankMentor').value}\n`;
        if (cfg.fem) text += `[b]Феминитив:[/b] ${qs('rankFeminine').value}\n`;
        text += `\n[b]Речь:[/b] ${speech}`;
        qs('rankResult').value = text;
    };
}

function syncAwardsGroups() {
    const modeSelect = qs('awardsMode');
    const mode = modeSelect.value;
    const label = qs('awardsGroupLabel');
    const selectedText = modeSelect.options[modeSelect.selectedIndex].text.replace('Запрос ', '');
    if (label) label.textContent = 'Тип ' + selectedText;
    let groups = [];
    if (mode === 'medal') groups = Object.keys(medalGroups);
    if (mode === 'trophy') groups = Object.keys(trophyGroups);
    if (mode === 'costume') groups = Object.keys(costumeGroups);
    if (mode === 'title') groups = Object.keys(titleGroups);
    fillSelect(qs('awardsGroup'), groups);
    syncAwardsItems();
}
function syncAwardsItems() {
    const mode = qs('awardsMode').value;
    const group = qs('awardsGroup').value;
    const itemSelect = qs('awardsItem');
    const wrap = qs('variantWrap');
    const area = qs('variantInputArea');
    const itemWrap = qs('awardsItemWrap');
    const titleNote = qs('awardsTitleNote');
    if (titleNote) titleNote.classList.add('hidden');
    if (itemWrap) itemWrap.classList.toggle('full', ['medal', 'trophy', 'costume'].includes(mode));
    if (mode === 'costume') {
        const items = Object.keys(costumeGroups[group] || {});
        fillSelect(itemSelect, items);
        itemSelect.onchange = () => {
            const vars = costumeGroups[group][itemSelect.value] || [];
            if (vars.length > 0) {
                wrap.classList.remove('hidden');
                wrap.classList.add('full');
                qs('awardsVariantLabel').textContent = 'Вариант / Цвет';
                area.innerHTML = '<select id="awardsVariant"></select>';
                fillSelect(qs('awardsVariant'), vars);
            } else {
                wrap.classList.add('hidden');
            }
        };
        itemSelect.onchange();
    } else if (mode === 'title') {
        if (titleNote) titleNote.classList.remove('hidden');
        wrap.classList.remove('full');
        const userDol = qs('awardsDol').value;
        if (group === 'Прилагательная должность') {
            const items = titleGroups[group][userDol] || [];
            if (items.length === 0) {
                itemWrap.classList.add('hidden');
                wrap.classList.add('hidden');
                if (titleNote) titleNote.classList.add('hidden');
            } else {
                itemWrap.classList.remove('hidden');
                wrap.classList.remove('hidden');
                fillSelect(itemSelect, items);
                qs('awardsVariantLabel').textContent = 'Срок ношения';
                area.innerHTML = '<select id="awardsVariant"></select>';
                fillSelect(qs('awardsVariant'), titleGroups[group].terms);
            }
        } else {
            itemWrap.classList.remove('hidden');
            wrap.classList.remove('hidden');
            fillSelect(itemSelect, titleGroups[group].items);
            qs('awardsVariantLabel').textContent = 'Срок ношения';
            area.innerHTML = '<select id="awardsVariant"></select>';
            fillSelect(qs('awardsVariant'), titleGroups[group].terms);
        }
        itemSelect.onchange = null;
    } else {
        itemWrap.classList.remove('hidden');
        fillSelect(itemSelect, (mode === 'medal' ? medalGroups[group] : trophyGroups[group]) || []);
        wrap.classList.add('hidden');
        itemSelect.onchange = null;
    }
}
if (qs('awardsMode')) qs('awardsMode').onchange = syncAwardsGroups;
if (qs('awardsGroup')) qs('awardsGroup').onchange = syncAwardsItems;
if (qs('awardsDol')) qs('awardsDol').onchange = () => { if (qs('awardsMode').value === 'title') syncAwardsItems(); };
syncAwardsGroups();
if (qs('awardsGenerate')) {
    qs('awardsGenerate').onclick = () => {
        const mode = qs('awardsMode').value;
        const id = qs('awardsId').value.trim() || 'ID';
        const dol = qs('awardsDol').value;
        const item = qs('awardsItem').value;
        const proofs = makeProofs(qs('awardsProofs').value);
        const varEl = qs('awardsVariant');
        const extra = varEl ? varEl.value : '-';
        let text = "";
        if (mode === 'medal') text = `[b]Запрос медали[/b]\nЯ, [cat${id}] [${id}], ${dol} шайки, выполнил(а) требования на медаль «${item}».\n${proofs}`;
        if (mode === 'trophy') text = `[b]Запрос трофея[/b]\nЯ, [cat${id}] [${id}], ${dol} шайки, выполнил(а) требования на трофей «${item}».\n${proofs}`;
        if (mode === 'costume') text = `[b]Запрос костюма[/b]\nЯ, [cat${id}] [${id}], ${dol} шайки, выполнил(а) требования на костюм «${item}».\n[b]Вариант/цвет:[/b] ${extra}.\n${proofs}`;
        if (mode === 'title') text = `[b]Запрос должности[/b]\nЯ, [cat${id}] [${id}], ${dol} шайки, выполнил(а) требования на должность «${item}».\n[b]Срок ношения:[/b] ${extra}.\n${proofs}`;
        qs('awardsResult').value = text;
    };
}

if (qs('eskDate')) qs('eskDate').value = getMoscowDate();
if (qs('eskGenerate')) {
    qs('eskGenerate').onclick = () => {
        const type = qs('eskType').value;
        const time = qs('eskTime').value.trim() || 'чч:мм - чч:мм';
        const id = qs('eskId').value.trim() || 'ID';
        const isLead = qs('eskIsLead').checked;
        const date = qs('eskDate').value.trim() || getMoscowDate();
        const duration = calculateTimeDifference(time).formatted;
        const leadSuffix = isLead ? ', ведущий' : '';
        const text = `[b]${type}[/b]\n[b]${date}[/b]; ${time} (${duration})\n[b]Участник[/b]: [link${
