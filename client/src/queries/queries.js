import {gql} from 'apollo-boost'

const getBookQuery = gql`

{
    books{
        name
        id
    }
} `

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}`

const addBookMutation = gql`
mutation($name:String!,$genre:String!$authorid: ID!) {
    addBook(name:$name,genre:$genre,authorid:$authorid){
        name
        id
    }
}
`

export {getAuthorsQuery,getBookQuery,addBookMutation};