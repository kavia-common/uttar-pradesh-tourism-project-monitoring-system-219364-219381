#!/bin/bash
cd /home/kavia/workspace/code-generation/uttar-pradesh-tourism-project-monitoring-system-219364-219381/upstdc_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

