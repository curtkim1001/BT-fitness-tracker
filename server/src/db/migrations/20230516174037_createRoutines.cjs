/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("routines", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId")
             .unsigned()
             .notNullable()
             .index()
             .references("users.id")
        table.string("name").notNullable()
        table.text("description")
        table.integer("duration")
        // table.date("date")
        table.string("subcategory")
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
    return knex.schema.dropTableIfExists("routines")
}
