import { gql } from '@apollo/client'

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`
