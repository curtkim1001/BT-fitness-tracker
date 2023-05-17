/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", table => {
        table.string("firstName").notNullable()
        table.string("lastName").notNullable()
        table.string("imageUrl")
        table.boolean("admin").notNullable().defaultTo(false)
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users", table => {
        table.dropColumn("firstName")
        table.dropColumn("lastName")
        table.dropColumn("imageUrl")
        table.dropColumn("admin")
    })
}
