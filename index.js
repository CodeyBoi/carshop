const express = require('express');
const PORT = process.env.PORT || 4001;
const knex = require('./server/db.js');

const server = express();

server.use(express.json())

server.use('/employees', require('./server/routes/employees-route.js'));
server.use('/carmodels', require('./server/routes/carmodels-route.js'));

server.post('/reset', async (req, res) => {
    knex.resetDb();
    res.json({'message': 'Database reset'});
});

server.get('/total_sales', async (req, res) => {
    knex.totalSales()
        .then(data => res.json(data))
        .catch(err => res.json({'message': `Error getting total sales: ${err}`}));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

