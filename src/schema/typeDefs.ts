
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
type Category {
    id: ID!,
    name: String!
    plants: [Plant!]
}

type Plant {
    id: ID!
    name: String!
    description: String
    image: String
    cost: String
    category: Category!
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "plants" query returns an array of zero or more Plants (defined above).
type Query {
    categories: [Category!]
    category(id: ID!): Category
    plants: [Plant!]
    plant(id: ID!): Plant
}
`;