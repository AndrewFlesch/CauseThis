const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false}));

const PORT = process.env.PORT || 6000;

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/configforms', require('./routes/api/configforms'));
app.use('/api/utils', require('./routes/api/utils'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
