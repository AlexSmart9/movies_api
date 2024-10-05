const { DataTypes } = require('sequelize')
const sequalize = require('../utils/connection')

const Genre = sequalize.define('genre', {
    name: {
        type: DataTypes.STRING,
        allownull: false
    }
})

module.exports = Genre