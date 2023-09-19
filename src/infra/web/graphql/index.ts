import { makeExecutableSchema } from "@graphql-tools/schema";
import schemas from "./schemas/schemas";
import resolvers from "./resolvers/resolvers";

const schema = makeExecutableSchema({
    typeDefs: schemas,
    resolvers,
})

export default schema;