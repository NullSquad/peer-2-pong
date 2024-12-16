DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = docker-compose.yaml

.PHONY: up down build start stop restart logs ps clean watch

up:
	@echo "Starting services..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

down:
	@echo "Stopping and removing services..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

build:
	@echo "Building services..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build

start:
	@echo "Starting services..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) start

stop:
	@echo "Stopping services..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop

restart:
	@echo "Restarting services..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) restart

logs:
	@echo "Following logs..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

ps:
	@echo "Listing containers..."
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

clean:
	@echo "Cleaning up dangling images and volumes..."
	@docker system prune -f
	@docker volume prune -f

watch:
	@echo "Starting services in watch mode (restarting on file changes)..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) up --watch