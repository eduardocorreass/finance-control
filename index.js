const express = require('express');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/incomes');
const categoryRoutes = require('./routes/categories');
const dashboardRoutes = require('./routes/dashboard');

const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/expenses', expenseRoutes);
app.use('/incomes', incomeRoutes);
app.use('/categories', categoryRoutes);
app.use('/dashboards', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});