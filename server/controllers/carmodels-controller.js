const knex = require('../db.js');

exports.carmodelsAll = async (req, res) => {
    knex.select('*').from('carmodels')
        .then(data => {
            console.log(`Returned carmodel(s): '${JSON.stringify(data)}'`);
            res.json(data)
        })
        .catch(err => res.json({ 'message': `Error getting all carmodels: ${err}` }));
}

exports.carmodelCreate = async (req, res) => {
    const { brand, model, price } = req.body;
    knex('carmodels').insert({
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price
    })
        .then(() => knex('carmodels').select('*').orderBy('id', 'desc').first())
        .then(data => {
            console.log(`Created carmodel '${JSON.stringify(data)}'`)
            res.json(data)
        })
        .catch(err => res.json({ 'message': `Error creating carmodel: ${err}` }));
}

exports.carmodelDelete = async (req, res) => {
    const { id } = req.params;
    const carmodel = await knex('carmodels').where('id', id).first();
    knex('carmodels').where('id', id).del()
        .then(() => {
            console.log(`Deleted carmodel '${JSON.stringify(carmodel)}'`);
            res.json(carmodel);
        })
        .catch(err => res.json({ 'message': `Error deleting carmodel ${id}: ${err}` }));
}