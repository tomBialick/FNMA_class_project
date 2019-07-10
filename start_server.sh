#!/bin/bash
# Start the server with this script

# 1. For Ubuntu uncomment the next chunk and comment out 2 and 3
# sudo service postgresql stop
# echo "Waiting for postgreSQL to stop"
# sleep 3s
# echo "Starting Server and postgreSQL"
# npm start && sudo service postgresql start

# 2. For MacOS uncomment the next chunk and comment out 1 and 3
# pg_ctl -D /usr/local/var/postgres stop
# echo "Waiting for postgreSQL to stop"
# sleep 3s
# echo "Starting Server and postgreSQL"
# npm start && pg_ctl -D /usr/local/var/postgres start

# 3. For Windows uncomment the next chunk and comment out 2 and 3 (CHECK VERSION!!)
pg_ctl -D /c/Program Files/PostgreSQL/11/data stop
echo "Waiting for postgreSQL to stop"
sleep 3s
echo "Starting Server and postgreSQL"
npm start && pg_ctl -D /c/Program Files/PostgreSQL/11/data start


echo "If you can read this, something probably failed..."
