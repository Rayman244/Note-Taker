const note = require('express').Router()
const { readAndAppend } = require('../helpers/fsUtils');
const db = require("../db/db.json");
const fs = require('fs')

const uuid = require('../helpers/uuid')
note.get("/", (req, res) => {
  return res.json(db);
});

  note.delete("/:id", (req, res) => {
    res.json(`${req.method} request received`);
    const {id} = req.params;
    const noteIndex = db.findIndex(note=>note.id === id)
    db.splice(noteIndex,1)
    fs.writeFile(
      `./db/db.json`,
      JSON.stringify(db, null, 4),
      (err) =>
        err
          ? console.error(err)
          : console.log(`${id} has been removed to JSON file`)
    );
  });
  
  note.post("/", (req, res) => {
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
  module.exports = note