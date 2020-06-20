if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const indexRouter = require('./routes/index.js')


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout',path.join(__dirname,'views','layouts','layout'));
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true });
const db = mongoose.connection;
db.on('error', error=> console.error(error));
db.once('open', ()=>console.log('Connected to mongoose'));

app.use('/',indexRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});