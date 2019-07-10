#!/bin/bash
# Start the server with this script

# Colors for text
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color


# 1. For Ubuntu uncomment the next chunk and comment out 2 and 3
# echo ""
# echo -e "${GREEN}===================================================================${NC}"
# echo -e "Waiting for postgreSQL to ${RED}stop${NC}"
# echo -e "${GREEN}===================================================================${NC}"
# echo ""
# sudo service postgresql stop
# sleep 3s
# echo ""
# echo -e "${GREEN}===================================================================${NC}"
# echo -e "${GREEN}Starting postgreSQL${NC}"
# echo -e "${GREEN}===================================================================${NC}"
# echo ""
# sudo service postgresql start
# sleep 3s
# echo ""
# echo -e "${GREEN}===================================================================${NC}"
# echo -e "${GREEN}Starting Server${NC}"
# echo -e "${GREEN}===================================================================${NC}"
# echo ""
# npm start

# 2. For MacOS uncomment the next chunk and comment out 1 and 3
# echo ""
# echo -e "${GREEN}===================================================================${NC}"
# echo -e "Waiting for postgreSQL to ${RED}stop${NC}"
# echo -e "${GREEN}===================================================================${NC}"
# echo ""
# pg_ctl -D /usr/local/var/postgres stop
# sleep 3s
# echo ""
# echo -e "${GREEN}===================================================================${NC}"
# echo -e "${GREEN}Starting postgreSQL${NC}"
# echo -e "${GREEN}===================================================================${NC}"
# echo ""
# pg_ctl -D /usr/local/var/postgres start
# sleep 3s
# echo ""
# echo -e "${GREEN}===================================================================${NC}"
# echo -e "${GREEN}Starting Server${NC}"
# echo -e "${GREEN}===================================================================${NC}"
# echo ""
# npm start

# 3. For Windows uncomment the next chunk and comment out 2 and 3 (CHECK VERSION!!)
echo ""
echo -e "${GREEN}===================================================================${NC}"
echo -e "Waiting for postgreSQL to ${RED}stop${NC}"
echo -e "${GREEN}===================================================================${NC}"
echo ""
pg_ctl -D /c/Program\ Files/PostgreSQL/11/data stop
sleep 3s
echo ""
echo -e "${GREEN}===================================================================${NC}"
echo -e "${GREEN}Starting postgreSQL${NC}"
echo -e "${GREEN}===================================================================${NC}"
echo ""
pg_ctl -D /c/Program\ Files/PostgreSQL/11/data start
sleep 3s
echo ""
echo -e "${GREEN}===================================================================${NC}"
echo -e "${GREEN}Starting Server${NC}"
echo -e "${GREEN}===================================================================${NC}"
echo ""
npm start


# Keep this uncommented
echo ""
echo -e "${RED}===================================================================${NC}"
echo -e "${RED}If you can read this, something probably failed...${NC}"
echo -e "${RED}===================================================================${NC}"
echo ""
