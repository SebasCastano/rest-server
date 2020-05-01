const jwt = require('jsonwebtoken');

//=================
//Verificar token
//=================

let verificaToken = (req, res, next) =>{

    let token = req.get('token');
    jwt.verify(token, process.env.SEDD, (err, decoded) =>{
        if(err){
            return res.status(401).json({
                ok: false,
                err:{
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })   
};


//================
//Verificar admin rol
//================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;
    if(!(usuario.role === 'ADMIN_ROLE')){
        return res.status(401).json({
            ok: false,
            err:{
                message: 'Rol de usuario no valido'
            }
        })
    }
    next();
};



module.exports = {
    verificaToken,
    verificaAdminRole
}