const path      = require('path');
const express   = require('express');
const PORT      = process.env.PORT || 4001;
const knex      = require('./server/db.js');

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json())

server.use('/employees', require('./server/routes/employees-route.js'));
server.use('/carmodels', require('./server/routes/carmodels-route.js'));
server.use('/users', require('./server/routes/users-route.js'));

server.post('/reset', async (req, res) => {
    knex.resetDb();
    res.json({'message': 'Database reset'});
});

server.get('/total_sales', async (req, res) => {
    knex.totalSales()
        .then(data => res.json(data))
        .catch(err => res.json({'message': `Error getting total sales: ${err}`}));
});

// Have Node serve the files for our build React app
server.use(express.static(path.resolve(__dirname, 'client/src')));

// Handles any requests that don't match the ones above
server.use((req, res, next) => {
    res.status(404).send('The page you are looking for cannot be found!');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
