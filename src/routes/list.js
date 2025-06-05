const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('../middleware/authenticationToken');

const List = require('../models/List');
const response = require('../helper/response');

router.post('/',authenticateToken, async (req, res, next) => {
    try {
        const {title,boardId} = req.body;
        const data = await List.create({title,boardId});
        return response(res, next, 201, "List created", "SUCCESS", data);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.get('/',authenticateToken, async (req, res, next) => {
    try {
        const { boardId } = req.query;
        const where = {};

        if (boardId) {
            where.boardId = boardId;
        }

        const boards = await List.findAll({where});
        return response(res, next, 200, "Lists retrieved", "SUCCESS", boards);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.get('/:id',authenticateToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const list = await List.findOne({id});
        if(!list){
            return response(res, next, 400, 'List does not exist', 'ERROR');
        }
        return response(res, next, 200, "List retrieved", "SUCCESS", list);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.put('/:id',authenticateToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title} = req.body;
        const list = await List.findOne({id});
        if(!list){
            return response(res, next, 400, 'List does not exist', 'ERROR');
        }
        list.title = title;
        await list.save();
        return response(res, next, 200, "List updated", "SUCCESS", list);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

router.delete('/:id',authenticateToken, async (req, res, next) => {
    try {
        const {id} = req.params;
        const list = await List.findOne({id});
        if(!list){
            return response(res, next, 400, 'List does not exist', 'ERROR');
        }
        await list.destroy();
        return response(res, next, 200, "List deleted", "SUCCESS", list);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, e.message, "ERROR", null);
    }
});

module.exports = router;
