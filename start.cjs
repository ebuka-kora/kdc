'use strict';

const path = require('path');

// Render (or a bad Root Directory) can set cwd to `src`; compiled output lives next to package.json in `dist/`.
process.chdir(path.resolve(__dirname));
require('./dist/server.js');
