const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const Board = sequelize.define('Board',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    ownerId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false
    },
},{timestamps: true,paranoid:true})

module.exports = Board;