const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const indexRoutes = require('./routes/indexRoutes');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./database/db');
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/auth', authRoutes);
app.use('/api/index', indexRoutes);


app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port ${process.env.PORT}`);
    } else {
        console.log(err);
    }
});