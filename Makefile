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
	MODE=development go run main.go serve --config scripts/default.config.yaml
frontend: 
	npx nx serve extension-frontend & \
	npx local-ssl-proxy --key ./scripts/localhost-key.pem --cert ./scripts/localhost.pem --source 3000 --target 3001
extension:
	npx nx build chrome-extension-wrapper
	./packaging/chrome-extension/bundle.sh
test_launch:
	npx local-ssl-proxy --key ./scripts/localhost-key.pem --cert ./scripts/localhost.pem --source 3000 --target 8080

# Build Commands
build_frontend: clear install
	npx nx run-many --target=build
build_backend:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o clipcap main.go

# Build Docker Images For local Test
# TODO

deploy_backend_to_cloud_run: build_backend
	docker build -t clipcap_api -f ./packaging/docker/Dockerfile.api .
	docker tag clipcap_api:latest europe-west2-docker.pkg.dev/clipcap/clipcap/api
	docker push europe-west2-docker.pkg.dev/clipcap/clipcap/api