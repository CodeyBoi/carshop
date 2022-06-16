const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'db/database.sqlite');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath
    },
    useNullAsDefault: true
});

/* Creating all tables for the database if they do not exist */
knex.schema.hasTable('employees').then(async exists => {
    if (!exists) {
        return knex.schema.createTable('employees', table => {
            table.increments('id').notNullable().primary();
            table.string('name').notNullable();
        })
            .then(knex('employees').insert(seed.employees))
            .then(() => console.log('Employees table created and seeded'))
            .catch(err => console.log(`Error creating table 'employees': ${err}`));
    }
});

knex.schema.hasTable('carmodels').then(async exists => {
    if (!exists) {
        return knex.schema.createTable('carmodels', table => {
            table.increments('id').notNullable().primary();
            table.string('brand').notNullable();
            table.string('model').notNullable();
            table.integer('price').notNullable();
        })
            .then(() => console.log('Carmodels table created'))
            .catch(err => console.log(`Error creating table 'carmodels': ${err}`));
    }
});

knex.schema.hasTable('users').then(async exists => {
    if (!exists) {
        return knex.schema.createTable('users', table => {
            table.increments('uid').notNullable().primary();
            table.string('name').notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable().unique();
            table.integer('employee_id').nullable()
                .references('id').inTable('employees').defaultTo(null);
            })
            .then(() => console.log('Users table created'))
            .catch(err => console.log(`Error creating table 'users': ${err}`));
    }
});

knex.schema.hasTable('sales').then(async exists => {
    if (!exists) {
        return knex.schema.createTable('sales', table => {
            table.increments('id').notNullable().primary();
            table.integer('employee_id').notNullable()
                .references('id').inTable('employees');
            table.integer('carmodel_id').notNullable()
                .references('id').inTable('carmodels');
        })
            .then(() => {
                knex.schema.createView()
                    .as('total_sales', knex.select(knex.sum('price')).from('sales'))
            })
            .then(() => console.log('Sales table created'))
            .catch(err => console.log(`Error creating table 'sales': ${err}`));
    }
});

/**
 * A function which returns the total sales of all employees
 * (the sum of all of their sales)
 */
knex.totalSales = () => {
    return knex('sales')
        .join('carmodels', 'sales.carmodel_id', 'carmodels.id')
        .join('employees', 'sales.employee_id', 'employees.id')
        .groupBy('employees.id')
        .select('name', 'employees.id AS employee_id', 
            knex.raw('COALESCE(SUM(carmodels.price), 0) AS sales')
        );
}

/**
 * Resets and seeds the database using the data found in 'db/data.json'
 */
knex.resetDb = () => {
    const seedPath = path.resolve(__dirname, 'db/data.json');
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8')).carshop;
    knex('sales').del()
        .then(() => knex('carmodels').del())
        .then(() => knex('employees').del())
        .then(() => knex('users').del())
        .then(() => knex('employees').insert(seed.employees))
        .then(() => knex('carmodels').insert(seed.carmodels))
        .then(() => knex('sales').insert(seed.sales))
        .then(() => console.log('Database reset and seeded'))
        .catch(err => console.log(`Error resetting database: ${err}`));
}

module.exports = knex;
