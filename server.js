const express = require("express");
const app = express();
const path = require("path");
// const fs = require("fs");
const PORT = 3002;

const api = require('./routes/index.js');


// const db = require("./db/db.json");

// const uuid = require('./helpers/uuid')



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api', api);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/routes/index.js")));
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  return res.json(db);
});

app.delete("/api/notes/:id", (req, res) => {
  res.json(`${req.method} request received`);
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

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
