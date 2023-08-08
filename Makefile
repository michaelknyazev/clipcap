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
	npx nx export extension-frontend
backend:
	MODE=development go run pkg/bin/summary-extension/main.go serve --config config/development.config.yaml
frontend: 
	npx nx serve extension-frontend & \
	npx local-ssl-proxy --key ./scripts/localhost-key.pem --cert ./scripts/localhost.pem --source 3000 --target 3001
firefox_extension:
	rm -rf ./dist/public/firefox-extension
	npx nx build extension-wrapper
	./packaging/firefox-extension/bundle.sh
extension:
	rm -rf ./dist/public/chrome-extension
	rm -rf ./dist/public/firefox-extension
	npx nx build extension-wrapper
	./packaging/chrome-extension/bundle.sh
	./packaging/firefox-extension/bundle.sh
test_launch:
	npx local-ssl-proxy --key ./scripts/localhost-key.pem --cert ./scripts/localhost.pem --source 3000 --target 8080

# Build Commands
build_extension_frontend: clear install
	npx nx export extension-frontend
build_extension_backend: build_extension_frontend
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o clipcap-extension pkg/bin/summary-extension/main.go

# Cloud Run deploy

deploy_extension: build_extension_frontend build_extension_backend
	docker build -t clipcap_extension -f ./packaging/docker/Dockerfile.extension .
	docker tag clipcap_extension:latest europe-west2-docker.pkg.dev/clipcap/clipcap/extension
	docker push europe-west2-docker.pkg.dev/clipcap/clipcap/extension

deploy_static:
	docker build -t clipcap_static -f ./packaging/docker/Dockerfile.static .
	docker tag clipcap_static:latest europe-west2-docker.pkg.dev/clipcap/clipcap/static
	docker push europe-west2-docker.pkg.dev/clipcap/clipcap/static