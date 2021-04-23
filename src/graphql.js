import gql from 'graphql-tag'

export const SIGNIN_MUTATION = gql`
  mutation($data: SIGNIN_CREDENTIALS!) {
    signIn(credentials: $data) {
      token
      user {
        id
        fullName
        admin
      }
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation(
    $fullName: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    createUser(
      fullName: $fullName
      authProvider: {
        credentials: {
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        }
      }
    ) {
      id
      fullName
      email
    }

    signIn(credentials: { email: $email, password: $password }) {
      token
      user {
        id
        fullName
        admin
      }
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
      stopBid
      createdAt
      bids {
        id
        bidAmount
        status
        createdAt
        user {
          fullName
          email
        }
      }
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
      stopBid
      expireBid
      createdAt
      bids {
        id
        bidAmount
        status
        createdAt
        user {
          fullName
          email
        }
      }
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
      createdAt
    }
  }
`

export const ADD_BID_MUTATION = gql`
  mutation($productId: ID!, $bidAmount: Int!, $userId: ID!) {
    createBid(productId: $productId, userId: $userId, bidAmount: $bidAmount) {
      id
      bidAmount
      product {
        name
        description
        lowestBid
        startingBid
        expireBid
        createdAt
      }
      user {
        fullName
        email
      }
    }
  }
`
export const CURRENT_USER_QUERY = gql`
  query($id: ID!) {
    allUsers(filter: { idContains: $id }) {
      id
      fullName
      email
      bids {
        id
        bidAmount
        status
        createdAt
        product {
          name
          description
        }
      }
    }
  }
`
export const BID_WINNER_MUTATION = gql`
  mutation($bidId: ID!, $productId: ID!) {
    bidWinner(bidId: $bidId, productId: $productId) {
      id
      bidAmount
      status
    }
  }
`

export const STOP_BIDDING_MUTATION = gql`
  mutation($productId: ID!) {
    stopBid(productId: $productId) {
      id
      name
      description
      stopBid
    }
  }
`
export const USERS_QUERY = gql`
  query {
    allUsers {
      id
      fullName
      email
      admin
      createdAt
      bids {
        id
      }
    }
  }
`
export const DELETE_PRODUCT_MUTATION = gql`
  mutation($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
      name
      description
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation($userId: ID!) {
    deleteUser(userId: $userId) {
      id
      fullName
      email
    }
  }
`
export const UPDATE_PRODUCT_MUTATION = gql`
  mutation(
    $productId: ID!
    $name: String!
    $description: String!
    $lowestBid: Int!
    $startingBid: Int!
    $expireBid: ISO8601Date!
  ) {
    updateProduct(
      productId: $productId
      name: $name
      description: $description
      lowestBid: $lowestBid
      startingBid: $startingBid
      expireBid: $expireBid
    ) {
      id
      name
      description
      lowestBid
      startingBid
      expireBid
      stopBid
    }
  }
`

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation($userId: ID!, $password: String!, $passwordConfirmation: String!) {
    updatePassword(
      userId: $userId
      authProvider: {
        credentials: {
          password: $password
          passwordConfirmation: $passwordConfirmation
        }
      }
    ) {
      id
      fullName
      email
    }
  }
`
export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation($userId: ID!, $fullName: String!, $email: String!) {
    updateUser(userId: $userId, fullName: $fullName, email: $email) {
      id
      fullName
      email
      admin
    }
  }
`
