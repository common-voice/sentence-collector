'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sentencesRoutes = require('./routes/sentences');
const languagesRoutes = require('./routes/languages');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/sentences', sentencesRoutes);
app.use('/languages', languagesRoutes);

module.exports = app;
