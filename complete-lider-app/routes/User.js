const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');

const signToken = userID => {
    return JWT.sign({
        iss : "NoobCoder",
        sub : userID
    }, "NoobCoder", { expiresIn: "1h"});
}


userRouter.post('/register', (req, res) => {
    const { firstname, lastname, username, email, phone, password, role, branchoffice } = req.body;
    User.findOne({ username }, (err, user)=>{
        if(err)
            res.status(500).json({ message: { msgBody : "Ocurrió un error", msgError : true }});
        if(user)
            res.status(400).json({ message : { msgBody : "El usuario ya existe", msgError : true }});
        else {
            const newUser = new User({ firstname, lastname, username, email, phone, password, role, branchoffice });
            newUser.save(err => {
                if(err)
                    res.status(500).json({ message: { msgBody : "Ocurrio un error", msgError : true }});
                else
                res.status(201).json({ message: { msgBody : "Cuenta creada correctamente", msgError : false }});
            });
        };
    });
});



userRouter.post('/login', passport.authenticate('local', { session : false }), (req, res) => {
    if(req.isAuthenticated()){
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated : true,user : {username, role}});
    };
});


userRouter.get('/logout', passport.authenticate('jwt', { session : false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username : "", role : "" }, success : true });
});

userRouter.post('/todo', passport.authenticate('jwt', { session : false }), (req, res) => {
    const todo = new Todo(req.body);
    todo.save(err => {
        if(err)
            res.status(500).json({ message: { msgBody : "UnAuthorized", msgError : true}});
        else{
            req.user.todos.push(todo);
            req.user.save(err => {
                if(err)
                    res.status(500).json({ message: { msgBody : "Ocurrió un error", msgError : true}});
                else
                    res.status(200).json({ message: { msgBody : "Creado correctamente", msgError : false}})
            });
        }
    })
});

userRouter.get('/todos', passport.authenticate('jwt', { session : false }), (req, res) => {
    User.findById({
        _id: req.user._id
    }).populate('todos').exec((err, document) => {
        if(err)
            res.status(500).json({ message: { msgBody : "Ocurrió un error", msgError : true}});
        else {
            res.status(200).json({ todos: document.todos, authenticated : true});
        }

    })
});


userRouter.get('/admin', passport.authenticate('jwt', { session : false }), (req, res) => {
    if(req.user.role === 'administrator') {
        res.status(200).json({ message : { msgBody : "Bienvenido administrador", msgError : false}});
    }
    else 
        res.status(403).json({ message : { msgBody : "No tienes permiso de administrador", msgError : true}});
});

userRouter.get('/authenticated', passport.authenticate('jwt', { session : false }), (req, res) => {
    const { username, role} = req.user;
        res.status(200).json({ isAuthenticated : true, user : { username, role}});
});

module.exports = userRouter; 