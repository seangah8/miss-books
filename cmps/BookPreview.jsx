
export function BookPreview({id, title, amount, onSale, onRemove}){


    return(
        <div className="book-preview">
            <h1>{`title: ${title}, amount: ${amount}, onSale: ${onSale}`}</h1>
            <button onClick={() => onRemove(id)}>Remove</button>
        </div>
    )
}