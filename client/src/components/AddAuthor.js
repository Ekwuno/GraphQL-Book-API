import React,{Component}from 'react'
import {  graphql } from 'react-apollo'
import {addAuthorMutation} from '../queries/queries'


class AddAuthor extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            age: '',
        }
    }

    submitForm = e =>{
        e.preventDefault();
        // console.log(this.state)
        this.props.addAuthorMutation({
            variables:{
                name:this.state.name,
                age:this.state.age,

            },
            // refetchQueries : [{query:getBookQuery}]
        })

    }
    render(){
        return (
            <div>
                <form className = 'New-form' onSubmit ={this.submitForm}>
                    {/* <h5>Add New author</h5> */}
                    <div className = 'field'>
                        <label>Name:</label>
                        <input type = "text" onChange= {(e)=> this.setState({name:e.target.name})}></input>

                    </div>
                    <div className = 'field'>
                        <label>age:</label>
                        <input type = "text" onChange= {(e)=> this.setState({age:e.target.age})}></input>

                    </div>

                    <button className = 'new-button'>Add New Author </button>

                </form>
            </div>
        )
    }
}

export default graphql(addAuthorMutation) (AddAuthor) 