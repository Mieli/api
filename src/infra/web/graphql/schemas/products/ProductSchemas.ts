import { gql } from "apollo-server-express";

const productSchema = gql`
    type Product {
       _id: ID
       name: String
       price: Float!
       stock: Float
    } 

    type Query {
        getProduct(id: ID!): Product
        getAllProducts: [Product]
    }

    type Mutation {
        createProduct(name: String!, price: Float!, stock: Float): Product
        updateProduct(id: ID!, name: String!, price: Float!, stock: Float): Product
        deleteProduct(id: ID!): Boolean
    }
`;

export default productSchema;