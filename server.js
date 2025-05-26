const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Book = require("./Book");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/books", async (req, res) => {
  await Book.find()
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      return res.status(404).send("cannot get the books");
    });
});

app.post("/books", async (req, res) => {
  const { title, author, price, publishedDate } = req.body;
  if (!title || !author || !price || !publishedDate) {
    return res.status(500).send("Enter all details");
  }
  const newBook = new Book({ title, author, price, publishedDate });
  await newBook
    .save()
    .then(() => {
      res.status(201).send("saved");
    })
    .catch((err) => {
      res.status(500).send("cannot save the book");
    });
});

app.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, price, publishedDate } = req.body;
  const upd = await Book.findByIdAndUpdate(
    id,
    { title, author, price, publishedDate },
    { new: true }
  );
  try {
    if (!upd) {
      return res.status(404).send("cannot find the book");
    }
    res.status(200).send("updated");
  } catch (err) {
    res.status(500).send("cannot find the book and update");
  }
});

app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  const del = await Book.findByIdAndDelete(id);
  try {
    if (!del) {
      return res.status(404).send("cannot find the book");
    }
    res.status(200).send("deleted");
  } catch (err) {
    res.status(500).send("cannot find the book and delete");
  }
});

app.listen(3000, () => {
  mongoose
    .connect("mongodb://localhost:27017/BookstoreAPI")
    .then(() => {
      console.log("listening");
    })
    .catch((err) => {
      console.log(err);
    });
});
