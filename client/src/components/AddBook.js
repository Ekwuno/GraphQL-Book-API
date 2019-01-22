import React ,{Component} from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}`

 class AddBook extends Component{
    displayAuthors(){
        var data = this.props.data;
        if (data.loading){
            return <option disabled>Loading Authors...</option>
        }else {
            return data.authors.map(author =>{
                return(
                    <option key= {author.id}>{author.name}</option>
                );
            })
        }
    }
    render(){
        return(
            
                <form id='add-book'>
                    <div className = 'field'>
                        <label>Book Name:</label>
                        <input type= 'text'/>
                    </div>
        
                    <div className = 'field'>
                        <label>Genre:</label>
                        <input type= 'text'/>
                    </div>
        
                    <div className = 'field'>
                        <label>Author</label>
                        <select>
                            <option>
                                select author 
                            </option>
                            {this.displayAuthors()}
                        </select>
                    </div>
        
                    <button>+</button>
                </form>
            
        )
    }
}

export default graphql(getAuthorsQuery) (AddBook)