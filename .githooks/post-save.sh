#!/bin/bash

# Автоматический пуш при изменении файлов
cd /workspaces/carestimator

# Проверяем если есть изменения
if ! git diff-index --quiet HEAD --; then
    echo "🔄 Обнаружены изменения, отправляю в GitHub..."
    git add .
    git commit -m "Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
    git push
    echo "✅ Изменения отправлены!"
else
    echo "ℹ️ Нет новых изменений"
fi
