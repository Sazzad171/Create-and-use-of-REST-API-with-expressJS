const express = require('express');
// for take data from html file
const path = require('path');
// express handlebars linkup
const exphbs = require('express-handlebars');
// middleware linkup
const logger = require('./middleware/logger');
// Member file call
const members = require('./Members');

const app = express();



// handlebars middleware start
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// handlebars middleware end


// body parser middleware start
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// body parser middleware end


// homepage route
app.get('/', (req,res) => res.render('index', {
  title: 'Member App',
  members
}));


// static data show by express (set static folder)
app.use(express.static(path.join(__dirname, 'public')));


// members api route
app.use('/api/members', require('./routes/api/members'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));