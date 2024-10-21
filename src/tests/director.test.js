require('../models')
const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/directors'

let directorId

const director = {
    "firstName": "James",
    "lastName": "Wan",
    "nationality": "Australian",
    "image": "https://es.wikipedia.org/wiki/James_Wan#/media/Archivo:James_Wan_by_Gage_Skidmore_2.jpg",
    "birthday": "1977-02-26"
}

// Test of Post
test("POST -> 'BASE_URL', sholud return statusCode 201 and res.body.firstname === director.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

//Test of Get
test("GET -> 'BASE_URL', should return statusCode 200 and res.body has to be defined", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//Test Of Get One
test("GET -> 'BASE_URL/:id', should return statusCode 200 and res.body.length === 1 ", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(directorId)
})

//Tst of Put
test("PUT -> 'BASE_URL/:id', should return statusCode 200, res.body to be defined and res.body.lastName === directorUpdate.lastName", async () => {
    const directorUpdate = {
        lastName: 'Won'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(directorUpdate.lastName)
})

//Test of delete
test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})




