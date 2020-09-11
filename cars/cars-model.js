const db = require("../data/config")

function find() {
	return db("cars")
}

function findById(id) {
	return db("cars").where({ id }).first()
}

async function create(data) {
	const [id] = await db("cars").insert(data)
	return findById(id)
}

async function update(id, data) {
	await db("cars").where({ id }).update(data)
	return findById(id)
}

function remove(id) {
	return db("cars").where({ id }).del()
}

module.exports = {
	find,
	findById,
	create,
	update,
	remove,
}