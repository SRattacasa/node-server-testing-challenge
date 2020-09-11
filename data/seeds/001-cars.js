exports.seed = async function(knex) {
	await knex("cars").truncate()
	await knex("cars").insert([
		{ name: "evo" },
		{ name: "sti" },
		{ name: "k24a2 swap" },
		
	])
}