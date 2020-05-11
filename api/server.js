const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8081, () => console.log(`Server Started on PORT 8081`));