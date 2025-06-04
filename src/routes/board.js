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
        // Create board logic here
        // Example: const board = await Board.create(req.body);
        return response(res, next, 201, "Board created", "SUCCESS", null);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, "Server error", "ERROR", null);
    }
});

router.get('/',authenticateToken, async (req, res, next) => {
    try {
        const boards = await Board.findAll();
        return response(res, next, 200, "Boards retrieved", "SUCCESS", boards);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, "Server error", "ERROR", null);
    }
});

router.get('/:id',authenticateToken, async (req, res, next) => {
    try {
        // Get one board by id logic here
        // Example: const board = await Board.findByPk(req.params.id);
        return response(res, next, 200, "Board retrieved", "SUCCESS", null);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, "Server error", "ERROR", null);
    }
});

router.put('/:id',authenticateToken, async (req, res, next) => {
    try {
        // Update board logic here
        // Example:
        // const board = await Board.findByPk(req.params.id);
        // if (!board) return response(res, next, 404, "Board not found", "ERROR", null);
        // await board.update(req.body);
        return response(res, next, 200, "Board updated", "SUCCESS", null);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, "Server error", "ERROR", null);
    }
});

router.delete('/:id',authenticateToken, async (req, res, next) => {
    try {
        // Delete board logic here
        // Example:
        // const board = await Board.findByPk(req.params.id);
        // if (!board) return response(res, next, 404, "Board not found", "ERROR", null);
        // await board.destroy();
        return response(res, next, 200, "Board deleted", "SUCCESS", null);
    } catch (e) {
        console.error(e);
        return response(res, next, 500, "Server error", "ERROR", null);
    }
});

module.exports = router;
