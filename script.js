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
        const sId = val('kitsStaffId'); // <-- Получаем ID наставника/воспитателя из поля
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
        const text = `[b]${type}[/b]\n[b]${date}[/b]; ${time} (${duration})\n[b]Участник[/b]: [link${id}] [${id}]${leadSuffix}`;
        qs('eskResult').value = text;
    };
}
const eskTypeSelect = qs('eskType');
const eskLeadCheckbox = qs('eskIsLead');
if (eskTypeSelect && eskLeadCheckbox) {
    const leadWrapper = eskLeadCheckbox.parentElement;
    function toggleLeadCheckbox() {
        if (eskTypeSelect.value === 'Свободный бег') {
            leadWrapper.style.display = 'none';
            eskLeadCheckbox.checked = false;
        } else {
            leadWrapper.style.display = 'flex';
        }
    }
    eskTypeSelect.addEventListener('change', toggleLeadCheckbox);
    toggleLeadCheckbox();
}

if (qs('octoDate')) qs('octoDate').value = getMoscowDate();
// ===================== ОТРЯД ОСЬМИНОГОВ (НАВИГАТОРЫ) =====================
function updateOctoForm() {
    const type = qs('octoType').value;
    const isTrip = type === 'trip';

    // Показываем блоки полей
    document.querySelectorAll('.octo-sub-trip').forEach(el =>
        el.classList.toggle('hidden', !isTrip));
    document.querySelectorAll('.octo-sub-clean').forEach(el =>
        el.classList.toggle('hidden', isTrip));

    // Доказательства только в блог-вариантах чистки/сортировки
    const isBlogClean = type.endsWith('_blog');
    document.querySelectorAll('.octo-sub-blog').forEach(el =>
        el.classList.toggle('hidden', !isBlogClean));
}
if (qs('octoType')) {
    qs('octoType').onchange = updateOctoForm;
    updateOctoForm();
}
if (qs('octoDate'))  qs('octoDate').value  = getMoscowDate();
if (qs('octoDate2')) qs('octoDate2').value = getMoscowDate();

if (qs('octoGenerate')) {
    qs('octoGenerate').onclick = () => {
        const type = qs('octoType').value;
        let result = '';

        // ---------- МОРСКАЯ ВЫЛАЗКА ----------
        if (type === 'trip') {
            const date = qs('octoDate').value.trim() || 'дд.мм.гг';
            const navId = qs('octoNavId').value.trim() || 'ID';
            const rawParts = qs('octoPartIds').value.trim();
            const partsArr = rawParts.split(/[\s,]+/).filter(Boolean);
            const partsStr = partsArr.length > 0
                ? partsArr.map(id => `[link${id}] [${id}]`).join(', ')
                : '[linkID] [ID]';
            const proofsRaw = qs('octoProofs').value.trim();
            const proofsText = proofsRaw === ''
                ? '\nСкриншоты были отправлены в беседу навигаторов.'
                : makeProofs(proofsRaw);
            result = `[b]Дата проведения: ${date}[/b]\n[b]Навигатор:[/b] [link${navId}] [${navId}].\n[b]Участники:[/b] ${partsStr}.${proofsText}`;
        }

        // ---------- ЧИСТКА / СОРТИРОВКА ----------
        else {
            const isSort = type.startsWith('sort');
            const isVk = type.endsWith('_vk');
            const isLager = type.startsWith('clean_lager');
            const isOfflager = type.startsWith('clean_offlager');

            const date = qs('octoDate2').value.trim() || getMoscowDate();
            const myId = qs('octoMyId').value.trim() || 'ID';
            const count = qs('octoCatCount').value.trim() || '0';
            const proof = qs('octoProof').value.trim();

            let title = '';
            if (isSort) title = 'Сортировка';
            else if (isLager) title = 'Чистка лагеря';
            else if (isOfflager) title = 'Чистка внелагеря';

            const actionWord = isSort ? 'отсортированных' : 'убранных';

            if (isVk) {
                result =
`#отчет
${title}, ${date}
Осьминог: ${myId}
Количество ${actionWord} котов: ${count}`;
            } else {
                const proofBlock = proof ? `\n[url=${proof}]скриншот истории[/url]` : '';
                result =
`[b]${title}[/b], ${date}
[b]Осьминог:[/b] ${myId}
[b]Количество ${actionWord} котов:[/b] ${count}${proofBlock}`;
            }
        }

        qs('octoResult').value = result;
    };
}
const guardLocs = ['Дыра в корабле', 'Извилистая тропа', 'Искажённая чаща', 'Тихий залив', 'Лазурная бухта', 'Отдалённая лазурная бухта'];
const guardRoutes = ['А', 'Б', 'В'];
function updateGuardForm() {
    const mode = qs('guardMode').value;
    document.querySelectorAll('[class*="guard-sub-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll(`.guard-sub-${mode}`).forEach(el => el.classList.remove('hidden'));
    if (mode === 'patrol') setAutoPatrolTime();
    else if (mode === 'watch') updateWatchOptions();
    else if (mode === 'check') qs('checkTime').value = '';
}
function updateWatchOptions() {
    const isPassive = qs('watchSubMode').value === 'passive';
    fillSelect(qs('watchLoc'), isPassive ? guardLocs : guardRoutes);
}
function setAutoPatrolTime() {
    const times = ["03:00", "07:00", "11:00", "15:00", "20:00", "23:00"];
    const now = new Date();
    const moscow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
    const cur = `${String(moscow.getHours()).padStart(2, '0')}:${String(moscow.getMinutes()).padStart(2, '0')}`;
    let selected = times[0];
    for (let t of times) { if (cur >= t) selected = t; }
    if (qs('patrolTime')) qs('patrolTime').value = selected;
}
if (qs('guardGenerate')) {
    qs('guardGenerate').onclick = () => {
        const mode = qs('guardMode').value;
        const date = getMoscowDate();
        let result = "";
        if (mode === 'patrol') {
            const leads = qs('patrolLeads').value.trim().split(/\s+/).filter(Boolean);
            const collId = qs('patrolCollector').value || 'ID';
            const leadStr = leads.length >= 2
                ? `[link${leads[0]}] [${leads[0]}] (А), [link${leads[1]}] [${leads[1]}] (Б)`
                : `[link${leads[0] || collId}] [${leads[0] || collId}] (Общий)`;
            const parts = qs('patrolParts').value.trim().split(/\s+/).filter(Boolean).map(id => `[link${id}] [${id}]`).join(', ');
            result = `[b]Отчёт о пограничном патруле.[/b]\n[b]${date}[/b]\nВремя сбора: ${qs('patrolTime').value}\nСобирающий: [link${collId}] [${collId}]\nВедущий: ${leadStr}\nУчастники: ${parts || '[linkID] [ID]'}`;
        }
        else if (mode === 'watch') {
            const timeRange = qs('watchTimeRange').value || '00:00 - 00:00';
            const isPassive = qs('watchSubMode').value === 'passive';
            const wId = qs('watchId').value || 'ID';
            const duration = calculateTimeDifference(timeRange).formatted;
            result = `[b]Отчёт о ${isPassive ? 'пассивном' : 'активном'} дозоре.[/b]\n[b]${date}[/b]\nЧасы дозора: ${timeRange} (${duration})\nДозорный: [link${wId}] [${wId}]\n${isPassive ? 'Локация' : 'Маршрут'}: ${qs('watchLoc').value}`;
        }
        else if (mode === 'check') {
            const myId = qs('checkMyId').value || 'ID';
            const targetId = qs('checkTargetId').value || 'ID';
            const checkTime = qs('checkTime').value || 'чч:мм';
            result = `Я, [link${myId}] [${myId}], проверил дозорного [link${targetId}] [${targetId}] в ${checkTime}; проверка ${qs('checkStatus').value}.`;
        }
        qs('guardResult').value = result;
    };
}
if (qs('guardMode')) qs('guardMode').onchange = updateGuardForm;
if (qs('watchSubMode')) qs('watchSubMode').onchange = updateWatchOptions;
if (qs('guardMode')) updateGuardForm();

// ===================== ПРОДОВОЛЬСТВЕННАЯ СФЕРА =====================
function updateFoodForm() {
    const type = qs('foodType').value;
    document.querySelectorAll('.food-sub-hunt_patrol').forEach(el =>
        el.classList.toggle('hidden', type !== 'hunt_patrol'));
    document.querySelectorAll('.food-sub-solo_hunt').forEach(el =>
        el.classList.toggle('hidden', type !== 'solo_hunt'));
    document.querySelectorAll('.food-sub-galley').forEach(el =>
        el.classList.toggle('hidden', type !== 'galley'));
}

// Пересобрать поля улова для каждого участника
function rebuildFoodPatrolCatchFields() {
    const wrap = qs('foodPatrolCatchWrap');
    if (!wrap) return;

    // Запоминаем уже введённые значения, чтобы не терять их при пересборке
    const saved = {};
    wrap.querySelectorAll('input[data-catch-id]').forEach(inp => {
        const id = inp.dataset.catchId;
        const kind = inp.dataset.catchKind;
        if (!saved[id]) saved[id] = {};
        saved[id][kind] = inp.value;
    });

    const ids = qs('foodPatrolParts').value.trim().split(/\s+/).filter(Boolean);
    wrap.innerHTML = '';

    if (ids.length === 0) return;

    ids.forEach(id => {
        const block = document.createElement('div');
        block.style.display = 'grid';
        block.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))'; // три равных колонки
        block.style.gap = '6px 8px';
        block.style.marginTop = '6px';
        block.style.padding = '6px 8px';
        block.style.border = '1px dashed rgba(0,0,0,0.15)';
        block.style.borderRadius = '4px';

        const title = document.createElement('div');
        title.style.gridColumn = '1 / -1';      // растянуть на все 3 колонки
        title.style.fontSize = '10px';
        title.style.fontWeight = 'bold';
        title.style.opacity = '0.75';
        title.style.marginBottom = '2px';
        title.textContent = `Улов участника [${id}]`;
        block.appendChild(title);

['хилых', 'обычных', 'упитанных'].forEach(kind => {
    const cell = document.createElement('div');
    const lbl = document.createElement('label');
    lbl.textContent = kind;
    const inp = document.createElement('input');
    inp.type = 'number';
    inp.min = '0';
    inp.placeholder = '0';
    inp.dataset.catchId = id;
    inp.dataset.catchKind = kind;
    if (saved[id] && saved[id][kind] !== undefined) {
        inp.value = saved[id][kind];
    }
    cell.appendChild(lbl);
    cell.appendChild(inp);
    block.appendChild(cell);
});

        wrap.appendChild(block);
    });
}

