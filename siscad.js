const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Cad = require('./models/Cad')



//Config
    //Template Engine
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Body-parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

//Rotas
    app.get('/', function(req, res){
        res.render('home')
    })
    app.get('/formscad', function(req, res){
        res.render('formscad')
    })
    app.post('/submitcad', function(req, res){
        Cad.findOne({where: {usuario: req.body.user}}).then(function(cad){
            if (cad === null){
                Cad.create({
                    nome: req.body.nome,
                    sexo: req.body.sexo,
                    datanascimento: req.body.nasc,
                    email: req.body.email,
                    telefone: req.body.phone,
                    altura: req.body.altura,
                    peso: req.body.peso,
                    hipertrofia: req.body.hipertrofia ? true : false,
                    resistencia: req.body.resistencia ? true : false,
                    definicao: req.body.definicao ? true : false,
                    emagrecimento: req.body.emagrecimento ? true : false,
                    observacoes: req.body.obs,
                    usuario: req.body.user,
                    senha: req.body.pass
                }).then(function(){
                    res.render('submit', {title: 'FORMULÁRIO DE CADASTRO', msg: 'Cadastro realizado com sucesso!'})
                }).catch(function(error){
                    res.send('Erro na criação do cadastro:', error)
                })
            } else {
                res.render('submit-elog', {title: 'FORMULÁRIO DE CADASTRO', msg: 'Nome de usuário já existe! Tente novamente!'})
            }
        })
    })
    app.get('/login', function(req, res){
        res.render('login')
    })
    app.post('/validatelogin', function(req, res){
        Cad.findOne({where: {usuario: req.body.username}}).then(function(rUser){
            if(rUser === null){
                res.render('submit-elog', {title: 'PÁGINA DO USUÁRIO', msg: 'Usuário ou senha incorretos! Tente novamente!'})
            } else {
                if(rUser.senha === req.body.password){
                    res.render('user', {
                        rUser: rUser,
                        r_hipertrofia: rUser.hipertrofia?'Sim':'Não',
                        r_definicao: rUser.definicao?'Sim':'Não',
                        r_resistencia: rUser.resistencia?'Sim':'Não',
                        r_emagrecimento: rUser.emagrecimento?'Sim':'Não'
                    })    
                } else {
                    res.render('submit-elog', {title: 'PÁGINA DO USUÁRIO', msg: 'Usuário ou senha incorretos! Tente novamente!'})
                }    
            }
        })    
    })
    app.post('/changecad', function(req, res){
        Cad.findOne({where: {usuario: req.body.username}}).then(function(rUser){
            res.render('changecad', {
                rUser: rUser,
                r_hipertrofia: rUser.hipertrofia?'checked':'',
                r_definicao: rUser.definicao?'checked':'',
                r_resistencia: rUser.resistencia?'checked':'',
                r_emagrecimento: rUser.emagrecimento?'checked':'',
                r_masc: rUser.sexo == 'masculino'?'selected':'',
                r_fem: rUser.sexo == 'feminino'?'selected':''
            })
        })
    })
    app.post('/submitchangecad', function(req, res){
        Cad.findOne({where: {usuario: req.body.user}}).then(function(rUser){
            if(rUser == null || req.body.user == req.body.userold){
                Cad.update({
                    nome: req.body.nome,
                    sexo: req.body.sexo,
                    datanascimento: req.body.nasc,
                    email: req.body.email,
                    telefone: req.body.phone,
                    altura: req.body.altura,
                    peso: req.body.peso,
                    hipertrofia: req.body.hipertrofia ? true : false,
                    resistencia: req.body.resistencia ? true : false,
                    definicao: req.body.definicao ? true : false,
                    emagrecimento: req.body.emagrecimento ? true : false,
                    observacoes: req.body.obs,
                    usuario: req.body.user,
                    senha: req.body.pass
                }, {where: {usuario: req.body.userold}}).then(function(){
                    res.render('submit', {title: 'PÁGINA DO USUÁRIO', msg: 'Dados atualizados com sucesso!'})
                }).catch(function(error){
                    res.send('Erro na alteração dos dados cadastrais:', error)
                }) 
            } else {
                res.render('submit-elog', {title: 'PÁGINA DO USUÁRIO', msg: 'O nome de usuário já existe! Tente novamente!'})
            }
        })
    })
    app.post('/confirmdelcad', function(req, res){
        res.render('delcad', {username: req.body.username})
    })
    app.post('/delcad', function(req, res){
        Cad.destroy({where: {usuario: req.body.username}}).then(function(){
            res.render('submit', {title: 'PÁGINA DO USUÁRIO', msg: 'O cadastro foi excluído com sucesso!'})
        }).catch(function(error){
            res.send('Erro na exclusão do cadastro:', error)
        })
    })
    
app.listen(3000, function(){console.log('Servidor rodando na porta 3000!')})
