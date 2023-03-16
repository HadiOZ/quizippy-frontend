#!/bin/bash

echo "VUE_APP_API=http://$API_HOST:8000\nVUE_APP_WEBSOCKET=ws://$WEBSOCKET_HOST:8083\nVUE_APP_PLAY=http://$PLAY_HOST:3000" > .env
npm run serve