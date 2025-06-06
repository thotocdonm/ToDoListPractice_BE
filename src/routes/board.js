const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('../middleware/authenticationToken');

const Board = require('../models/Board');
const response = require('../helper/response');

router.post('/',authenticateToken, async (req, res, next) => {
    try {
        const {title} = req.body;
        const data = await Board.create({title,ownerId:req.user.id});
        return response(res, next, 201, "Board created", "SUCCESS", data);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.get('/',authenticateToken, async (req, res, next) => {
    try {
        const { ownerId } = req.query;
        const where = {};

        if (ownerId) {
            where.ownerId = ownerId;
        }

        const boards = await Board.findAll({where});
        return response(res, next, 200, "Boards retrieved", "SUCCESS", boards);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.get('/:id',authenticateToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const board = await Board.findOne({id});
        if(!board){
            return response(res, next, 400, 'Board does not exist', 'ERROR');
        }
        return response(res, next, 200, "Board retrieved", "SUCCESS", board);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.put('/:id',authenticateToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title} = req.body;
        const board = await Board.findOne({id});
        if(!board){
            return response(res, next, 400, 'Board does not exist', 'ERROR');
        }
        board.title = title;
        await board.save();
        return response(res, next, 200, "Board updated", "SUCCESS", board);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.delete('/:id',authenticateToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const board = await Board.findOne({id});
        if(!board){
            return response(res, next, 400, 'Board does not exist', 'ERROR');
        }
        await board.destroy();
        return response(res, next, 200, "Board deleted", "SUCCESS", board);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

module.exports = router;
