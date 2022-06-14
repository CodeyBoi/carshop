const knex = require('../db.js');

exports.employeesAll = async (req, res) => {
    knex.select('*').from('employees')
        .then(data => res.json(data))
        .catch(err => res.json({'message': `Error getting all employees: ${err}`}));
}
