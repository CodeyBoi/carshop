const knex = require('../db.js');

exports.usersGet = async (req, res) => {
    const { name, uid } = req.query;
    console.log(`Getting users with name '${name}' and uid '${uid}'`);
    knex.select('*').from('users')
        .modify(qb => {
            if (name) {
                qb.where('name', name)
            }
            if (uid) {
                qb.where('uid', uid)
            }
        })
        .then(data => {
            console.log(`Returned user(s) '${JSON.stringify(data)}'`);
            res.json(data);
        })
        .catch(err => res.json({ 'message': `Error getting all users: ${err}` }));
}

exports.userCreate = async (req, res) => {
    const mayHaveId = await knex('employees').select('id').where('name', req.body.name).first();
    knex('users').insert({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        employee_id: mayHaveId ? mayHaveId.id : null
    })
        .then(() => knex('users').select('*').orderBy('uid', 'desc').first())
        .then(data => {
            console.log(`Created user '${JSON.stringify(data)}'`);
            res.json({ ...data, 'token': data.uid });
        })
        .catch(err => res.json({ 'message': `Error creating user: ${err}` }));
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    knex('users').select('*').where({ email: email, password: password }).first()
        .then(data => {
            if (data) {
                console.log(`Logged in user '${JSON.stringify(data)}'`);
                res.json({ 'accepted': true, 'message': 'Login successful', 'token': data.uid });
            } else {
                console.log(`Login rejected with body '${JSON.stringify(req.body)}'`);
                res.json({ 'accepted': false, 'message': 'Invalid email or password' });
            }
        })
        .catch(err => res.json({ 'message': `Error logging in: ${err}` }));
}