// server.ts
import {ApolloServer} from 'apollo-server';
import {resolvers, typeDefs} from "./graphql";
import {myDataSource} from "./data/app-data-source";

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    });

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(),
    // cache: new InMemoryCache(),
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
}).catch((err: any) => {
    console.error("Error during server initialization:", err)
});