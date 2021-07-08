require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eaigk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, option)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
const validaToken = require('./middlewares/validate_token');
const adminRoutes = require('./routes/admin');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin',validaToken, adminRoutes);

// iniciar server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));