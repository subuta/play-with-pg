# play-with-pg
Play with pg and knex.

:rotating_light: CAUTION :rotating_light:

Running test will create temporary database into postgres(for concurrent execution).
You should check these database's are cleaned correctly, They might be remains in case of test failure or `drop database command` failure :(

:rotating_light: CAUTION :rotating_light:

SEE: [play-with-sqlite3](https://github.com/subuta/play-with-sqlite3) also :)

#### How to setup

```
# Install dependencies
npm i

# Run postgres by docker-compose
docker-compose up

# Migrate database
npm run migrate

# Seed database
npm run seed

# Dump dev-database
npm run dump

# Run concurrent tests
npm test

# Run serial tests(slower)
npm run test-serial
```

#### DB related commands

```
# Generate seed
npx knex seed:make seed_name

# Generate migration
npx knex migrate:make migration_name
```
