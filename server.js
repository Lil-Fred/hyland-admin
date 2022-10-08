require('dotenv').config()

const cookieParser = require("cookie-parser");
const express = require('express');
const csrf = require("csurf");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const path = require('path');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hypland-auth-default-rtdb.firebaseio.com"
});

const PORT = process.env.PORT || 5001;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, "views")));

const csrfMiddleware = csrf({ cookie: true });
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));



// Middleware
app.get('/', (req, res)=>{
    res.render('pages/index.ejs')
})



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})