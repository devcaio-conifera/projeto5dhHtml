const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs= require('fs')
const usuarios = require('../dataBase/usuarios.json')
const { body, validationResult } = require('express-validator');
const path = require('path');
const cards1 = require('../dataBase/cardsHome.json')
const cards2 = require('../dataBase/cards2Home.json')


module.exports = {
    logUser:  (req, res) => {
        console.log('entrou na requisicao')
        const { email, password } = req.body;
        console.log( email, password)
      /*   try {
            validationResult(req).throw();
            // Oh look at ma' success! All validations passed!
        } catch (err) {
            console.log(err.mapped()); // Oh noes!
            const erros = validationResult(req);
            //se tiver erros manda de volta o erro
            res.redirect("/login?error=1")
        }
 */
        const listaDeErrors = validationResult(req);
        if (!listaDeErrors.isEmpty()) {
          /*   req.flash('errors', errors.array())
            console.log(errors) */
            res.render('login', {errors: listaDeErrors.errors});
        }

        const usuario = usuarios.find( u => u.email == email)
        // req.session.user = usuario
        // req.session.save();
        // console.log(req.session.user)

        if(typeof(usuario) === "undefined"){
            // req.session.destroy();
            res.redirect("/login?error=usuarioInexistente")
            
        } else  if (!bcrypt.compareSync(password , usuario.password)){
            // req.session.destroy();
            res.redirect("/login?error=senhaIncorreta")
        } else{
            req.session.user = usuario
            req.session.save();
            console.log(req.session.user)
            res.redirect("/home")
        }
    },

    logout: (req, res) =>{
        req.session.destroy();
        res.redirect("/home")

    },

    // userView: (req, res, next) =>{
    //     console.log(req.session.user)
    //     res.render('home', {cards1, cards2, logged_user : req.session.user})
    // },
    createUser:  (req, res) => {
        

        const { email, password } = req.body;
        const listaDeErrors = validationResult(req);
        if (!listaDeErrors.isEmpty()) {
            res.render('login', {errors1: listaDeErrors.errors});
        }
        const SenhaHash = bcrypt.hashSync(password, saltRounds)
        const usuario = usuarios.find( user => user.email == email)
        if(typeof(usuario) !== "undefined"){
            res.redirect("/login?error=usuariojaexiste")
        }else {
            let novoUsuario = {
                nome:email,
                email:email,
                password: SenhaHash,
                clearance: "usuarioComum"
            }

            usuarios.push(novoUsuario)
            // fs.writeFileSync(path.join(__dirname, "../database/usuarios.json"), JSON.stringify(novoUsuario, null, 1));
            fs.writeFileSync(path.join(__dirname, "../database/usuarios.json"), JSON.stringify(usuarios,null,1));
            const usuario = usuarios.find( user => user.email == email)
            req.session.user = usuario
            console.log(req.session.user)
            res.redirect('/home')
            }

        
    }
} 