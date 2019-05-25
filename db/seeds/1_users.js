const bcrypt = require('bcrypt')
const _ = require('lodash')
const short = require('short-uuid')

// SEE: https://github.com/kelektiv/node.bcrypt.js#readme
const saltRounds = 1

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('users').del()

  const hashedPassword = await bcrypt.hash('password', saltRounds)

  // Generate short-unique-id for @username.
  const translator = short()

  return knex('users').insert([
    {
      email: 'hoge@piyo.com',
      password: hashedPassword,
      username: translator.generate()
    }
  ])
}
