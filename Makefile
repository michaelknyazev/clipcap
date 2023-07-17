clear:
	rm -rf \
		./dist \
		./node_modules
	
install:
	npm install

# Dev DB 
db:
	docker-compose rm -f
	docker-compose up --build

# Dev Backend 
prepare: clear install
	npx nx export instance
backend:
	go run main.go serve --config scripts/default.config.yaml
frontend: 
	npx nx run-many --target=serve
extension:
	npx nx build chrome-extension
	./packaging/chrome-extension/bundle.sh

# Build Commands
build_frontend: clear install
	npx nx run-many --target=build
build_backend:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o runapp main.go

# Build Docker Images For local Test
# TODO