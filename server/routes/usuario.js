const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion')

app.get('/usuario', verificaToken,(req, res)  =>{

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);

    Usuario.find({ estado: true }, 'nombre email role google')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                });
            });
        });
})

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioBD
        });

    });
})

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    });
})

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, borrado) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, borrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!borrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: borrado
        })

    });
})

module.exports = app;