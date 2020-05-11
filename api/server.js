const express = require('express');
const fabric  = require('./fabric.js');

const app = express();

app.get('/users/:id', async (req, res) => {
    let network  = await fabric.connectToNetwork('admin');
    let response = await network.contract.evaluateTransaction('readUser', req.params.id);
    let json     = await JSON.parse(response);
                   await network.gateway.disconnect();
    res.send(json);
});

app.listen(8081, () => console.log(`Server Started on PORT 8081`));