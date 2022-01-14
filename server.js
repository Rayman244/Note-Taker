const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 3002;

const db = require("./db/db.json");

const uuid = require('./helpers/uuid')
const { readAndAppend } = require('./helpers/fsUtils');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  return res.json(db);
});

app.delete("/api/notes/:id", (req, res) => {
  res.json(`${req.method} request received`);
  const {id} = req.params;
  const noteIndex = db.findIndex(note=>note.id === id)
  db.splice(noteIndex,1)
  console.log(db);
  fs.writeFile(
    `./db/db.json`,
    JSON.stringify(db, null, 4),
    (err) =>
      err
        ? console.error(err)
        : console.log(`${id} has been removed to JSON file`)
  );
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received`);
  let response;
  const { title, text } = req.body;
  if (title && text) {
    response = {
      status: "success",
      data: req.body,
    };
    const newNote = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(newNote,"./db/db.json")

    res.status(201).json(req.body);
  } else {
    res.status(500).json("Error in posting note");
  }
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
