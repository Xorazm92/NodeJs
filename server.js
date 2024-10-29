import express from 'express';
import userRoutes from './routes/user.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js'; 
import { createTables } from './config/db.js'; 

const app = express();
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    await createTables(); 
    console.log('Server running on port', PORT);
});
