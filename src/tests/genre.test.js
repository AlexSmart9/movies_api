require('../models')
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/genres'

let genreId

const genre = {
    "name":"Fancy"
}

// Test of Post
test("POST -> 'BASE_URL', sholud return statusCode 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
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
        .get(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(genreId)
})

//Test of Put
test("PUT -> 'BASE_URL/:id', should return statusCode 200, res.body to be defined and res.body.name === genreUpdate.name", async () => {
    const genreUpdate = {
        name: 'Rapidos y furiosos 5control'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
})

//Test of delete
test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})

