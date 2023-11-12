const express = require('express');
const graphqlHTTP = require('graphql-http');

const app = express();

app.use('/graphql', graphqlHTTP({

}));

app.listen(4000, () => {
    console.log('listening for requests on 4000 - test')
});