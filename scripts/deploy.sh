pm2 del $PROJECT_NAME || true && yarn && yarn build && pm2 start npm --name $PROJECT_NAME
