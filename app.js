const express = require('express');
// import { createHandler } from 'graphql-http/lib/use/http';
const { createHandler }  = require('graphql-http/lib/use/http');
const expressPlayground = require('graphql-playground-middleware-express').default;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', createHandler({
    schema: schema // or just schema
}));

/*
send at the playground endpoint  

as such
{ book(id: "2") { // note must be double quotes 
  name
  genre
}
}
*/
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(4000, () => {
    console.log('listening for requests on 4000 - test')
});