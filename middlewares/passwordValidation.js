const { check } = require('express-validator')
const {Usuario, sequelize} = require("../models");
const bcrypt = require('bcrypt');
module.exports = {
  
    validatePassword: check('password')
  
        .isLength(5)
        .notEmpty()
        .withMessage("senha deve conter ao menos 5 caracteres")

        // Custom validation
        // Validate email in use or not

        .custom(async (password, {req}) => {
            const email = req.body.email
            const usuario = await Usuario.findOne({ where: { email: email} })
        
            // If password and confirm password not same
            // don't allow to sign up and throw error
            if (!bcrypt.compareSync(password, usuario.senha)){
                throw new Error('Senha incorreta')
            }        
          }),
        
}