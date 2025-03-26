# add make command for setting up backend and frontend
# add make command for running backend unit tests
# Command to install dependencies for both backend and frontend
NPM := npm

# FLASK_SERVER_DIR := flask-server
# CLIENT_DIR := client

.PHONY: setup start-backend start-frontend start-app test-backend test-frontend

setup:
	cd katkin-frontend && npm install
	cd .. && npm install

# Command to start the backend server in development mode
start-backend:
	cd src && npm run start:dev

# Command to start the frontend React app
start-frontend:
	cd katkin-frontend && npm start

start-app:
	make start-backend & make start-frontend

# Command to run backend unit tests
test-backend:
	cd src && npm run test

# Command to run frontend unit tests
test-frontend:
	cd katkin-frontend && npm test