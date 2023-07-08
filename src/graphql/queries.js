import { gql } from '@apollo/client'

export const ALL_REPOSIORIES = gql`
  query getAllRepositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          url
        }
      }
    }
  }
`

export const SINGLE_REPOSITORY = gql`
  query getSingleRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const AUTHORIZED_USER = gql`
  query Me {
    me {
      username
    }
  }
`
