import express from 'express';
import bodyParser from 'body-parser';
import { userRouter, categoryRouter, productRouter } from './routes/index.js';
import { categoryController, productController, userController } from './controllers/index.js';
import { createTables } from './config/db.js'; 


const app = express();
// app.use(express.json());
app.use(bodyParser.json());


app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    await createTables(); 
    console.log('Server running on port', PORT);
});
