const knex = require('../db.js');

exports.employeesAll = async (req, res) => {
    knex.select('*').from('employees')
        .then(data => {
            console.log(`Returned employee(s) '${JSON.stringify(data)}'`);
            res.json(data);
        })
        .catch(err => res.json({ 'message': `Error getting all employees: ${err}` }));
}

exports.employeeSales = async (req, res) => {
    const { id } = req.query;
    knex.select('brand', 'model', 'price', 'sales.id AS sale_id')
        .from('sales')
        .join('carmodels', 'carmodel_id', 'carmodels.id')
        .where('employee_id', id)
        .orderBy('sales.id')
        .then(data => {
            console.log(`Returned sales for employee with id ${id}`);
            res.json(data);
        }).catch(err => res.json({ 'message': `Error getting sales for employee: ${err}` }));
}