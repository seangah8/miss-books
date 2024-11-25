import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({filter, onSetFilter, maxPrice}){

    const [filterToEdit, setFilterToEdit] = useState(filter)
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter)).current


    useEffect(()=>{
        onSetFilterDebounce(filterToEdit)
    },[filterToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range': 
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(event) {
        // event.preventDefault()
        // console.log(filterToEdit)
        // onSetFilter(filterToEdit)
    }


    const { title, maxAmount, onSale } = filterToEdit
    return(
        <div className="book-filter">
            <h1>Book Filter</h1>
            <form onSubmit={onSubmitFilter}>  
                
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />   
                
                <label htmlFor="maxAmount">maxPrice: {maxAmount===Number.MAX_SAFE_INTEGER?maxPrice:((maxAmount>maxPrice)?maxPrice:maxAmount)}</label>
                <input value={maxAmount} onChange={handleChange} min={0} 
                max={maxPrice} type="range" name="maxAmount"
                id="maxAmount" />   

                <label htmlFor="onSale">On Sale: </label>
                <input value={onSale} onChange={handleChange} type="checkbox" name="onSale" id="onSale" />   

                {/* <button>Submit</button> */}
            </form>
        </div>
    )
}