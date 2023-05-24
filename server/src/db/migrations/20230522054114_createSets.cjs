/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
     return knex.schema.createTable("sets", (table) => {
        table.bigIncrements("id")
        table.bigInteger("workoutId")
            .unsigned()
            .references("workouts.id")
            .index()
            .notNullable()
        table.bigInteger("exerciseId")
            .unsigned()
            .references("exercises.id")
            .index()
            .notNullable()
        table.integer("repetitions")
        table.integer("weight")
        table.float("miles")
        table.float("calories")
        table.string("score")
        table.integer("workoutSets")
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
    return knex.schema.dropTableIfExists("sets")
}
