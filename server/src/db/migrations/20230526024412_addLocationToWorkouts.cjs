/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("workouts", table => {
        table.bigInteger("locationId")
             .unsigned()
             .index()
             .references("locations.id")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("workouts", table => {
        table.dropColumn("locationId")
    })
}