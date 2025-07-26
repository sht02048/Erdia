---
description: "Commit changes with Korean gitmoji following project conventions"
argument-hint: "commit-type description"
allowed-tools: ["Bash"]
---

# Commit Feature

Commit staged changes using Korean gitmoji following the project's commit conventions.

Arguments: $ARGUMENTS

## Instructions:

1. Check git status to see staged changes
2. Create a Korean commit message with appropriate gitmoji
3. Use the project's commit format with Claude Code attribution
4. Run pre-commit hooks (lint, type-check, format)

Commit type: {first argument} (feature/refactor/fix/style/etc.)
Description: {remaining arguments}

Available gitmoji types:

- ✨ Feature: 로직 추가, 변경, 삭제 등의 기능 작업
- ♻️ Refactor: 동작은 동일하나 내부 로직이 변경된 리팩토링
- 🐛 Fix: 의도된 동작과 다르게 구현된 버그 수정
- 💄 Style: 로직이 아닌 스타일 변경

Please commit the changes with appropriate Korean message.
