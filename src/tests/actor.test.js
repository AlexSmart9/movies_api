require('../models')
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/actors'

let actorId

const actors = {
    "firstName": "Sung",
    "lastName": "Kang",
    "nationality": "American",
    "image": "https://es.wikipedia.org/wiki/Sung_Kang#/media/Archivo:Sung_Kang_(Sundance_2007).jpg",
    "birthday": "1972-04-08"
}

//Test pf Post
test("POST -> 'BASE_URL', sholud return statusCode 201 and res.body.firstName === actors.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(actors)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actors.firstName)
})

//Test of Get
test("GET -> 'BASE_URL', should return statusCode 200 res.body.length === 1 and res.body has to be defined", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test Of Get One
test("GET -> 'BASE_URL/:id', should return statusCode 200 and res.body.length === 1 ", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(actorId)
})

//Test of Put
test("PUT -> 'BASE_URL/:id', should return statusCode 200, res.body to be defined and res.body.firstName === actorUpdate.firstName", async () => {
    const actorUpdate = {
        firstName: 'Jacob'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
})

//Test of delete
test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})

