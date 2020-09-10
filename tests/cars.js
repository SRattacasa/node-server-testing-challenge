const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
	// run the seeds programatically before each test to start fresh
	await db.seed.run()
})

afterAll(async () => {
	// close the database connection so the test process doesn't hang or give a warning
	await db.destroy()
})

describe("cars integration tests", () => {
	it("GET /cars", async () => {
		const res = await supertest(server).get("/cars")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.length).toBeGreaterThanOrEqual(4)
		expect(res.body[0].name).toBe("sam")
	})

	it("GET /cars/:id", async () => {
		const res = await supertest(server).get("/cars/2")
		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("frodo")
	})

	it("GET /cars/:id - not found", async () => {
		const res = await supertest(server).get("/cars/50")
		expect(res.statusCode).toBe(404)
	})

	it("POST /cars", async () => {
		const res = await supertest(server)
			.post("/cars")
			.send({ name: "bilbo" })
		expect(res.statusCode).toBe(201)
		expect(res.type).toBe("application/json")
		expect(res.body.name).toBe("bilbo")
	})
})