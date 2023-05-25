/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("workouts", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId")
             .unsigned()
             .notNullable()
             .index()
             .references("users.id")
        table.string("name").notNullable()
        table.integer("duration")
        table.string("subcategory")
        table.text("notes")
        table.integer("effortLevel")
        table.timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now())
        table.date("workoutDate").notNullable()
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