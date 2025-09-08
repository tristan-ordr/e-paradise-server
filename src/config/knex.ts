import knex from "knex";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const dbConfig = {
    host: DB_HOST || "",
    port: DB_PORT || "",
    user: DB_USER || "",
    password: DB_PASSWORD || "",
    database: DB_DATABASE || "",
}


// return Knex
const _knex = knex({
    client: 'pg',
    connection: dbConfig,
    debug: true,
    pool: {
        min: 2,
        max: 10
    }
});

console.log(`Connection to db on port ${DB_PORT} established with knex`);


export default _knex;