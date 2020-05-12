const express    = require('express');
const fabric     = require('./fabric.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/users/:id', async (req, res) => {
    let network  = await fabric.connectToNetwork('admin');
    let response = await network.contract.evaluateTransaction('readUser', req.params.id);
                   await network.gateway.disconnect();
    res.send(response);
});

app.post('/users', async (req, res) => {
    let network  = await fabric.connectToNetwork('admin');
    let response = await network.contract.submitTransaction('createUser', req.body.id, req.body.value);
                   await network.gateway.disconnect();
    res.send(response);
});

app.listen(8081, () => console.log(`Server Started on PORT 8081`));