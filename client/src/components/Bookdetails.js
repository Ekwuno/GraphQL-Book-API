import React, {Component}from 'react'
import {graphql} from 'react-apollo'
import {getSingleBookQuery} from '../queries/queries.js'

class BookDetails extends Component{

        displayBookDetails(){
            const {book} = this.props.data; //ES6 destructuring
            if(book){
                return(
                    <div>
                        <h2>{book.name}</h2>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>All Books by the author</p>
                        <ul className='other-books'>
                            {book.author.books.map(item =>{
                                return <li key= {item.id}> {item.name}</li>
                            })}
                        </ul>
                    </div>
                   
                )
            }
            else{
                return(
                    <div> No book selected...</div>
                )
            }
        }
    render(){
        console.log(this.props)
        return(
            <div id="book-details">
              {this.displayBookDetails()} 
                
            </div>
        )
    }
}


export default  graphql(getSingleBookQuery,{
    options: (props)=>{
        return{
            variables:{
                id: props.bookid
            }
        }
    }
})(BookDetails)