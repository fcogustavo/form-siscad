const Sequelize = require('sequelize')

//Conexão com o Banco de Dados MySQL
const sequelize = new Sequelize('sistemadecadastros', 'root', 'senha', {
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}