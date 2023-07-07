import { gql } from '@apollo/client'

export const ALL_REPOSIORIES = gql`
  query getAllRepositories {
    repositories {
      edges {
        node {
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
      }
    }
  }
`
