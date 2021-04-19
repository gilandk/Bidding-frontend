import gql from 'graphql-tag'

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
