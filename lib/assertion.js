import _ from 'lodash'

import { getDB } from './db'

// Expose full test case for testing parallel execution
export default async (t) => {
  const db = await getDB()
  try {
    let users = await db.select('*').from('users')

    t.deepEqual(_.map(users, 'email'), ['hoge@piyo.com'])

    await db.insert([
      {
        email: 'fuga@piyo.com',
        password: '',
        username: ''
      }
    ]).into('users')

    users = await db.select('*').from('users')

    t.deepEqual(_.map(users, 'email'), ['hoge@piyo.com', 'fuga@piyo.com'])
  } finally {
    // Ensure teardown is called event if test failure :(
    await db.teardown()
  }
}
