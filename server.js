if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser=require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/authors.js');
const bookRouter = require('./routes/books.js');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout',path.join(__dirname,'views','layouts','layout'));
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}));

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true });
const db = mongoose.connection;
db.on('error', error=> console.error(error));
db.once('open', ()=>console.log('Connected to mongoose'));

app.use('/',indexRouter);
app.use('/authors',authorRouter);
app.use('/books',bookRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});