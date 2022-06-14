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

// const TOTAL_SALES_VIEW = `
    // SELECT      SUM(price) AS total_sales
    // FROM        sales
    // JOIN        carmodels ON carmodels.id = sales.carmodel_id
    // JOIN        employees ON employees.id = sales.employee_id
    // GROUP BY    employees.id
    // $$ language 'sqlite'`;

/**
 * A function which returns the total sales of all employees
 * (the sum of all of their sales)
 */
knex.totalSales = () => {
    return knex('sales')
        .join('carmodels', 'sales.carmodel_id', 'carmodels.id')
        .join('employees', 'sales.employee_id', 'employees.id')
        .groupBy('employees.id')
        .select('name', 'employees.id AS employee_id', knex.raw('SUM(carmodels.price) AS sales'));
}

/**
 * Resets and seeds the database using the data found in 'data.json'
 */
knex.resetDb = () => {
    const seedPath = path.resolve(__dirname, 'db/data.json');
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8')).carshop;
    knex('sales').del()
        .then(() => knex('carmodels').del())
        .then(() => knex('employees').del())
        .then(() => knex('employees').insert(seed.employees))
        .then(() => knex('carmodels').insert(seed.carmodels))
        .then(() => knex('sales').insert(seed.sales))
        .then(() => console.log('Database reset and seeded'))
        .catch(err => console.log(`Error resetting database: ${err}`));
}

module.exports = knex;
