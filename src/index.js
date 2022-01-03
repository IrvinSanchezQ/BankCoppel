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
const Resgistro = require ('./models/ClientModel');
const { body, validationResult } = require('express-validator');

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

//mongodb connection
connectDB();
//Settings

//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({extended: false}));

//contenido estatico mostrado y solicitado por node
app.use(express.static(path.join(__dirname, 'public')));

//aqui creamos la conexion con el frond end o formularios
//min 17 https://www.youtube.com/watch?v=GlvpYCEEcVQ
app.post('/registroUsuario', (req, res) => {
    const {Nombre,APaterno,AMaterno,Email,password,IdCliente, Direccion,Telefono,ciudad,Estado,CodigoPostal} = req.body;
    const registro = new Resgistro({Nombre,APaterno,AMaterno,Email,password,IdCliente, Direccion,Telefono,ciudad,Estado,CodigoPostal});
    registro.save(err =>{
        if(err){
            res.status(500).send('error al resgistrar al usuario');
        }else{
            res.status(200).send('usuario registrado');
        }
    });
});
app.post('/iniciosesion', (req, res) => {
    const {IdCuenta,password} = req.body;
    
    Resgistro.findOne({IdCuenta}, (err, registro) =>{
        if(err){
            res.status(500).send('erro al validar la cuenta');
        }else if(!registro){
            res.status(500).send('el usuario no existe');
        }else{
            registro.isCorrectPassword(password,(err, result) =>{
                if(err){
                    res.status(500).send('Error al autenticar');
                }else if(result){
                    res.status(200).send('usuario autenticado correctamente');
                }else{
                    res.status(500).send('usuario y/o contraseña incorrectos')
                }
            });
        }
    });
});
//  app.post('/registroUsuarioValidado',[
//      body('Nombre', 'ingresa un nombre valido')
//         .exists()
//         .isLength({min:3}),
//      body('APaterno','ingresa un apellido valido 1')
//         .exists()
//         .isLength({min:3}),
//      body('AMaterno','ingresa un apellido valido 2')
//         .exists()
//         .isLength({min:3}),
//      body('Email', 'ingresa un email valido')
//          .exists()
//          .isEmail(),
//      body('password', 'ingesa una contraseña valida')
//          .exists()
//          .isStrongPassword(),
//      body('Direccion', 'ingresa una direccion valida')
//          .exists()
//          .isString(),

//      body('Telefono', 'ingresa un telefono valido')
//         .exists()
//         .isMobilePhone(),
//      body('ciudad', 'ingrese el nombre de la ciudad donde habita')
//         .exists()
//         .isString(),
//      body('Estado', 'seleccione un estado')
//          .exists()
//          .isString(),
//      body('CodigoPostal', 'seleccione un numero postal valido')
//         .exists()
//         .isLength({max:5})
//         .isLength({min:5})
//  ],(req,res)=>{
//     const errores = validationResult(req)
//     if(!errores.isEmpty()){
//         Console.log(req.body)
//         const valores = req.body
//         const validaciones = errores.array()
//         //aqui se añade la renderizacion de la paguina con errores
//         //res.render('index', {validaciones:validaciones, valores:valores})
//     }else{
//         res.send('¡¡validacion exitosa!!')
//     }
//  });

/*aqui estaba bien broder
app.get('/', (req, res) => {
});*/
//ROUTES
//app.use('registroUsuario.html',require('src/public/registroUsuario.html'));
app.use(require('./routes/index'));
//app.use('/api/movies',require('./routes/movies'));
app.use('/transacciones', transaccionesRouters);
 
//starting the server
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});
module.exports = app;