// Привязка обработчиков
if (qs('foodType')) {
    qs('foodType').onchange = updateFoodForm;
    updateFoodForm();
}
if (qs('foodPatrolParts')) {
    qs('foodPatrolParts').addEventListener('input', rebuildFoodPatrolCatchFields);
}

// Генерация отчёта
if (qs('foodGenerate')) {
    qs('foodGenerate').onclick = () => {
        const type = qs('foodType').value;
        const date = getMoscowDate();
        let result = '';

        const fmtIds = (raw) => {
            if (!raw || !raw.trim()) return '[linkID] [ID]';
            return raw.trim().split(/\s+/).filter(Boolean)
                .map(id => `[link${id}] [${id}]`).join(', ');
        };

        if (type === 'hunt_patrol') {
            const collector = qs('foodPatrolCollector').value.trim() || 'ID';
            const lead = qs('foodPatrolLead').value.trim() || 'ID';
            const helpers = fmtIds(qs('foodPatrolHelpers').value);

            // Собираем улов по каждому участнику
            const ids = qs('foodPatrolParts').value.trim().split(/\s+/).filter(Boolean);
            const catchMap = {};
            qs('foodPatrolCatchWrap').querySelectorAll('input[data-catch-id]').forEach(inp => {
                const id = inp.dataset.catchId;
                const kind = inp.dataset.catchKind;
                if (!catchMap[id]) catchMap[id] = { 'хилых': 0, 'обычных': 0, 'упитанных': 0 };
                catchMap[id][kind] = Number(inp.value) || 0;
            });

const partsStr = ids.length === 0
    ? '[linkID] [ID] (0/0/0)'
    : ids.map(id => {
        const c = catchMap[id] || { 'хилых': 0, 'обычных': 0, 'упитанных': 0 };
        return `[link${id}] [${id}] (${c['хилых']}/${c['обычных']}/${c['упитанных']})`;
    }).join(', ');

            result =
`[b]${date}[/b]
[b]Охотничий патруль.[/b]
Время сбора: ${qs('foodPatrolTime').value}
Собирающий: [link${collector}] [${collector}]
Ведущий: [link${lead}] [${lead}]
Участники: ${partsStr}
Помощники: ${helpers}`;
        } else if (type === 'solo_hunt') {
            const id = qs('foodSoloId').value.trim() || 'ID';
let catchStr = qs('foodSoloCatch').value.trim() || '0 0 0';
// Если введены три числа через пробел — заменяем на слэши
const nums = catchStr.split(/\s+/).filter(Boolean);
if (nums.length === 3 && nums.every(n => !isNaN(n))) {
    catchStr = nums.join('/');
}
            const proof = qs('foodSoloProof').value.trim() || '-';
            result =
`[b]${date}[/b]
[b]Одиночная охота.[/b]
[link${id}] [${id}] (${catchStr})
[ [url=${proof}]скриншот пойманной дичи[/url] ]`;
        } else if (type === 'galley') {
            const id = qs('foodGalleyId').value.trim() || 'ID';
            const count = qs('foodGalleyCount').value.trim() || '0';
            const proof = qs('foodGalleyProof').value.trim() || '-';
            result =
`[b]${date}[/b]
[b]Чистка Камбуза.[/b]
[link${id}] [${id}]
Кол-во уничтоженной падали: ${count}.
[ [url=${proof}]скриншот истории[/url] ]`;
        }

        qs('foodResult').value = result;
    };
}

// ===================== ОТРЯД АКУЛ =====================
function updateSharkForm() {
    const t = qs('sharkType').value;
    ['pear', 'butterfly', 'pear_change', 'pear_add', 'resources'].forEach(key => {
        document.querySelectorAll(`.shark-sub-${key}`).forEach(el =>
            el.classList.toggle('hidden', t !== key));
    });
}
if (qs('sharkType')) {
    qs('sharkType').onchange = updateSharkForm;
    updateSharkForm();
}

