# AQA Test Task (Playwright + TypeScript)

Нижче — **проста інструкція**, як встановити залежності та запустити тести локально.

## Вимоги
- **Node.js** v18 або новіше (рекомендовано LTS)
- **npm** (йде разом із Node.js)
- Доступ до інтернету (тести працюють з сайтом `https://automationintesting.online/`)

## Установка
```bash
# 1) Встановити залежності
npm install

# 2) Встановити браузери Playwright
npx playwright install
```
> Якщо команда вище попросить додаткові залежності для вашої ОС — встановіть їх за підказкою.

## Запуск тестів
> У репозиторії є як **UI-тести**, так і **API-тести**.
- Запустити **всі** тести:
```bash
npx playwright test
```
- Запустити **тільки UI-тести**:
```bash
npx playwright test e2e/main.spec.ts
```
- Запустити **тільки API-тест**:
```bash
npx playwright test e2e/main.api.spec.ts
```
- Запустити у **Playwright UI Mode** (зручний перегляд/дебаг):
```bash
npm run test:ui
```
> Цей скрипт за замовчуванням відкриває `e2e/main.api.spec.ts`. За потреби відредагуйте поле `scripts` у `package.json`.

## Звіти
Після прогона доступний HTML-звіт:
```bash
npx playwright show-report
```

## Структура
```
e2e/
  api/                # helper для API-запитів (створення/перевірка/видалення кімнати)
  constants/          # URL-и та тестові дані
  pages/              # Page Object-и для UI
  main.spec.ts        # e2e UI-сценарії бронювання
  main.api.spec.ts    # API-сценарій створення/перевірки кімнати
playwright.config.ts  # конфіг Playwright (браузери, репорти тощо)
package.json          # залежності та npm-скрипти
```
