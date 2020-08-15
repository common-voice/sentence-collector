'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sentencesRoutes = require('./routes/sentences');
const languagesRoutes = require('./routes/languages');
const statsRoutes = require('./routes/stats');
const votesRoutes = require('./routes/votes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/languages', languagesRoutes);
app.use('/sentences', sentencesRoutes);
app.use('/stats', statsRoutes);
app.use('/votes', votesRoutes);
app.use(express.static(path.resolve(__dirname, '..', 'web', 'dist')));

module.exports = app;
