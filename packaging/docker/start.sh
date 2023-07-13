#!/bin/sh

./runapp serve --config /opt/runapp/config.yaml &
backend_pid=$!
npm start
kill $backend_pid
