const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es rol válido'
};

let usuarioSchema =  new Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
        
    },
    password:{
        type: String,
        required: [true, 'El password es necesario']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum:rolesValidos,
        required: [true, 'El correo es necesario']
    },
    estado:{
        default: true,
        type: Boolean,
        required: [true, 'El correo es necesario']
    },
    google:{
        default: false,
        type: Boolean,
        required: [true, 'El correo es necesario']
    }
});

usuarioSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
//usuarioSchema.plugin(uniqueValidator, { message: 'Error, El {PATH} debe ser único.' });

module.exports = mongoose.model('Usuario', usuarioSchema);
