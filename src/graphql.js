import gql from 'graphql-tag'

export const SIGNIN_MUTATION = gql`
  mutation($data: AUTH_PROVIDER_CREDENTIALS!) {
    signIn(credentials: $data) {
      token
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation($fullName: String!, $email: String!, $password: String!) {
    createUser(
      fullName: $fullName
      authProvider: { credentials: { email: $email, password: $password } }
    ) {
      id
      fullName
      email
    }

    signIn(credentials: { email: $email, password: $password }) {
      token
    }
  }
`

export const PRODUCTS_QUERY = gql`
  query {
    allProducts {
      id
      name
      description
      lowestBid
      startingBid
      expireBid
    }
  }
`

export const PRODUCT_QUERY = gql`
  query($id: ID!) {
    allProducts(filter: { idContains: $id }) {
      id
      name
      description
      lowestBid
      startingBid
      expireBid
    }
  }
`
export const ADD_PRODUCT_MUTATION = gql`
  mutation(
    $name: String!
    $description: String!
    $lowestBid: Int!
    $startingBid: Int!
    $expireBid: ISO8601Date!
  ) {
    createProduct(
      name: $name
      description: $description
      lowestBid: $lowestBid
      startingBid: $startingBid
      expireBid: $expireBid
    ) {
      name
      description
      lowestBid
      startingBid
      expireBid
    }
  }
`
