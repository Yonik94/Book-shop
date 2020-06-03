'use strict'
var gId;
const PAGE_SIZE = 8;
var gPageIdx;
var gBooks;
function init(){
    gId = 1;
    gBooks = _createBooks()
    gPageIdx = 0;
}

function getBooks() {
    var startIdx = PAGE_SIZE * gPageIdx
    var endIdx = PAGE_SIZE * (gPageIdx + 1)
    var books = gBooks.slice(startIdx, endIdx)
    return books
}

function changePage(direction) {
    var lastPage = gBooks.length/PAGE_SIZE
    if (direction === 'next') {
        if (gPageIdx+1 >= lastPage) return true
        gPageIdx++
    } else{
        if (gPageIdx === 0) return true;
        gPageIdx--
    } 
}

function _createBook(bookName, bookPrice) {
    var book = {
        id: gId++,
        name: bookName,
        price: bookPrice,
        img: `<img src="img/${bookName}.png" alt="book image - ${bookName}">`,
        description: makeLorem(40)
    }
    return book
}
function _createBooks() {
    var books = getBooksFromStorage('books')
    if (!books || books.length === 0) {
        var names = ['Harry Potter', 'The Black Sheep', 'Sybil']
        books = []
        for (var i = 0; i < 20; i++) {
            var name = names[getRandomInt(0, names.length)]
            var price = getRandomArbitrary(20, 40).toFixed(2)
            var book = _createBook(name, price)
            books.push(book)
        }
        saveBooks(books)
    }
    return books
}
function getBooksFromStorage(key) {
    var books = loadFromStorage(key)
    return books
}
function saveBooks(value) {
    saveToStorage('books', value)
}

function findBookIdxById(id) {
    var bookIdx = gBooks.findIndex(book => book.id === +id)
    return bookIdx
}
function removeBook(bookIdx) {
    gBooks.splice(bookIdx, 1)
    saveBooks(gBooks)
}
function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.push(book)
    saveBooks(gBooks)
}
function updateBook(id, key, value) {
    var bookId = findBookIdxById(id)
    gBooks[bookId][key] = value
    saveBooks(gBooks)
}
function findBookById(id) {
    var book = gBooks.find(book => book.id === +id)
    return book
}