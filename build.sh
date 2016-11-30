#!/bin/bash

mkdir -p build
browserify -t [babelify] src/app.jsx -o build/app.js
