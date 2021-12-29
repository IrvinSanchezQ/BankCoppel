const mongoose = require('mongoose');
 //const Schema = mongoose.Schema;

const  clienteSchema = new mongoose.Schema ({
    Nombre: String,
    APaterno:String,
    AMaterno:String,
    Email: String,
    IdCliente: String,
    FechaNacimiento: String,
    Nip: String
    //,IdCuenta
});

module.exports = mongoose.model('Clientdb', clienteSchema);
   
