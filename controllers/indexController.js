
const cards1 = require('../dataBase/cardsHome.json')
const cards2 = require('../dataBase/cards2Home.json')
const detalhes = require('../dataBase/produtoDetalhes.json')
const {Produto} = require("../models");
const {produto} = require("../models");


module.exports = {
    home: async (req, res) =>{
        const cards2 = await Produto.findAll();
        res.render('home', {cards1, cards2, logged_user : req.session.user,  message: req.flash('message')});  
    },
    produtos: (req,res) => {
        res.render('produtos',{logged_user : req.session.user})
    },

    login: (req, res) =>{
        res.render('login' )
    },
    produtoDetalhes: async (req, res) =>{
        const p = await Produto.findByPk(req.params.id);
        let obj = { 
            id : p.id, 
            } 
        res.cookie("carrinho", obj)
        res.render('produtoDetalhes',{p:p, logged_user : req.session.user, detalhes})
    },
    search: async (req,res) =>{
        const busca = req.query.produto
        const cards = await Produto.findAll();
        let result = cards.filter(c => c.nome.toUpperCase().includes(busca.toUpperCase()));
        
        res.render('home', { cards2: result, logged_user : req.session.user,  message: req.flash('message')});  


    },
    getCategoria: async (req, res)=>{
        const {idCategoria} = req.params
        const cards2 = await Produto.findAll({where:{categoria: idCategoria}});
        res.render('home', {cards1, cards2, logged_user : req.session.user,  message: req.flash('message')});  
    }

}