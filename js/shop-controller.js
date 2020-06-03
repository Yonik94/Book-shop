'use strict'
var gShopOwner = {
    userName: 'Yoni',
    password: '123',
    isLogin: true
}
//TODO new font from google fonts
//To fix the bugs of price in translation (in adding or updating books)
// Add resoponsive
// change the color and padding of buttons by actions
function onInit() {
    init()
    _renderBooks()
    doTrans()
}
function _renderBooks() {
    var elBooksContainer = document.querySelector('.books-container')
    elBooksContainer.innerHTML = ''
    var books = getBooks()
    books.forEach(book => _renderBook(book))
    if (gShopOwner.isLogin) {
        _renderAddBookBtn()
    }
}

function _renderBook(item) {
    var elBooksContainer = document.querySelector('.books-container')
    var strHtml = `<div data-id="${item.id}" class="book"></div>`
    elBooksContainer.innerHTML += strHtml
    var elBookContainer = document.querySelector(`div[data-id="${item.id}"]`)
    strHtml = `${item.img}<h5>Book id: ${item.id}</h5><h3 style="padding: 20px">${item.name}</h3><h5 data-type="currency">${item.price}$</h5>
    <button class="details" data-trans="details-btn" onclick="onDetailsBook(${item.id})">More details</button>`
    if (gShopOwner.isLogin) {
        strHtml += `<div class="action-buttons">
        <button data-trans="update-btn" class="update-button" onclick="onUpdateBook(${item.id})">Update</button>
        <button class="delete" data-trans="delete-btn" onclick="onRemoveBook(${item.id})">Delete</button>`
    }
    elBookContainer.innerHTML = strHtml
}

function _renderAddBookBtn() {
    var elAddBookBtn = document.querySelector('.add-book')
    var strHtml = `<button data-trans="add-book-btn" onclick="onAddBook()">Add a book</button>`;
    elAddBookBtn.innerHTML = strHtml;
}

function onRemoveBook(id) {
    var bookIdx = findBookIdxById(id)
    if (bookIdx === -1) return
    removeBook(bookIdx)
    _renderBooks()
}
function onAddBook() {
    var elSideBar = document.querySelector('.sidebar')
    showElement(elSideBar)
    renderSideBar('', 'addBook')
}
function onUpdateBook(id) {
    console.log(id)
    var book = findBookById(id)
    renderSideBar(book, 'update')
    var elSideBar = document.querySelector('.sidebar')
    showElement(elSideBar)
}
function onDetailsBook(id) {
    var elSideBar = document.querySelector('.sidebar')
    showElement(elSideBar)
    var book = findBookById(id);
    renderSideBar(book, 'details')
}
function onClose() {
    var elModal = document.querySelector('.details-modal')
    elModal.classList.add('hide')
}
function onCloseSidebar() {
    var elSideBar = document.querySelector('.sidebar')
    hideElement(elSideBar)
}
function renderSideBar(item, type) {
    var elSideBarTitle = document.querySelector('.sidebar-content .title')
    var elSideBarBody = document.querySelector('.sidebar-content .content-body')
    if (type === 'contact') {
        elSideBarTitle.innerText = 'CONTACT US'
        var strhtml = createContactForm()
        elSideBarBody.innerHTML = strhtml
    } else {
        if (type === 'addBook') {
            elSideBarTitle.setAttribute('data-trans', 'add-book')
            var text = gTrans['add-book'][gCurrLang]
            elSideBarTitle.innerText = text
        } else if (type === 'login') {
            elSideBarTitle.innerText = 'SIGN IN'
        } else {
            elSideBarTitle.innerText = (type === 'details') ? `BOOK DETAILS` : `BOOK UPDATE`
        }
        var elSideBarBName = document.querySelector('.sidebar-content .book-name')
        var elSideBarBId = document.querySelector('.sidebar-content .book-id')
        elSideBarBName.innerText = ''
        elSideBarBId.innerText = ''
        if (type !== 'addBook' && type !== 'login') {
            elSideBarBName.innerText = `Name: ${item.name}`
            elSideBarBId.innerText = `Id: ${item.id}`
        }
        if (type === 'details') {
            var strhtml = `<div><h3 style="margin-bottom: 30px">Book description:<h3>
            <h4 style="margin-bottom: 30px">${item.description}</h4>${item.img}</div>`
        } else if (type === 'login') {
            strhtml = `<input class="margin" name="user-name" type="text" 
            placeholder="user name">
            <input class="margin" name="password"  type="password"
            placeholder="password">          
            <button class="margin" onclick="onCompleteLogin()">Login</button>`
        } else {
            var strhtml = `<input class="margin" name="name" type="text" 
            placeholder="${(type === 'update') ? 'New name' : 'Book name'}">
            <input class="margin" name="price"  type="number"
            placeholder="${(type === 'update') ? "New price" : "Book price"}">          
            <button class="margin" onclick="onConfirmClick(${item.id}, ${type})">Confirm changes</button>`
        }
        elSideBarBody.innerHTML = strhtml
    }
}
function onContactUs(){
    var elSideBar = document.querySelector('.sidebar')
    showElement(elSideBar)
    renderSideBar('', 'contact')
}
function onSignIn(item, type) {
    var elSideBar = document.querySelector('.sidebar')
    showElement(elSideBar)
    renderSideBar(item, type)
}
function onCompleteLogin() {
    var elUserName = document.querySelector('input[name="user-name"]');
    var elPassword = document.querySelector('input[name="password"]');
    if (elUserName.value !== gShopOwner.userName
        || elPassword.value !== gShopOwner.password) return;
    gShopOwner.isLogin = true;
    _renderBooks();
    elUserName.value = '';
    elPassword.value = '';
    var elSideBar = document.querySelector('.sidebar');
    hideElement(elSideBar);
    document.querySelector('.owner-buttons h3').classList.add('hide')
    changeLang();
}
function createContactForm() {
    var strHtml = `<input class="margin" type="text" placeholder="Name">
    <input class="margin" type="text" placeholder="Email">
    <input class="margin" type="text" placeholder="Phone">
    <button class="margin">Confirm</button>`
    return strHtml
}
function changeLang() {
    doTrans()
    if (gCurrLang === 'he') {
        document.querySelector('body').setAttribute('dir', 'rtl')
        var prices = document.querySelectorAll('[data-type="currency"]')
        prices.forEach(price => {
            var num = price.innerText
            num = parseInt(num)
            num = num * 3.5
            num = formatCurrency(num)
            price.innerText = num
        })
    } else {
        document.querySelector('body').removeAttribute('dir')
        _renderBooks()
    }
}
function onChangeLang() {
    setLang()
    changeLang()
}
function onConfirmClick(id, type) {
    var price = document.querySelector('input[name="price"]')
    var name = document.querySelector('input[name="name"]')
    if (type === 'update') {
        console.log('asda')
        if (!name.value && !price.value) return
        if (name.value) {
            updateBook(id, 'name', name.value)
        }
        if (price.value) {
            updateBook(id, 'price', price.value)
        }
    } else {
        if (!name.value || !price.value) return
        addBook(name.value, price.value)
    }
    name.value = ''
    price.value = ''
    _renderBooks()
    var elSideBar = document.querySelector('.sidebar')
    hideElement(elSideBar)
}
function onPaginationClick(direction) {
    var isFalse = changePage(direction)
    if (isFalse) return
    _renderBooks()
}