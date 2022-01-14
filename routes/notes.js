const notes = require('express').Router()
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const db = require("../db/db.json");

const uuid = require('../helpers/uuid')

notes.get("/", (req, res) => {
    console.info(`${req.method} request received for tips`);
    readFromFile("db/db.json").then((data) => res.json(JSON.parse(data)));
  });

notes.delete("/", (req, res) => {
  res.json(`${req.method} request received`);
  const {id} = req.params;
  const noteIndex = db.findIndex(note=>note.id === id)
  db.splice(noteIndex,1)
  console.log(db);
});

notes.post("/", (req, res) => {
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
      res.json(`${response.data.title} has been added!`);
    res.status(201).json(req.body);
  } else {
    res.status(500).json("Error in posting note");
  }
});