if (qs('sharkGenerate')) {
    qs('sharkGenerate').onclick = () => {
        const t = qs('sharkType').value;
        const date = getMoscowDate();
        let result = '';

        const fmtIds = (raw) => {
            if (!raw || !raw.trim()) return '[linkID] [ID]';
            return raw.trim().split(/\s+/).filter(Boolean)
                .map(id => `[link${id}] [${id}]`).join(', ');
        };

        if (t === 'pear') {
            const rank = qs('sharkPearRank').value;
            const id = qs('sharkPearId').value.trim() || 'ID';
            const dateVal = qs('sharkPearDate').value.trim() || date;
            const timeRange = qs('sharkPearTime').value.trim() || 'чч:мм - чч:мм';
            const dur = calculateTimeDifference(timeRange).formatted;
            const age = qs('sharkPearAge').value;
            result =
`[b]Грушевание[/b]
${dateVal}, ${timeRange} (${dur})
[${rank}] [link${id}] [${id}] (${age})`;
        } else if (t === 'butterfly') {
            const dateVal = qs('sharkBfDate').value.trim() || date;
            const timeRange = qs('sharkBfTime').value.trim() || 'чч:мм - чч:мм';
            const units = qs('sharkBfUnits').value.trim() || '0';
            const actId = qs('sharkBfActivatorId').value.trim() || 'ID';
            const actAge = qs('sharkBfActivatorAge').value;
            const parts = fmtIds(qs('sharkBfPartIds').value);
            const proofBefore = qs('sharkBfProofBefore').value.trim() || '-';
            const proofAfter = qs('sharkBfProofAfter').value.trim() || '-';
            result =
`[b]Активация бабочки[/b]
${dateVal}, ${timeRange} (${units} единиц)
[Активатор] [link${actId}] [${actId}] (${actAge})
[Участники] ${parts}
[Доказательства] скриншоты до/после (содержащие и поле игровой, и БУ участника(ов) одновременно): [url=${proofBefore}]до[/url], [url=${proofAfter}]после[/url]`;
              } else if (t === 'pear_change') {
        const rank = qs('sharkChangeRank').value;
        const fromName = qs('sharkChangeFromName').value.trim() || 'ИМЯ';
        const fromId = qs('sharkChangeFromId').value.trim() || 'ID';
        const toName = qs('sharkChangeToName').value.trim() || 'ИМЯ';
        const toId = qs('sharkChangeToId').value.trim() || 'ID';
        const time = qs('sharkChangeTime').value.trim() || 'чч:мм';
        const buFrom = (qs('sharkChangeFromBu')?.value || '').trim();
        const buPart = buFrom !== '' ? ` (${buFrom})` : '';
        result =
`Смена ${rank}
${fromName} [${fromId}]${buPart}, сменил ${toName} [${toId}] в ${time}`;
              } else if (t === 'pear_add') {
        const rank = qs('sharkAddRank').value;
        const name = qs('sharkAddName').value.trim() || 'ИМЯ';
        const id = qs('sharkAddId').value.trim() || 'ID';
        const buEl = qs('sharkAddBu');
        const bu = buEl ? buEl.value.trim() : '';
        const buPart = bu !== '' ? ` (${bu})` : '';
        result = `+${rank}, ${name} [${id}]${buPart}`;
        } else if (t === 'resources') {
            const id = qs('sharkResId').value.trim() || 'ID';
            const proof = qs('sharkResProof').value.trim() || '-';
            const rows = qs('sharkResList').querySelectorAll('.shark-res-row');
            const parts = [];
            rows.forEach(row => {
                const name = row.querySelector('.shark-res-name').value;
                const count = row.querySelector('.shark-res-count').value.trim() || '0';
                if (name) parts.push(`${name} в количестве [b]${count}[/b] штук`);
            });
            const listStr = parts.length > 0
                ? parts.join(', ')
                : 'название ресурса в количестве [b]0[/b] штук';
            result =
`[hr][b]Запрос ресурсов[/b]
Я, [link${id}] [${id}], хочу запросить ${listStr}.
[url=${proof}]Доказательства[/url][hr]`;
        }

        // ===================== ЗАПРОС РЕСУРСОВ У АКУЛ =====================
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

function addSharkResourceRow() {
    const list = qs('sharkResList');
    if (!list) return;

    const row = document.createElement('div');
    row.className = 'shark-res-row';
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '1fr 90px 32px';
    row.style.gap = '6px';
    row.style.alignItems = 'center';

    const sel = document.createElement('select');
    sel.className = 'shark-res-name';
    SHARK_RESOURCES.forEach(r => {
        const o = document.createElement('option');
        o.value = r;
        o.textContent = r;
        sel.appendChild(o);
    });

    const inp = document.createElement('input');
    inp.type = 'number';
    inp.min = '0';
    inp.placeholder = '1';
    inp.className = 'shark-res-count';
    inp.style.height = '30px';
    inp.style.padding = '2px 6px';
    inp.style.fontSize = '12px';
    inp.style.boxSizing = 'border-box';

    const del = document.createElement('button');
    del.type = 'button';
    del.textContent = '×';
    del.title = 'Удалить';
    del.style.height = '30px';
    del.style.padding = '0';
    del.style.cursor = 'pointer';
    del.style.fontSize = '16px';
    del.style.lineHeight = '1';
    del.addEventListener('click', () => {
        row.remove();
        // Не даём удалить последнюю строку
        if (qs('sharkResList').children.length === 0) addSharkResourceRow();
    });

    row.appendChild(sel);
    row.appendChild(inp);
    row.appendChild(del);
    list.appendChild(row);
}

if (qs('sharkResAdd')) {
    qs('sharkResAdd').addEventListener('click', addSharkResourceRow);
}
// Стартовая одна строка, когда форма впервые открыта
if (qs('sharkResList') && qs('sharkResList').children.length === 0) {
    addSharkResourceRow();
}

// --- Отряд Альбатросов ---
if (qs('albCategory')) qs('albCategory').onchange = () => {
  const c = qs('albCategory').value;
  qs('albCongratWrap').classList.toggle('hidden', c !== 'congrat_report');
  qs('albAnketaBlogWrap').classList.toggle('hidden', c !== 'anketa_blog');
  qs('albAnketaNoBlogWrap').classList.toggle('hidden', c !== 'anketa_noblog');
  qs('albEditWrap').classList.toggle('hidden', c !== 'edit_prefs');
  qs('albVkBookingWrap').classList.toggle('hidden', c !== 'vk_booking');
  qs('albVkDoneWrap').classList.toggle('hidden', c !== 'vk_done');
};
if (qs('albBookRole')) qs('albBookRole').onchange = () => {
  const r = qs('albBookRole').value;
  qs('albBookPartnerWrap').classList.toggle('hidden', !r.startsWith('коллаб'));
  qs('albBookCollageCountWrap').classList.toggle('hidden', r !== 'коллаж');
};
if (qs('albDoneRole')) qs('albDoneRole').onchange = () => {
  const r = qs('albDoneRole').value;
  qs('albDonePartner2Wrap').classList.toggle('hidden', !r.startsWith('коллаб'));
  qs('albDoneCountWrap').classList.toggle('hidden', r !== 'сборщик');
  qs('albDoneContentWrap').classList.toggle('hidden', !['художник', 'поздравитель', 'коллаб_художники'].includes(r));
};
if (qs('albGenerate')) qs('albGenerate').onclick = () => {
  const c = qs('albCategory').value;
  let res = '';

  const formatIdsAlb = (raw) => {
      if (!raw || !raw.trim() || raw.trim() === '-') return '-';
      return raw.trim().split(/[\s,]+/).filter(Boolean).map(id => `[link${id}] [${id}]`).join(', ');
  };
  const valAlb = (id) => {
      const el = qs(id);
      return (el && el.value.trim()) ? el.value.trim() : '-';
  };

  if (c === 'congrat_report') {
    const tId = valAlb('albCongratTargetId');
    const link = qs('albCongratLink').value.trim() || 'ссылка на поздравительный блог';
    const count = qs('albCollectorCount').value.trim() || 'кол-во собранных поздравлений/кол-во опрошенных людей';
    
    res = `[b][center]Отчёт о [url=${link}]поздравительном блоге[/url] для [link${tId}].[/center][/b]
[b]Оформитель:[/b] ${formatIdsAlb(valAlb('albDesigner'))};
[b]Создали коллажи:[/b] ${formatIdsAlb(qs('albCollageMakers').value)};
[b]Поздравитель:[/b] ${formatIdsAlb(valAlb('albCongratulator'))};
[b]Писатели стихов:[/b] ${formatIdsAlb(qs('albPoets').value)};
[b]Писал сообщение:[/b] ${formatIdsAlb(qs('albMessageWriter')?.value)};
[b]Сборщик:[/b] ${formatIdsAlb(valAlb('albCollectorId'))} (${count});
[b]Нарисовал шапку:[/b] ${formatIdsAlb(valAlb('albHeader'))};
[b]Красил клон:[/b] ${formatIdsAlb(valAlb('albClonePainter'))};
[b]Художники:[/b] ${formatIdsAlb(qs('albArtists').value)}.`;

  } else if (c === 'anketa_blog') {
    const id = valAlb('albBirthId');
    res = `[b]День рождения[/b]
Я, [link${id}] [${id}], прошу внести меня в таблицу именинников и сделать поздравительный блог.
[b]Дата рождения:[/b] ${qs('albBirthDate').value.trim() || 'дд.мм.'}

[b]1. Предпочтения:[/b]
${qs('albPrefs').value.trim() || '-'}
[b]2. Информация об основном персонаже:[/b]
${qs('albMainChar').value.trim() || '-'}
[b]3. Информация о дополнительных персонажах:[/b]
${qs('albExtraChars').value.trim() || '-'}
[b]4. Ваши друзья:[/b]
${qs('albFriends').value.trim() || '-'}
[b]5. Как вас представлять друзьям:[/b]
${qs('albHowIntroduce').value.trim() || '-'}`;

  } else if (c === 'anketa_noblog') {
    const id = valAlb('albNoBlogId');
    res = `[b]День рождения[/b]
Я, [link${id}] [${id}], прошу внести меня в таблицу именинников. Поздравительный блог не делать.
[b]Дата рождения:[/b] ${qs('albNoBlogDate').value.trim() || 'дд.мм.'}`;

  } else if (c === 'edit_prefs') {
    const id = valAlb('albEditId');
    const sec = qs('albEditSection').value.trim() || 'название раздела';
    res = `Я, [link${id}] [${id}], желаю отредактировать информацию в разделе ${sec}. [b]Новый текст:[/b]
${qs('albEditText').value.trim() || '-'}`;

  } else if (c === 'vk_booking') {
    const r = qs('albBookRole').value;
    const name = valAlb('albBookName');
    const id = valAlb('albBookId');
    const tName = valAlb('albBookTargetName');
    const tId = valAlb('albBookTargetId');
    if (r.startsWith('коллаб')) {
      const pName = valAlb('albBookPartnerName');
      const pId = valAlb('albBookPartnerId');
      const action = r === 'коллаб_рисунок' ? 'рисунок' : 'оформление';
      res = `#бронирование — коллаб ${name} [${id}] и ${pName} [${pId}]\nБерёмся за ${action} для игрока ${tName} [${tId}].`;
    } else {
      const rMap = { оформление: 'оформление', рисунок: 'рисунок', клон: 'клон', шапка: 'шапку', декорация: 'декорацию', 'сбор поздравлений': 'сбор поздравлений', поздравление: 'поздравление', стих: 'стих' };
      let action = rMap[r] || r;
      if (r === 'коллаж') action = `коллаж (${qs('albBookCollageCount').value || 1})`;
      res = `#бронирование — ${name} [${id}]\nБерусь за ${action} для игрока ${tName} [${tId}].`;
    }
  } else if (c === 'vk_done') {
    const r = qs('albDoneRole').value;
    const name = valAlb('albDoneName');
    const id = valAlb('albDoneId');
    
    // Тут мы теперь собираем имя и ID раздельно
    const tName = valAlb('albDoneTargetName');
    const tId = valAlb('albDoneTargetId');
    const target = `${tName} [${tId}]`;

    if (r.startsWith('коллаб')) {
      const p2 = qs('albDonePartner2').value.trim() || '-';
      const ending = r === 'коллаб_художники' ? '(рисунок, прикреплённый ВК документом)' : 'Код в личных сообщениях главы.';
      res = `#итог — выполнили работу для игрока ${target}.\n${name} [${id}] сделал 1-4 стадии работы; ${p2}.\n${ending}`;
    } else {
      let ending = '';
      if (r === 'оформитель') ending = 'Код в личных сообщениях главы.';
      else if (r === 'сборщик') ending = `Опросил ${qs('albDoneCount').value || 0} игроков.`;
      else if (r === 'художник') ending = `(рисунок, прикреплённый ВК документом)\n${qs('albDoneContent').value.trim() || '-'}`;
      else ending = qs('albDoneContent').value.trim() || '-';
      res = `#итог — ${name} [${id}] выполнил работу для игрока ${target}.\n${ending}`.trim();
    }
  }
  qs('albResult').value = res;
};

function updateDolphinForm() {
    const reportType = qs('dolphinReportType');
    if (!reportType) return;
    const type = reportType.value;
    const timeWrap = qs('dolphinTimeWrap');
    const diveWrap = qs('dolphinDiveWrap');
    const proofWrap = qs('dolphinProofWrap');
    const targetLabel = qs('dolphinTargetLabel');
    const dateWrap = qs('dolphinDateWrap');
    const myIdWrap = qs('dolphinMyIdWrap');
    const vkActivityWrap = qs('dolphinVkActivityWrap');
    const adultHint = qs('dolphinAdultHint');

    const hideDate = (type === 'vk');
    if (dateWrap) dateWrap.classList.toggle('hidden', hideDate);
    if (myIdWrap) myIdWrap.classList.toggle('full', hideDate);

    if (vkActivityWrap) vkActivityWrap.classList.toggle('hidden', type !== 'vk');
    if (timeWrap) timeWrap.classList.toggle('hidden', type === 'teach' || type === 'vk' || type === 'dive');
    if (diveWrap) diveWrap.classList.toggle('hidden', type !== 'dive');
    if (proofWrap) proofWrap.classList.toggle('hidden', type !== 'teach');
    if (adultHint) adultHint.classList.toggle('hidden', type !== 'dive');
    if (targetLabel) targetLabel.textContent = type === 'teach' ? 'ID игрока' : 'ID сопровождаемых (через пробел)';
}
const dolphinReportEl = qs('dolphinReportType');
if (dolphinReportEl) dolphinReportEl.addEventListener('change', updateDolphinForm);
const dolphinDateInput = qs('dolphinDate');
if (dolphinDateInput) dolphinDateInput.value = getMoscowDate();
const dolphinBtn = qs('dolphinGenerate');
if (dolphinBtn) {
    dolphinBtn.onclick = () => {
        const type = qs('dolphinReportType').value;
        const date = qs('dolphinDate').value.trim() || getMoscowDate();
        const myId = qs('dolphinMyId').value.trim() || 'ID';
        const rawIds = qs('dolphinTargetIds').value.trim().split(/\s+/).filter(Boolean);
        const targetsStr = rawIds.map(idStr => {
            if (idStr.includes('+')) {
                const cleanId = idStr.replace('+', '');
                return `[link${cleanId}] [${cleanId}] (взрослый)`;
            } else {
                return `[link${idStr}] [${idStr}]`;
            }
        }).join(', ') || '[linkID] [ID]';
        let resultText = '';
        if (type === 'vk') {
            const activity = qs('dolphinVkActivityType').value;
            const plainIds = rawIds.map(id => id.replace('+', '')).join(', ') || 'ID';
            let vkTag = '', vkAction = '';
            if (activity === 'climb') { vkTag = '#лазание'; vkAction = 'лазать.'; }
            else if (activity === 'vision') { vkTag = '#зоркость'; vkAction = 'прокачивать зоркость.'; }
            else if (activity === 'dive') { vkTag = '#ныряние'; vkAction = 'нырять.'; }
            resultText = `${vkTag}\n${myId}, веду ${plainIds} ${vkAction}`;
        } else if (type === 'climb' || type === 'vision') {
            const title = type === 'climb' ? 'Сопровождение на лазательные локации' : 'Прокачивание зоркости';
            const timeRange = qs('dolphinTimeRange').value.trim() || 'чч:мм - чч:мм';
            const dur = calculateTimeDifference(timeRange).formatted;
            resultText = `[b]${date}[/b]\n[b]${title}[/b]\n[b]Время:[/b] ${timeRange} (${dur})\n[b]Дельфин:[/b] [link${myId}] [${myId}]\n[b]Сопровождаемые:[/b] ${targetsStr}`;
        } else if (type === 'dive') {
            const timeRange = qs('dolphinTimeRange').value.trim() || 'чч:мм - чч:мм';
            const dives = qs('dolphinDives').value.trim() || '1';
            resultText = `[b]${date}[/b]\n[b]Сопровождение на плавательные локации[/b]\n[b]Время:[/b] ${timeRange} (${dives} заходов)\n[b]Дельфин:[/b] [link${myId}] [${myId}]\n[b]Сопровождаемые:[/b] ${targetsStr}`;
        } else if (type === 'teach') {
            const proofText = makeProofs(qs('dolphinProof').value);
            const playerId = rawIds[0] ? rawIds[0].replace('+', '') : 'ID';
            resultText = `[b]${date}[/b]\n[b]Обучение игрока лазанию[/b]\n[b]Дельфин:[/b] [link${myId}] [${myId}]\n[b]Игрок:[/b] [link${playerId}] [${playerId}]\n${proofText}`;
        }
        qs('dolphinResult').value = resultText;
    };
}
if (dolphinReportEl) updateDolphinForm();

function updateToddlers() {
    const t = qs('tdlType') ? qs('tdlType').value : null;
    if (!t) return;
    if (qs('tdlPatrolTimeWrap')) qs('tdlPatrolTimeWrap').classList.toggle('hidden', t !== 'patrol');
    if (qs('tdlCollectorWrap')) qs('tdlCollectorWrap').classList.toggle('hidden', t !== 'patrol');
    if (qs('tdlLeadsWrap')) qs('tdlLeadsWrap').classList.toggle('hidden', t !== 'patrol');
    if (qs('tdlPartsWrap')) qs('tdlPartsWrap').classList.toggle('hidden', t !== 'patrol');
    if (qs('tdlWatchModeWrap')) qs('tdlWatchModeWrap').classList.toggle('hidden', !t.startsWith('watch'));
    if (qs('tdlWatchIdWrap')) qs('tdlWatchIdWrap').classList.toggle('hidden', !t.startsWith('watch'));
    if (qs('tdlRouteWrap')) qs('tdlRouteWrap').classList.toggle('hidden', !t.startsWith('watch'));
    if (qs('tdlLocWrap')) qs('tdlLocWrap').classList.toggle('hidden', !t.startsWith('watch') || (qs('tdlRoute') && qs('tdlRoute').value !== 'loc'));
    if (qs('tdlTimeRangeWrap')) qs('tdlTimeRangeWrap').classList.toggle('hidden', t !== 'watch_end');
    if (qs('tdlHunterWrap')) qs('tdlHunterWrap').classList.toggle('hidden', t !== 'hunt');
    if (qs('tdlCatchWrap')) qs('tdlCatchWrap').classList.toggle('hidden', t !== 'hunt');
    if (qs('tdlProofBeforeWrap')) qs('tdlProofBeforeWrap').classList.toggle('hidden', t !== 'hunt');
    if (qs('tdlProofAfterWrap')) qs('tdlProofAfterWrap').classList.toggle('hidden', t !== 'hunt');
    if (qs('tdlProofHelpWrap')) qs('tdlProofHelpWrap').classList.toggle('hidden', t !== 'hunt');
    if (qs('tdlCheckMyIdWrap')) qs('tdlCheckMyIdWrap').classList.toggle('hidden', t !== 'check');
    if (qs('tdlCheckTargetIdWrap')) qs('tdlCheckTargetIdWrap').classList.toggle('hidden', t !== 'check');
    if (qs('tdlCheckTimeWrap')) qs('tdlCheckTimeWrap').classList.toggle('hidden', t !== 'check');
    if (qs('tdlCheckStatusWrap')) qs('tdlCheckStatusWrap').classList.toggle('hidden', t !== 'check');
    if (t === 'patrol' && qs('tdlPatrolTime')) {
        const times = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
        fillSelect(qs('tdlPatrolTime'), times);
    }
}
if (qs('tdlType')) {
    qs('tdlType').onchange = updateToddlers;
    fillSelect(qs('tdlLoc'), toddlerLocs);
    updateToddlers();
}
if (qs('tdlRoute')) {
    qs('tdlRoute').onchange = () => {
        if (qs('tdlLocWrap')) qs('tdlLocWrap').classList.toggle('hidden', qs('tdlRoute').value !== 'loc');
    };
}
if (qs('tdlGenerate')) {
    qs('tdlGenerate').onclick = () => {
        const t = qs('tdlType').value;
        const date = getMoscowDate();
        let res = '';
        if (t === 'patrol') {
            const cId = qs('tdlCollectorId').value.trim() || 'ID';
            const leads = qs('tdlLeads').value.trim().split(/\s+/).filter(Boolean);
            const leadStr = leads.length >= 2
                ? `[link${leads[0]}] [${leads[0]}] (А), [link${leads[1]}] [${leads[1]}] (Б)`
                : `[link${leads[0] || cId}] [${leads[0] || cId}] (Общий)`;
            const parts = qs('tdlParts').value.trim().split(/\s+/).filter(Boolean).map(id => `[link${id}] [${id}]`).join(', ') || '[linkID] [ID]';
            res = `[b]${date}[/b]\n[b]Лагерный патруль[/b]\n[b]Время:[/b] ${qs('tdlPatrolTime').value}\n[b]Собирающий:[/b] [link${cId}] [${cId}]\n[b]Ведущий:[/b] ${leadStr}\n[b]Участники:[/b] ${parts}`;
        } else if (t.startsWith('watch')) {
            const wId = qs('tdlWatchId').value.trim() || 'ID';
            const isLoc = qs('tdlRoute').value === 'loc';
            const modeTxt = qs('tdlWatchMode').value;
            if (t === 'watch_start') {
                const routeStart = isLoc ? `локацию ${qs('tdlLoc').value}` : `маршрут ${qs('tdlRoute').value}`;
                res = `[b]${date}[/b]\n[b]Начало ${modeTxt} лагерного дозора[/b]\n[link${wId}] [${wId}], занял ${routeStart}`;
            } else {
                const time = qs('tdlTimeRange').value.trim() || '00:00 - 00:00';
                const dur = calculateTimeDifference(time);
                const modeTitle = modeTxt === 'активного' ? 'Активный' : 'Пассивный';
                const rName = isLoc ? qs('tdlLoc').value : qs('tdlRoute').value;
                res = `[b]${date}[/b]\n[b]${modeTitle} лагерный дозор[/b]\n[b]Время:[/b] ${time} (${dur.formatted})\n[b]Участник:[/b] [link${wId}] [${wId}]\n[b]Маршрут:[/b] ${rName}`;
            }
        } else if (t === 'hunt') {
            const hId = qs('tdlHunterId').value.trim() || 'ID';
            let catchStr = qs('tdlCatch').value.trim() || '-';
            if (catchStr !== '-') {
                const numbers = catchStr.split(/\s+/);
                if (numbers.length === 3 && numbers.every(n => !isNaN(n))) {
                    catchStr = `${numbers[0]}/${numbers[1]}/${numbers[2]}`;
                }
            }
            res = `[b]${date}[/b]\n[b]Лагерная охота[/b]\n[b]Охотник:[/b] [link${hId}] [${hId}] (${catchStr})\n[b]Доказательства:[/b] [url=${qs('tdlProofBefore').value.trim() || '-'}]до[/url], [url=${qs('tdlProofAfter').value.trim() || '-'}]после[/url]`;
        } else if (t === 'check') {
            const myId = qs('tdlCheckMyId').value.trim() || 'ID';
            const tId = qs('tdlCheckTargetId').value.trim() || 'ID';
            res = `[b]${date}[/b]\n[b]Проверка дозорного[/b]\nЯ, [link${myId}] [${myId}], проверил дозорного [link${tId}] [${tId}] в ${qs('tdlCheckTime').value.trim() || '-'}; проверка ${qs('tdlCheckStatus').value}`;
        }
        qs('tdlResult').value = res;
    };
}

function updateHealForm() {
    const mainType = qs('healMainType').value;
    const subSpv = qs('healSubSpv').value;
    document.querySelector('.heal-sub-resource').classList.toggle('hidden', mainType !== 'resource');
    document.querySelector('.heal-sub-exp').classList.toggle('hidden', mainType !== 'expedition');
    document.querySelector('.heal-sub-spv').classList.toggle('hidden', mainType !== 'spv');
    const collectorLabel = qs('healCollectorLabel');
    const collectorWrap = qs('healCollectorWrap');
    const partsWrap = qs('healPartsWrap');
    const helpersWrap = qs('healHelpersWrap');
    const docNote = qs('healDocNote');
    const miceWrap = qs('healMiceWrap');
    const patientWrap = qs('healPatientWrap');
    const diseaseWrap = qs('healDiseaseWrap');
    const replacedWrap = qs('healReplacedWrap');
    collectorWrap.classList.remove('hidden');
    collectorWrap.classList.remove('full');
    partsWrap.classList.remove('hidden');
    partsWrap.classList.remove('full');
    helpersWrap.classList.add('hidden');
    docNote.classList.add('hidden');
    miceWrap.classList.add('hidden');
    patientWrap.classList.add('hidden');
    diseaseWrap.classList.add('hidden');
    replacedWrap.classList.add('hidden');
    collectorLabel.innerText = "Собирающий (ID)";
    if (mainType === 'doc_patrol') {
        helpersWrap.classList.remove('hidden');
        docNote.classList.remove('hidden');
        partsWrap.classList.add('full');
    } else if (mainType === 'free_hunt') {
        collectorLabel.innerText = "Участник (ID)";
        partsWrap.classList.add('hidden');
        miceWrap.classList.remove('hidden');
    } else if (mainType === 'spv') {
        partsWrap.classList.add('hidden');
        if (subSpv === 'heal') {
            collectorLabel.innerText = "ID";
            patientWrap.classList.remove('hidden');
            diseaseWrap.classList.remove('hidden');
        } else if (subSpv === 'duty') {
            collectorLabel.innerText = "Дежурный (ID)";
            collectorWrap.classList.add('full');
        } else if (subSpv === 'supervision') {
            collectorLabel.innerText = "Надзорный (ID)";
            replacedWrap.classList.remove('hidden');
            collectorWrap.classList.add('full');
        }
    }
}
const healMainEl = qs('healMainType');
const healSpvEl = qs('healSubSpv');
if (healMainEl) healMainEl.addEventListener('change', updateHealForm);
if (healSpvEl) healSpvEl.addEventListener('change', updateHealForm);
function formatHealIds(rawStr) {
    const raw = rawStr.trim().split(/\s+/).filter(Boolean);
    return raw.map(str => {
        let id = str;
        let miceStr = '';
        if (str.includes('+')) {
            const parts = str.split('+');
            id = parts[0];
            miceStr = ` (+${parts[1]} мышей)`;
        }
        return `[link${id}] [${id}]${miceStr}`;
    }).join(', ') || '-';
}
document.querySelectorAll('.shrk-chip').forEach(chip => { chip.addEventListener('click', () => chip.classList.toggle('active')); });
const healBtn = qs('healGenerate');
if (healBtn) {
    healBtn.onclick = () => {
        const mainType = qs('healMainType').value;
        const myId = qs('healCollectorId').value.trim() || 'ID';
        const date = getMoscowDate();
        let resultText = '';
        if (mainType === 'resource' || mainType === 'expedition') {
            const sub = mainType === 'resource' ? qs('healSubResource').value : qs('healSubExp').value;
            let subConjugated = sub;
            if (sub === 'веточник') subConjugated = 'веточнике';
            if (sub === 'травник') subConjugated = 'травнике';
            if (sub === 'мховник') subConjugated = 'мховнике';
            if (sub === 'дневная экспедиция') subConjugated = 'дневной экспедиции';
            if (sub === 'вечерняя экспедиция') subConjugated = 'вечерней экспедиции';
            const parts = formatHealIds(qs('healPartIds').value);
            resultText = `[b]${date}[/b]\n[b]Отчёт о ${subConjugated}.[/b]\n[u]Собирающий:[/u] [link${myId}] [${myId}]\n[u]Участники:[/u] ${parts}`;
        } else if (mainType === 'doc_patrol') {
            const parts = formatHealIds(qs('healPartIds').value);
            const helpers = formatHealIds(qs('healHelperIds').value);
            resultText = `[b]${date}[/b]\n[b]Отчёт о докторском патруле.[/b]\n[u]Собирающий:[/u] [link${myId}] [${myId}]\n[u]Участники:[/u] ${parts}\n[u]Помощники:[/u] ${helpers}`;
        } else if (mainType === 'free_hunt') {
            const mice = qs('healMice').value || '1';
            resultText = `[b]${date}[/b]\n[b]Отчёт о свободной охоте.[/b]\n[u]Участник:[/u] [link${myId}] [${myId}] (+${mice} мышей)`;
        } else if (mainType === 'spv') {
            const sub = qs('healSubSpv').value;
            if (sub === 'heal') {
                const patientId = qs('healPatientId').value.trim() || 'ID';
                const disease = qs('healDisease').value;
                resultText = `[b]${date}[/b]\n[b]Отчёт о лечении.[/b]\nЯ, [link${myId}] [${myId}], вылечил [link${patientId}] от ${disease}.`;
            } else if (sub === 'duty') {
                resultText = `[b]${date}[/b]\n[b]Отчёт о дежурстве.[/b]\n[u]Дежурный:[/u] [link${myId}] [${myId}]`;
            } else if (sub === 'supervision') {
                const activeChips = document.querySelectorAll('.shrk-chip.active');
                const replacedVals = Array.from(activeChips).map(chip => chip.getAttribute('data-value'));
                const replaced = replacedVals.length > 0 ? replacedVals.join(', ') : '-';
                resultText = `[b]${date}[/b]\n[b]Отчёт о надзоре.[/b]\n[u]Надзорный:[/u] [link${myId}] [${myId}]\n[u]Заменил и провел мероприятия:[/u] ${replaced}`;
            }
        }
        qs('healResult').value = resultText;
    };
}
if (healMainEl) updateHealForm();

const btnJournal = qs('btnJournal');
const journalReportType = qs('journalReportType');
const journalStreamWrap = qs('journalStreamWrap');
const journalCasterWrap = qs('journalCasterWrap');
const journalTitleWrap = qs('journalTitleWrap');
const journalAuthorWrap = qs('journalAuthorWrap');
const journalDateWrap = qs('journalDateWrap');
const journalDateInput = qs('journalDate');
if (journalDateInput) journalDateInput.value = getMoscowDate();
if (journalReportType) {
    function updateJournalView() {
        if (journalReportType.value === 'news') {
            if (journalStreamWrap) journalStreamWrap.style.display = 'none';
            if (journalCasterWrap) journalCasterWrap.style.display = 'none';
            if (journalDateWrap) journalDateWrap.classList.add('hidden');
            if (journalTitleWrap) journalTitleWrap.classList.remove('hidden');
            if (journalAuthorWrap) journalAuthorWrap.classList.add('full');
        } else {
            if (journalStreamWrap) journalStreamWrap.style.display = '';
            if (journalCasterWrap) journalCasterWrap.style.display = '';
            if (journalDateWrap) journalDateWrap.classList.remove('hidden');
            if (journalTitleWrap) journalTitleWrap.classList.add('hidden');
            if (journalAuthorWrap) journalAuthorWrap.classList.remove('full');
        }
    }
    journalReportType.addEventListener('change', updateJournalView);
    updateJournalView();
}
if (btnJournal) {
    function shortenUrl(url) {
        let clean = url.replace(/^https?:\/\//, "").replace(/^www\./, "");
        if (clean.startsWith("vk.com/")) {
            let part = clean.split("/")[1];
            return part ? part.split("?")[0] : "vk.com";
        }
        return clean.split("/")[0];
    }
    function formatJournalText(text, applyLinksAndIds = true) {
        let t = text || "Текст.";
        t = t.replace(/●/g, "[size=15]•[/size]");
        t = t.replace(/○/g, "[size=15]∘[/size]");
        t = t.replace(/^(\s*)(\d+\.)/gm, "$1[b]$2[/b]");
        if (applyLinksAndIds) {
            t = t.replace(/catwar\.(?:net|su)\/blog(\d+)/gi, (match, id) => `[url=blog${id}]блог[/url]`);
            const linkRegex = /(https?:\/\/\S+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/\S*)/g;
            t = t.replace(linkRegex, (match) => {
                if (match.includes("blog")) return match;
                const fullUrl = match.startsWith("http") ? match : "https://" + match;
                const shortText = shortenUrl(match);
                return `[url=${fullUrl}]${shortText}[/url]`;
            });
            t = t.replace(/\[(\d+)\](?!\s*\(\[link\1\]\))/g, (match, id) => `${match} ([link${id}])`);
        }
        return t;
    }
    btnJournal.onclick = () => {
        const isNews = journalReportType.value === 'news';
        const titleVal = qs('journalTitle')?.value || "ЗАГОЛОВОК";
        const today = qs('journalDate')?.value || getMoscowDate();
        const dateVal = isNews ? titleVal : today;
        const newsTxt = formatJournalText(qs('journalNews').value, true);
        const streamTxt = formatJournalText(qs('journalStream').value, false);
        const authorId = qs('journalAuthorId').value.trim() || "ID";
        let casterId = qs('journalCasterId').value.trim();
        if (!casterId) casterId = authorId;
        let template = '';
        if (!isNews) {
            template = `[font=cambria][size=13][color=#4B2F1F][bgrf=#654E3D][pad=4 3 4 4][justify][divr=https://sun9-43.userapi.com/s/v1/ig2/sUh1KyKKa-ddjBYNhsuK8Pm249btOow7ykVEhNJC0WwFMj3zK7G_QDk5jjUIUd_b9Jv8dhNOAMH2eIUD9ybQOlRA.jpg?quality=95&as=32x64,48x96,72x144,108x216,160x320,240x480,360x720,480x960,540x1080,564x1128&from=bu&u=Fxn8BVgwWe5NLzoYlYSmjr08gvhZpXZDwpuVSbIrwQE&cs=564x0][bgrf=#C4A78D99][center][font=georgia][b][size=16][color=#4B2F1F][pad=8]СОБРАНИЕ, ${dateVal}[/pad][/color][/size][/b][/font][/center][/bgrf][bgrf=#654E3D][pad=1.5][/pad][/bgrf][bgrf=#F3EADBCC][pad=20][bgrf=#A98A7077][pad=3][font=georgia][b][size=14][color=#4B2F1F] НОВОСТИ[/color][/size][/b][/font][/pad][/bgrf][br]${newsTxt}[br][size=9]Пост составил: [cat${authorId}] [${authorId}][/size][br][br][bgrf=#A98A7077][pad=3][font=georgia][b][size=14][color=#4B2F1F][center][ [header=блок1]РАСКРЫТЬ ТРАНСЛЯЦИЮ СОБРАНИЯ[/header] ][/center][/color][/size][/b][/font][/pad][/bgrf][block=блок1][br]${streamTxt}[br][size=9]Транслировал собрание: [cat${casterId}] [${casterId}][/size][/block][/pad][/bgrf][/divr][/justify][/pad][/bgrf][/color][/size][/font]`;
        } else {
            template = `[font=cambria][size=13][color=#4B2F1F][bgrf=#654E3D][pad=4 3 4 4][justify][divr=https://sun9-43.userapi.com/s/v1/ig2/sUh1KyKKa-ddjBYNhsuK8Pm249btOow7ykVEhNJC0WwFMj3zK7G_QDk5jjUIUd_b9Jv8dhNOAMH2eIUD9ybQOlRA.jpg?quality=95&as=32x64,48x96,72x144,108x216,160x320,240x480,360x720,480x960,540x1080,564x1128&from=bu&u=Fxn8BVgwWe5NLzoYlYSmjr08gvhZpXZDwpuVSbIrwQE&cs=564x0][bgrf=#C4A78D99][center][font=georgia][b][size=16][color=#4B2F1F][pad=8]${dateVal}[/pad][/color][/size][/b][/font][/center][/bgrf][bgrf=#654E3D][pad=1.5][/pad][/bgrf][bgrf=#F3EADBCC][pad=20][bgrf=#A98A7077][pad=3][font=georgia][b][size=14][color=#4B2F1F] НОВОСТИ[/color][/size][/b][/font][/pad][/bgrf][br]${newsTxt}[br][size=9]Пост составил: [cat${authorId}] [${authorId}][/size][/pad][/bgrf][/divr][/justify][/pad][/bgrf][/color][/size][/font]`;
        }
        qs('journalResult').value = template;
    };
}

const seagullsPlatform = qs('seagullsPlatform');
const seagullsRole = qs('seagullsRole');
const seagullsTag = qs('seagullsTag');
const seagullsDateWrap = qs('seagullsDateWrap');
const seagullsWordsWrap = qs('seagullsWordsWrap');
const seagullsGroupWrap = qs('seagullsGroupWrap');
const seagullsPartnerWrap = qs('seagullsPartnerWrap');
const seagullsProofsWrap = qs('seagullsProofsWrap');
const seagullsDateInput = qs('seagullsDate');
const seagullsBlogActivity = qs('seagullsBlogActivity');
const vkOnlyElements = document.querySelectorAll('.vk-only');
const blogOnlyElements = document.querySelectorAll('.blog-only');
const seagullsOptions = {
    promo: [
        { val: 'chat', text: '#чат' }, { val: 'review', text: '#отзыв' },
        { val: 'feed', text: '#лента' }, { val: 'link', text: '#ссылка' }, { val: 'private', text: '#приват' }
    ],
    herald: [
        { val: 'stream', text: '#трансляция' }, { val: 'post', text: '#пост' },
        { val: 'herald', text: '#вестник' }, { val: 'take', text: '#беру' }, { val: 'informant', text: '#информатор' }
    ]
};
if (seagullsPlatform && seagullsRole && seagullsTag) {
    if (seagullsDateInput) seagullsDateInput.value = getMoscowDate();
    function updateSeagullsPlatform() {
        const isBlog = seagullsPlatform.value === 'blog';
        vkOnlyElements.forEach(el => el.classList.toggle('hidden', isBlog));
        blogOnlyElements.forEach(el => el.classList.toggle('hidden', !isBlog));
        updateSeagullsFields();
    }
    function updateSeagullsTags() {
        const role = seagullsRole.value;
        const options = seagullsOptions[role];
        seagullsTag.innerHTML = '';
        options.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.val;
            el.textContent = opt.text;
            seagullsTag.appendChild(el);
        });
        updateSeagullsFields();
    }
    function updateSeagullsFields() {
        const isBlog = seagullsPlatform.value === 'blog';
        const proofsLabel = qs('seagullsProofsLabel');
        if (proofsLabel) {
            let needsPostLink = false;
            if (!isBlog) {
                const tag = seagullsTag.value;
                if (tag === 'review' || tag === 'feed' || tag === 'link') needsPostLink = true;
            }
            proofsLabel.textContent = needsPostLink ? 'Ссылка на пост' : 'Ссылка на доказательства';
        }
        seagullsWordsWrap.classList.add('hidden');
        seagullsGroupWrap.classList.add('hidden');
        seagullsPartnerWrap.classList.add('hidden');
        seagullsDateWrap.classList.remove('hidden');
        seagullsProofsWrap.classList.remove('hidden');
        if (isBlog) {
            if (seagullsBlogActivity && seagullsBlogActivity.value.includes('отзыв')) {
                seagullsWordsWrap.classList.remove('hidden');
            }
        } else {
            const tag = seagullsTag.value;
            const role = qs('seagullsRole').value;
            if (role === 'herald' || tag === 'chat' || tag === 'private') seagullsProofsWrap.classList.add('hidden');
            if (tag === 'review') {
                seagullsWordsWrap.classList.remove('hidden');
            } else if (tag === 'take') {
                seagullsGroupWrap.classList.remove('hidden');
                seagullsPartnerWrap.classList.remove('hidden');
                seagullsDateWrap.classList.add('hidden');
            }
        }
    }
    seagullsPlatform.addEventListener('change', updateSeagullsPlatform);
    seagullsRole.addEventListener('change', updateSeagullsTags);
    seagullsTag.addEventListener('change', updateSeagullsFields);
    if (seagullsBlogActivity) seagullsBlogActivity.addEventListener('change', updateSeagullsFields);
    updateSeagullsTags();
    updateSeagullsPlatform();
}
const btnSeagulls = qs('seagullsGenerate');
if (btnSeagulls) {
    btnSeagulls.onclick = () => {
        const platform = qs('seagullsPlatform').value;
        const id = qs('seagullsId').value.trim() || 'ID';
        const wordsValue = qs('seagullsWords').value.trim() || 'N';
        let result = '';
        if (platform === 'blog') {
            const activity = qs('seagullsBlogActivity').value;
            const date = qs('seagullsDate').value.trim() || getMoscowDate();
            const isReview = activity.includes('отзыв');
            let title = isReview ? 'Отчёт об отзыве' : 'Отчёт о ' + activity.replace('реклама', 'рекламе');
            const wordsLine = isReview ? `\nКоличество слов: ${wordsValue} слов;` : '';
            let proofsRaw = qs('seagullsProofs').value.trim();
            let proofsText = 'скриншот.';
            if (proofsRaw) {
                const links = proofsRaw.split(/\s+/).filter(Boolean);
                proofsText = `[[url=${links[0]}]скриншот[/url]]`;
                for (let i = 1; i < links.length; i++) proofsText += ` [[url=${links[i]}]скриншот${i + 1}[/url]]`;
                proofsText += '.';
            }
            result = `[b]${title}[/b]\n[b]${date}[/b]\nУчастник: [link${id}] [${id}];${wordsLine}\nДоказательства: ${proofsText}`;
        } else {
            const tag = seagullsTag.value;
            const name = qs('seagullsName').value.trim() || 'Имя';
            const date = qs('seagullsDate').value.trim() || getMoscowDate();
            const rawProofs = qs('seagullsProofs').value.trim();
            const proofs = rawProofs ? `\n${rawProofs}` : '';
            if (tag === 'review') result = `#отзыв — ${wordsValue} слов, ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'chat') result = `#чат — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'feed') result = `#лента — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'private') result = `#приват — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'link') result = `#ссылка — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'stream') result = `#трансляция — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'post') result = `#пост — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'herald') result = `#вестник — ${name} [${id}], ${date}${proofs}`;
            else if (tag === 'take') {
                const group = qs('seagullsGroup').value.trim() || 'название группы';
                const partner = qs('seagullsPartnerTag').value.trim() || '@напарник';
                result = `#беру — ${name} [${id}], пост в ${group}, ${partner}`;
            } else if (tag === 'informant') result = `#информатор — ${name} [${id}], ${date}${proofs}`;
        }
        qs('seagullsResult').value = result;
    };
}

const calcInput = qs('calcInput');
const calcResult = qs('calcResult');
if (calcInput) {
    calcInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        const text = this.value.trim();
        if (!text) {
            calcResult.textContent = "Итого: 0 слов";
            this.style.height = '60px';
            return;
        }
        const wordsMatch = text.match(/[а-яА-ЯёЁa-zA-Z]+(?:-[а-яА-ЯёЁa-zA-Z]+)*/g);
        const count = wordsMatch ? wordsMatch.length : 0;
        calcResult.textContent = `Итого: ${count} слов`;
    });
}

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTeTpiRbQzJpMduPQSUwZgqNXv3D859ZRe_d8GLMhHm-5ZkTset1XHC0NqB7KaFRQ5pg/exec';
async function fetchAdCode() {
    const adArea = qs('adCodeArea');
    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        if (data.code) adArea.value = data.code;
        else if (data.error) adArea.value = "Ошибка: " + data.error;
    } catch (err) {
        console.error("Ошибка сети:", err);
        adArea.value = "Ошибка загрузки данных";
    }
}
document.addEventListener('DOMContentLoaded', fetchAdCode);

