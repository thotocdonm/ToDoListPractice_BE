const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const User = sequelize.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    }
},{timestamps: true})

module.exports = User;