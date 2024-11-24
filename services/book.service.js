import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

const BOOK_KEY = 'bookDB'
_createDefultBooks()

export const bookservice = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = bookService


// returns the filterd book list
function query(filterBy = {}) {
    console.log('in query')
    return storageService.query(BOOK_KEY)
        .then(books => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     books = books.filter(book => regExp.test(book.vendor))
            // }

            // if (filterBy.minSpeed) {
            //     books = books.filter(book => book.maxSpeed >= filterBy.minSpeed)
            // }

            return books
        })
}

// return book by the id it gets
function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

// remove book by the id it gets
function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

//save changes on book (book with id), and creates book if it doesn't have one
function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

// returns defualt filter settings
function getDefaultFilter(filterBy = {title: '', listPrice: {amout:0, currencyCode:'', isOnSale:false}}) {
    return { title: filterBy.title, listPrice: filterBy.listPrice }
}

// if no DB, creates you new one with 3 defult books
function _createDefultBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [_createBook('Gwent', {amout:5, currencyCode:'EUR', isOnSale:false}),
                    _createBook('Unbored', {amout:10, currencyCode:'USD', isOnSale:false}),
                    _createBook('Holes', {amout:15, currencyCode:'ILS', isOnSale:false})
        ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

// takes book's info and retrun a book item
function _createBook(title, listPrice) {
    const book = {title, listPrice}
    book.id = utilService.makeId()
    return book
}
