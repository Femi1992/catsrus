NPM := npm

.PHONY: setup install-backend install-frontend start-backend start-frontend start-app test-backend

setup: install-backend install-frontend

install-backend:
	$(NPM) install

install-frontend:
	cd katkin-frontend && $(NPM) install

# Command to start the backend server in development mode
start-backend:
	cd src && $(NPM) run start:dev

# Command to start the frontend React app
start-frontend:
	cd katkin-frontend && $(NPM) start

start-app:
	make start-backend & make start-frontend

# Command to run backend unit tests
test-backend:
	cd src && $(NPM) run test