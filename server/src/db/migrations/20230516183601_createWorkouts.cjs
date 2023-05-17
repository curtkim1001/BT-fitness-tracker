/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("workouts", (table) => {
        table.bigIncrements("id")
        table.bigInteger("routineId")
            .unsigned()
            .references("routines.id")
            .index()
            .notNullable()
        table.bigInteger("exerciseId")
            .unsigned()
            .references("exercises.id")
            .index()
            .notNullable()
        table.timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now())
        table.timestamp("updatedAt")
            .notNullable()
            .defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("workouts")
}
