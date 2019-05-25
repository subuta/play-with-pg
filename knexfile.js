module.exports = (() => {
  // const connection = process.env.DATABASE_URL
  const connection = 'postgres://postgres:postgres@localhost:5432/postgres'
  return {
    client: 'pg',
    connection,
    pool: {
      min: 1,
      max: 1,
      // SEE: https://github.com/tgriesser/knex/issues/1871
      disposeTimeout: 360000 * 1000,
      idleTimeoutMillis: 360000 * 1000
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
})()

