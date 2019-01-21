import React, {Component}from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getBookQuery = gql`

{
    books{
        name
        id
    }
} `

class BookList extends Component{

    //display books 
    displayBooks(){
        var data = this.props.data;
        if (data.loading){
            return <div>Loading Books...</div>
        }else {
            return data.books.map(book =>{
                return(
                    <li>{book.name}</li>
                )
            })
        }
    }

    render(){
        // console.log(this.props)
        return(
            <div>
                <ul id='book-list'>
                    <li>
                        Book name 
                    </li>
                </ul>
            </div>
        )
    }
}

export default graphql(getBookQuery)(BookList)