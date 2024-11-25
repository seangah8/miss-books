import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

const { useState, useEffect } = React

export function BookIndex(){

    const [bookList,setBookList] = useState(null)
    const [filter, setFilter] = useState( bookService.getDefaultFilter())
    const [maxBookPrice, setMaxBookPrice] = useState(0)
    
    useEffect(() => { 
        loadBooks()
    },[filter])

    function loadBooks() {
        bookService.query(filter)
        .then(setBookList)
        .catch(err => {
            console.log('Problems getting books:', err)
        })
        loadMaxPrice()    
    }
    
    function loadMaxPrice(){
        bookService.getTopBookPrice().then(setMaxBookPrice)
    }

    function onSetFilter(newFilter){
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter}))
    }

    function onRemoveBook(bookId){
        bookService.remove(bookId).then(()=>loadBooks())
    }

    if(!bookList || !filter){
        return <h1>Loading List...</h1>
    }

    return(
        <div className='book-index'>
            <BookFilter filter={filter} onSetFilter={onSetFilter} maxPrice={maxBookPrice}/>
            <BookList books={bookList} onRemoveBook={onRemoveBook}/>
        </div>
    )
}