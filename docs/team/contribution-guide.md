# Team Contribution Guide - Dayflow HRMS

Welcome to the Dayflow HRMS development team. To maintain code quality and ensure a smooth integration cycle, please read and adhere to these guidelines.

---

## 1. Local Development Principles
- **Clean Starts**: Run `npm install` at both the root level and within individual folders before launching applications.
- **Environment Isolation**: Never commit `.env` files. Copy `.env.example` to `.env` and fill in the values locally.
- **No Shared Folder Edits**: Do not edit files outside of your assigned feature modules unless explicitly agreed during team meetings.

---

## 2. Commit Conventions
We use the **Conventional Commits** standard to keep our git history legible and structured.

### Commit Format
```text
<type>(<scope>): <short summary>

[optional body]
```

### Allowed Types
- `feat`: A new feature implementation (e.g. `feat(auth): implement signup form validation`).
- `fix`: A bug fix (e.g. `fix(leave): correct total days calculations`).
- `docs`: Documentation-only updates (e.g. `docs(api): update check-in payload format`).
- `style`: Changes that do not affect code logic (formatting, semi-colons, Tailwind cleanup).
- `refactor`: Structural refactoring with no behavior changes (e.g. `refactor(attendance): modularize dashboard widgets`).
- `test`: Adding or correcting tests.
- `chore`: General build tool, configuration, or dependency updates.

---

## 3. Pull Request Requirements
Before submitting a pull request from your feature branch to `develop`:
1. Ensure your local branch is updated with the latest code from `origin/develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/<your-feature-name>
   git merge develop
   ```
2. Resolve any merge conflicts locally and run tests.
3. Verify that the frontend builds successfully (`npm run build`).
4. Ensure your code compiles and the backend server starts without errors.
5. Get approval from at least one other team member.
