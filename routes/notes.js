const notes = require('express').Router()
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require("fs");
const db = require("./db/db.json");

const uuid = require('./helpers/uuid')

notes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/routes/notes.js"))
);

notes.get("/", (req, res) => {
  return res.json(db);
});

notes.delete("/", (req, res) => {
  res.json(`${req.method} request received`);
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
    //   res.json(`${response.data.title} has been added!`);
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(`Error reading file`, err);
      } else {
        finalData = JSON.parse(data);
        finalData.push(newNote);
        console.log(finalData);
        // Write the string to a file
        fs.writeFile(
          `./db/db.json`,
          JSON.stringify(finalData, null, 4),
          (err) =>
            err
              ? console.error(err)
              : console.log(`${newNote.title} has been written to JSON file`)
        );
      }
    });
    res.status(201).json(req.body);
  } else {
    res.status(500).json("Error in posting note");
  }
});
