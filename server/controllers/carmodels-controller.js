const knex  = require('../db.js');

exports.carmodelsAll = async (req, res) => {
    knex.select('*').from('carmodels')
        .then(data => res.json(data))
        .catch(err => res.json({'message': `Error getting all carmodels: ${err}`}));
}

exports.carmodelCreate = async (req, res) => {
    const { brand, model, price } = req.body;
    knex('carmodels').insert({ brand, model, price })
        .then(() => res.json(req.body))
        .catch(err => res.json({'message': `Error creating carmodel: ${err}`}));
}

exports.carmodelDelete = async (req, res) => {
    const { id } = req.params;
    const data = await knex('carmodels').where('id', id).first();
    knex('carmodels').where('id', id).del()
        .then(() => res.json(data))
        .catch(err => res.json({'message': `Error deleting carmodel ${id}: ${err}`}));
}