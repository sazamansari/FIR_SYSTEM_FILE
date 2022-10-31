const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

// Connect DB
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(console.log('MongoDB connected'))
    .catch(err => console.log(err));

// API Routes
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
    // server index.html if `/about` reached -> assets served through `express.static`
    app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "./client/build/index.html"))
    );
} else {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}

// Connect Express Server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});