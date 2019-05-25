exports.up = async function (knex) {
  await knex.schema.createTable('users', function (t) {
    t.increments()
    t.string('email').notNullable()
    t.string('password')
    t.string('username').notNullable()
    t.timestamps(true, true)
  })
}

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('users')
}
