const express = require("express"); // to use features in app
const { json } = require("express/lib/response");
const app = express(); // creates a new express app that functions as our serve
//const routes = require('./Routes/items')
app.use(express.json()); // instructs express to use JSON middleware

//const express = require('express');
// app = express();
const fileHandler = require("fs");

app.post("/projects", (req, res) => {
  console.log(req.body);

  fileHandler.readFile("data.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    else {
      // res.send(data)
      data = JSON.parse(data);
      data.push(req.body);
      //res.send(data)
      fileHandler.writeFile("data.json", JSON.stringify(data), (err) => {
        if (err) throw err;
        res.send(data);
      });
    }
  });
});

app.get("/api", function (req, res) {
  //console.log("get")

  fileHandler.readFile("data.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    else res.send(JSON.parse(data));
  });
});

app.put("/update", (req, res) => {
  let id = req.query.id;
  let title = req.query.title;
  let description = req.query.description;
  let url = req.query.url;

  fileHandler.readFile("data.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    //res.send()

    // res.send(`${JSON.parse(data)}`)
    let temp = JSON.parse(data);
    // res.send(`${id}  ${title} ${description} `)
    // res.send(`${id}  ${title} ${description} ${JSON.stringify(temp)}`)

    if (typeof id !== "undefined") {
      //console.log('id')

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == id) {
          console.log("id matches");
          if (typeof title != "undefined") {
            temp[i].title = title;
          }
          if (typeof description != "undefined") {
            temp[i].description = description;
          }
          if (typeof url != "undefined") {
            temp[i].url = url;
          }
          break;
        }
      }
    }
    // res.send(`${id}  ${title} ${description} ${JSON.stringify(temp)}`)
    fileHandler.writeFile("data.json", JSON.stringify(temp), (err) => {
      if (err) throw err;
      res.send({
        Status: true,
      });
    });
  });
});

app.delete("/:id", (req, res) => {
  // // fileHandler.unlink('data.json', (err) => {
  //     if (err) res.send('File not found. First post to create file.');
  //      else
  //        res.send('File deleted!');
  //  });
  fileHandler.readFile("data.json", (err, data) => {
    if (err) res.send("File not found. First post to create file.");
    else {
      let temp = JSON.parse(data);
      console.log(temp);
      let x = req.params.id;
      console.log(x);
      let index = -1;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == x) {
          index = i;
          res;
          break;
        }
      }
      if (index != -1) {
        temp.splice(index, 1);
      }
      //obtain id via query or parameters
      //look in the temp array to find that id
      //get the index of where this id is in the array
      //remove that particular item from the arrays
      //once removed (if found) save the array back to data.json
      fileHandler.writeFile("data.json", JSON.stringify(temp), (err) => {
        if (err) throw err;
        res.send(temp);
      });
    }
  });
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
