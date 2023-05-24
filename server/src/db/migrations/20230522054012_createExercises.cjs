/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("exercises", (table)=> {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.text("description")
        table.string("muscleGroup")
        table.string("bodyFunction")
        table.text("instructions")
        table.string("videoUrl")
        table.string("equipment")
        table.string("notes") 
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("exercises")
}