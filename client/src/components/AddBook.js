import React ,{Component} from 'react'
import {graphql,compose} from 'react-apollo'
import {getAuthorsQuery,addBookMutation,getBookQuery} from '../queries/queries'


 class AddBook extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre:'',
            authorid:''
        }
        this.submitForm = this.submitForm.bind(this)
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if (data.loading){
            return <option disabled>Loading Authors...</option>
        }else {
            return data.authors.map(author =>{
                return(
                    <option key= {author.id} value={author.id}>{author.name}</option> // author.id as value g
                );
            })
        }
    }

    submitForm = e =>{
        e.preventDefault();
        // console.log(this.state)
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorid:this.state.authorid

            },
            refetchQueries : [{query:getBookQuery}]
        })

    }

    render(){
        return(
            
                <form id='add-book' onSubmit ={this.submitForm}>
                    <div className = 'field'>
                        <label>Book Name:</label>
                        <input type= 'text' onChange= {(e)=> this.setState({name:e.target.value})}/>
                    </div>
        
                    <div className = 'field'>
                        <label>Genre:</label>
                        <input type= 'text'onChange= {(e)=> this.setState({genre:e.target.value})}/>
                    </div>
        
                    <div className = 'field'>
                        <label>Author</label>
                        <select  onChange= {(e)=> this.setState({authorid:e.target.value})}>
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

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),// binding multiple queries to one componet
    graphql(addBookMutation,{name:"addBookMutation"})
    
) (AddBook)