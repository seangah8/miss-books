import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

const BOOK_KEY = 'bookDB'
_createDefultBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getTopBookPrice,
}

// For Debug (easy access from console):
// window.cs = bookService


// returns the filterd book list
function query(filter = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filter.title) {
                const regExp = new RegExp(filter.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if(filter.maxAmount || filter.maxAmount===0){
                books = books.filter(book => filter.maxAmount >= book.listPrice.amount)
            }
            if(filter.onSale)
            {
                books = books.filter(book => book.listPrice.isOnSale)
            }
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
function getDefaultFilter() {
    return { title: '', maxAmount: Number.MAX_SAFE_INTEGER, onSale: false}
}

// returns the price of the most expensive book on the list
async function getTopBookPrice(){
    const books = await storageService.query(BOOK_KEY)
    const maxPrice = books.reduce((accumulator, book)=>{
        const bookPrice = book.listPrice.amount
        return (bookPrice > accumulator) ? bookPrice : accumulator
    },0)
    return maxPrice
}

// if no DB, creates you new one with 3 defult books
function _createDefultBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [_createBook('Gwent', {amount:50, currencyCode:'EUR', isOnSale:false}),
                    _createBook('Unbored', {amount:75, currencyCode:'USD', isOnSale:true}),
                    _createBook('Holes', {amount:125, currencyCode:'ILS', isOnSale:true})
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
