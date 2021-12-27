SHELL=/bin/bash

clean:
	rm -rf data

start:
	docker-compose up

build:
	npm run codegen
	npm run build

deploy: build
	npm run create-local
	npm run deploy-local

.PHONY: build deploy