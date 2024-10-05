const { getAll, create, getOne, remove, update, setGenres, setActors, setDiretors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id/genres')
    .post(setGenres)
    
movieRouter.route('/:id/actors')
    .post(setActors)

movieRouter.route('/:id/directors')
    .post(setDiretors)

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = movieRouter;