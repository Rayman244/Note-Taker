const express = require('express');
const path = require('path');
const db = require('./db/db.json')

const PORT = 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));
  app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => {
    return res.json(db);
});

app.delete('/api/notes/:id',(req,res)=>{
    res.json(`${req.method} request received`);
  })

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    let response;

    if (req.body && req.body.title) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.json(`${response.data.title} has been added!`);
    } else {
      res.json('Request body must at least contain a product name');
    }
    return req.body
  });



app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
