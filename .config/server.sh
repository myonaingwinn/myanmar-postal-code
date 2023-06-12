#!/bin/sh

cd /server

RED="\e[91m"
GREEN="\e[94m"
BOLD="\e[1m"
RESET="\e[0m"

echo -e "\n${GREEN}"
echo "====================================================="
echo -e " Starting ${BOLD}'server'${RESET}${GREEN} setup ..."
echo "====================================================="
echo -e "${RESET}"

# Copy .env.example to .env
echo -e "\n${GREEN}"
echo -e "Copying .env.example to .env ..."
echo -e "${RESET}"
cp .env.example .env && echo -e "${GREEN}Done." ||
    { echo -e "${RED}Error copying .env.example to .env" && exit 1; }
echo -e "${RESET}"

# Install packages
echo -e "\n${GREEN}"
echo -e "Installing packages ..."
echo -e "${RESET}"
npm install && echo -e "${GREEN}Done." ||
    { echo -e "${RED}Error installing packages" && exit 1; }
echo -e "${RESET}"

echo -e "\n${RED}"
echo -e "******************************************************"
echo -e "*             Don't forget to set your data          *"
echo -e "*               in the server/.env file              *"
echo -e "******************************************************"
echo -e "${RESET}\n"
