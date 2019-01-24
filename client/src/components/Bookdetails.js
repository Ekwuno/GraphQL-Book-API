import React, {Component}from 'react'
import {graphql} from 'react-apollo'
import {getSingleBookQuery} from '../queries/queries.js'

class BookDetails extends Component{


    render(){
        console.log(this.props)
        return(
            <div id="book-details">
              <p>Output book details here</p> 
                
            </div>
        )
    }
}


export default  graphql(getSingleBookQuery)(BookDetails)