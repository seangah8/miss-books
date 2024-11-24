import { bookservice } from '../services/book.service.js'

export function BookIndex(){

    bookservice.query()
    
    return(
        <h1>Books Page</h1>
    )
}