function setupTaskPeriods() {
    const select = qs('taskRange');
    if (!select) return;
    const periods = [
        '01.03 — 14.03', '15.03 — 28.03', '29.03 — 11.04', '12.04 — 25.04', '26.04 — 09.05', '10.05 — 23.05', '24.05 — 31.05',
        '01.06 — 14.06', '15.06 — 28.06', '29.06 — 12.07', '13.07 — 26.07', '27.07 — 09.08', '10.08 — 23.08', '24.08 — 31.08',
        '01.09 — 14.09', '15.09 — 28.09', '29.09 — 12.10', '13.10 — 26.10', '27.10 — 09.11', '10.11 — 23.11', '24.11 — 30.11',
        '01.12 — 14.12', '15.12 — 28.12', '29.12 — 11.01', '12.01 — 25.01', '26.01 — 08.02', '09.02 — 22.02', '23.02 — 28.02'
    ];
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const now = new Date();
    const parsed = periods.map((p) => {
        const [startPart, endPart] = p.split('—').map(s => s.trim());
        const [sd, sm] = startPart.split('.').map(Number);
        const [ed, em] = endPart.split('/')[0].split('.').map(Number);
        let startYear = now.getFullYear();
        let endYear = now.getFullYear();
        if (em < sm) {
            if (now.getMonth() === 0) startYear = now.getFullYear() - 1;
            else endYear = now.getFullYear() + 1;
        }
        return {
            text: p, month: sm,
            start: new Date(startYear, sm - 1, sd, 0, 0, 0),
            end: new Date(endYear, em - 1, ed, 23, 59, 59)
        };
    });
    select.innerHTML = '';
    let defaultVal = periods[0];
    let currentGroup = null;
    let currentLabel = null;
    parsed.forEach(p => {
        const label = monthNames[p.month - 1];
        if (label !== currentLabel) {
            currentGroup = document.createElement('optgroup');
            currentGroup.label = label;
            select.appendChild(currentGroup);
            currentLabel = label;
        }
        const opt = document.createElement('option');
        opt.value = p.text;
        opt.textContent = p.text;
        currentGroup.appendChild(opt);
        if (now >= p.start && now <= p.end) defaultVal = p.text;
    });
    select.value = defaultVal;
}
setupTaskPeriods();

