install:
	@echo "📦 Installing dependencies..."
	npm install

dev:
	@echo "🚀 Starting development server..."
	npm run dev

build:
	@echo "🏗️ Building project..."
	npm run build

lint:
	@echo "🔍 Running ESLint..."
	npm run lint

format:
	@echo "🎨 Formatting with Prettier..."
	npx prettier --write .

format-check:
	@echo "🔍 Checking formatting with Prettier..."
	npx prettier --check .

