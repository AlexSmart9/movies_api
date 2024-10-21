require('../models')
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/movies'

let genreId
let directorId
let actorId
let movieId

beforeAll(async () => {
    const genre = {
        "name":"Fancy"
    }
    
    const res = await request(app)
        .post('/api/v1/genres')
        .send(genre)
    
    genreId = res.body.id
})

beforeAll(async () => {
    const actor = {
        "firstName": "Sung",
        "lastName": "Kang",
        "nationality": "American",
        "image": "https://es.wikipedia.org/wiki/Sung_Kang#/media/Archivo:Sung_Kang_(Sundance_2007).jpg",
        "birthday": "1972-04-08"
    }
    const res = await request(app)
        .post('/api/v1/actors')
        .send(actor)

    actorId = res.body.id
})

beforeAll(async() => {
    const director = {
        "firstName": "James",
        "lastName": "Wan",
        "nationality": "Australian",
        "image": "https://es.wikipedia.org/wiki/James_Wan#/media/Archivo:James_Wan_by_Gage_Skidmore_2.jpg",
        "birthday": "1977-02-26"
    }

    const res = await request(app)
        .post('/api/v1/directors')
        .send(director)

    directorId = res.body.id
})

afterAll(async () => {
    await request (app)
        .delete(`/api/v1/genres/${genreId}`)
})

afterAll(async () => {
    await request(app)
        .delete(`/api/v1/actors/${actorId}`)
})

afterAll(async () => {
    await request(app)
        .delete(`/api/v1/directors/${directorId}`)
})

const movie = {
    "name":"Fast and furious 5",
    "image": "https://es.wikipedia.org/wiki/Fast_Five#/media/Archivo:Fast-Five-5.png",
    "synopsis": "The film itself sets a different course for the rest of the saga, moving away from the underground aesthetic of the first four and minimizing the street racing sequences, which were identifying marks of the saga.",
    "releaseYear": 2011
}

// Test of Post
test("POST -> 'BASE_URL', sholud return statusCode 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

//Test of Get
test("GET -> 'BASE_URL', should return statusCode 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test of GetOne
test("GET -> 'BASE_URL/:id', should return statusCode 200 and res.body.length === 1 ", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(movieId)
})

//Test of Put
test("PUT -> 'BASE_URL/:id', should return statusCode 200, res.body to be defined and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
        name: 'Rapidos y furiosos 5control'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
})

//Test of SetGenres
test("POST 'BASE_URL/movies/id/genres' should return statusCode 200 and res.body to be defined ", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genreId])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test of SetActors
test("POST 'BASE_URL/movies/id/actors' should return statusCode 200 and res.body to be defined ", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actorId])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test of SetDirectors
test("POST 'BASE_URL/movies/id/directors' should return statusCode 200 and res.body to be defined ", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([directorId])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test of delete
test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})
