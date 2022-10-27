const db = require('./db')

const Cad = db.sequelize.define('Cadastros', {
    //  Definições de Cadastro
    nome: {
        type: db.Sequelize.STRING
    },
    sexo: {
        type: db.Sequelize.STRING
    },
    datanascimento: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    altura: {
        type: db.Sequelize.INTEGER
    },
    peso: {
        type: db.Sequelize.INTEGER
    },
    hipertrofia: {
        type: db.Sequelize.BOOLEAN
    },
    resistencia: {
        type: db.Sequelize.BOOLEAN
    },
    definicao: {
        type: db.Sequelize.BOOLEAN
    },
    emagrecimento: {
        type: db.Sequelize.BOOLEAN
    },
    observacoes: {
        type: db.Sequelize.TEXT
    },
    //  Definições de login
    usuario: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    }
})

//Cad.sync({force: true}) //utilizar uma única vez (para criação do Model "Cad").

module.exports = Cad