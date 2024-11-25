import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook }){


    return(
        <ul className="book-list">
            {
                books.map((book,key) =>
                <li key={book.id}>
                    <article>
                        <BookPreview id={book.id}
                                    title={book.title}
                                    amount={book.listPrice.amount}
                                    onSale={book.listPrice.isOnSale}
                                    onRemove={onRemoveBook}/>
                    
                    </article>
                </li>
                )
            }
            
        </ul>
        
    )
}