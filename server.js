const express = require('express');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi`));