if (qs('taskMode')) qs('taskMode').onchange = () => {
    const isDone = qs('taskMode').value === 'done';
    document.querySelectorAll('.task-sub-done').forEach(el => el.classList.toggle('hidden', !isDone));
    document.querySelectorAll('.task-sub-reward').forEach(el => el.classList.toggle('hidden', isDone));
    qs('taskCloneWrap').classList.toggle('hidden', isDone || qs('taskRewardType').value !== 'клон');
};
if (qs('taskRewardType')) qs('taskRewardType').onchange = () => {
    qs('taskCloneWrap').classList.toggle('hidden', qs('taskRewardType').value !== 'клон');
};
if (qs('taskGenerate')) qs('taskGenerate').onclick = () => {
    const idInput = qs('taskId');
    const id = idInput ? (idInput.value.trim() || 'ID') : 'ID';
    const proof = qs('taskProof').value.trim() || '-';
    if (qs('taskMode').value === 'done') {
        qs('taskResult').value = `Я, [link${id}] [${id}], выполнил поручение под номером ${qs('taskNumber').value || 1} за промежуток ${qs('taskRange').value}. [[url=${proof}]Доказательство[/url]].`;
    } else {
        let res = `[b]Запрос награды[/b]\nЯ, [link${id}] [${id}], выполнил требования на ${qs('taskRewardType').value}. [[url=${proof}]Доказательство[/url]].`;
        if (qs('taskRewardType').value === 'клон') {
            res += `\nИнформация для клона:\nОкрас [[url=${qs('taskCloneColor').value.trim() || '-'}]PNG[/url]];\nРеференс: [[url=${qs('taskCloneRef').value.trim() || '-'}]ссылка[/url]];\nДополнительная информация: ${qs('taskCloneExtra').value.trim() || '-'}.`;
        }
        qs('taskResult').value = res;
    }
};
