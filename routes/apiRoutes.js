const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const router = express.Router();

const db = require('../models');

const apiKey = process.env.API_KEY;
const queryUrl = "https://www.googleapis.com/books/v1/volumes?q=";
let data = {};

// Search Handle
router.get("/search/:query", async (req, res) => {
    const searchTerm = req.params.query;

    await axios.get(`${queryUrl}${searchTerm}&${apiKey}`)
        .then(res => {
            data = res.data.items;
        })
        .catch(err => console.log(err));

    res.send(data);
});

// Save Handle
router.post("/save/:id", async (req, res) => {
    const searchTerm = req.params.id;

    await axios.get(`${queryUrl}${searchTerm}&${apiKey}`)
        .then(res => {
            data = res.data.items;
        })
        .catch(err => console.log(err));

    db.Books.findOne({ id: data[0].id })
        .then(book => {
            if (book) {
                res.send({ status: "notSaved", msg: "Book already saved" })
            } else {
                db.Books.create({
                    id: data[0].id,
                    title: data[0].volumeInfo.title,
                    image: data[0].volumeInfo.imageLinks.thumbnail,
                    authors: data[0].volumeInfo.authors,
                    description: data[0].volumeInfo.description,
                    link: data[0].volumeInfo.canonicalVolumeLink
                }, (err, book) => {
                    if (err) throw err;
                    res.send({ status: "saved", msg: "Book saved" });
                });
            }
        })
        .catch(err => console.log(err));
});

// Search DB Handle
router.get("/saved_books", (req, res) => {
    db.Books.find({})
        .then(dbData => {
            res.send(dbData);
        })
        .catch(err => console.log(err));
});

// Delete Handle
router.delete("/delete/:id", (req, res) => {
    const bookId = req.params.id;

    db.Books.deleteOne({ id: bookId })
        .then(book => {
            if (book) {
                res.send({ status: "200", id: bookId });
            }
        })
        .catch(err => console.log(err));
})

module.exports = router;