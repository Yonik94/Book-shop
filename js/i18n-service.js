var gTrans = {
    title: {
        en: 'Book shop',
        he: 'חנות ספרים'
    },
    'owner-signIn': {
        en: 'Shop owner? click to sign-in',
        he: 'בעל החנות? לחץ להתחברות'
    },
    'prev-page-btn': {
        en: 'Prev',
        he: 'הקודם'
    },
    'next-page-btn': {
        en: 'Next',
        he: 'הבא'
    },
    'details-btn':{
        en: 'More details',
        he: 'פרטים נוספים'
    },
    'add-book-btn':{
        en: 'Add book',
        he: 'הוסף ספר'
    },
    'update-btn':{
        en: 'Update',
        he: 'עדכן ספר'
    },
    'delete-btn':{
        en: 'Delete',
        he: 'מחק ספר'
    },
    'change-to-lang':{
        en: 'תרגם לעברית / Change to Hebrew ',
        he: 'Change to English / תרגם לאנגלית'
    },
    'add-book': {
        en: 'ADD BOOK',
        he: 'הוספת ספר'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    if (!gTrans[transKey]) return 'UNKNOWN'
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    // If translation not found - use english
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i=0; i < els.length; i++){
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);

        if (el.nodeName === 'INPUT') el.placeholder = trans
        else el.innerText = trans;
    }
}

function setLang() {
    gCurrLang = (gCurrLang === 'en') ? 'he' : 'en'
}
function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}


function relativeTime(ts) {
    return moment(ts).fromNow();
}