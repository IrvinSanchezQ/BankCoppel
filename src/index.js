const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const transaccionesRouters = require('./routes/transacciones');
const connectDB = require('./database/connection');
const app = express();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

//conexion este archivpo sirve de servidor de rutas o algo asi 
//var mongoose = require('mongoose')
// var User = require('./User')
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/database', {useMongoClient: true})
// var db = mongoose.connection
// db.on('error', function(err){
// console.log('connection error', err)
// })
// db.once('open', function(){
//   console.log('Connection to DB successful')
// })

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/3000', {
//     useMongoClient: true
// })  .then(db => console.log('db is connected'))
//     .catch(err => console.log(err));

// mongo_url = mongodb+srv://ADMIN:ADMIN123EIF@cluster0.8iasn.mongodb.net/BanCoppelDB?retryWrites=true&w=majority
//mongodb connection
connectDB();
//Settings
//app.set('port', process.env.PORT || 3000);

//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: true}));
//diosito help
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
});
//ROUTES
//app.use('registroUsuario.html',require('src/public/registroUsuario.html'));
app.use(require('./routes/index'));
//app.use('/api/movies',require('./routes/movies'));
app.use('/transacciones', transaccionesRouters);
 
//starting the server
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});
module.exports = app;
