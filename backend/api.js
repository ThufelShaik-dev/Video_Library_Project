let mongoClient = require("mongodb").MongoClient;
let express = require("express");
let cors = require("cors");
let app = express();
let conStr = "mongodb://127.0.0.1:27017";
let database = "react-videoLibrary-database";
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// ROUTES

app.get("/admin", (req, res) => {
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("admin")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/videos", (req, res) => {
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("videos")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/categories", (req, res) => {
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("categories")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/video/:id", (req, res) => {
  let id = parseInt(req.params.id);
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("videos")
      .find({ VideoId: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/videos/:categoryid", (req, res) => {
  let cId = parseInt(req.params.categoryid);
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("videos")
      .find({ CategoryId: cId })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.get("/users", (req, res) => {
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("users")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/register-user", (req, res) => {
  var userDetails = {
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Mobile: req.body.Mobile,
    Email: req.body.Email,
  };
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("users")
      .insertOne(userDetails)
      .then(() => {
        console.log("user Added!");
        res.end();
      });
  });
});

app.post("/add-video", (req, res) => {
  var videoDetails = {
    VideoId: parseInt(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: parseInt(req.body.Likes),
    Dislikes: parseInt(req.body.Dislikes),
    Views: parseInt(req.body.Views),
    CategoryId: parseInt(req.body.CategoryId),
  };
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("videos")
      .insertOne(videoDetails)

      .then(() => {
        console.log("video Added!");
        res.end();
      });
  });
});

app.put("/edit-video/:id", (req, res) => {
  let id = parseInt(req.params.id);
  var videoDetails = {
    VideoId: parseInt(req.body.VideoId),
    Title: req.body.Title,
    Url: req.body.Url,
    Likes: parseInt(req.body.Likes),
    Dislikes: parseInt(req.body.Dislikes),
    Views: parseInt(req.body.Views),
    CategoryId: parseInt(req.body.CategoryId),
  };
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("videos")
      .updateOne({ VideoId: id }, { $set: videoDetails })

      .then(() => {
        console.log("video Updated!");
        res.end();
      });
  });
});

app.delete("/delete-video/:id", (req, res) => {
  let id = parseInt(req.params.id);
  mongoClient.connect(conStr).then((clientObj) => {
    let db = clientObj.db(database);
    db.collection("videos")
      .deleteOne({ VideoId: id })
      .then(() => {
        console.log("video Deleted");
        res.end();
      });
  });
});

app.listen("2222");
console.log("your server started at http://127.0.0.1:2222");
