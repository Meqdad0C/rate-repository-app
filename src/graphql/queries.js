import { gql } from '@apollo/client'

export const ALL_REPOSIORIES = gql`
    query {
        repositories {
            edges {
                node {
                    {...REPOSITORY_FRAGMENT}
                }
            }
        }
    }
`
