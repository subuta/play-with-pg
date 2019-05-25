import knex from 'knex'

import fs from 'fs'
import Promise, { promisify } from 'bluebird'
import _ from 'lodash'

import { parse } from 'pg-connection-string'
import connection from '../knexfile'
import short from 'short-uuid'

import { Client } from 'pg'

const translator = short()

const swapDatabaseFromConnectionString = (connectionString, database) => {
  const {
    user = 'postgres',
    host = 'localhost',
    port = 5432,
    password
  } = parse(connectionString)

  return `postgres://${user}:${password}@${host}:${port}/${database}`
}

// Read dump.sql and execute each row.
const restoreDump = async (database) => new Promise(async (resolve, reject) => {
  // Get rawDump
  const rawDump = fs.readFileSync(require.resolve('../db/dump.sql'), 'utf8')

  const client = new Client({
    connectionString: swapDatabaseFromConnectionString(connection.connection, database),
  })

  // Connect to tempDB.
  client.connect()

  // Restore rawDump into tempDB.
  client.query(rawDump, (err, res) => {
    client.end()
    if (err) return reject(err)
    resolve(res)
  })
})

const getDB = async () => {
  const primaryDB = knex(connection)

  const tempDBName = `tempdb_${_.toLower(translator.generate())}`

  // Create TempDB.
  await primaryDB.raw(`CREATE DATABASE ${tempDBName};`)

  await restoreDump(tempDBName)

  const tempDB = knex({
    ...connection,
    connection: swapDatabaseFromConnectionString(connection.connection, tempDBName)
  })

  tempDB.teardown = async () => {
    await tempDB.destroy()
    await primaryDB.raw(`DROP DATABASE ${tempDBName};`)
    await primaryDB.destroy()
  }

  return tempDB
}


export {
  getDB,
}

export default {
  getDB,
}
