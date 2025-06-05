const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const List = sequelize.define('List',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    boardId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false
    },
},{timestamps: true,paranoid:true})


module.exports = List;