# Contributing to molde-ui

Thank you for your interest in contributing to molde-ui! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- A clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Your environment (OS, Node version, React version, etc.)
- Screenshots if applicable

### Suggesting Features

We welcome feature suggestions! Please open an issue with:

- A clear description of the feature
- Use cases and examples
- How it would benefit the library
- Any implementation ideas (optional)

### Pull Requests

#### Before You Start

1. **Check existing issues and PRs** to avoid duplicate work
2. **Open an issue first** for major changes to discuss the approach
3. **Fork the repository** and create a new branch from `main`

#### Branch Naming

Use descriptive branch names:

- `feature/component-name` - New components
- `fix/bug-description` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/component-name` - Code refactoring

#### Development Setup

```bash
# Clone your fork
git clone https://github.com/MoldeDevelopment/molde-ui.git
cd molde-ui

# Install dependencies
pnpm install

# Run dev playground
pnpm dev

# Run tests
pnpm test

# Run linter
pnpm lint

# Run type check
pnpm type-check
```

#### Code Standards

1. **TypeScript**: All code must be in TypeScript with proper types
2. **ESLint**: Follow our ESLint configuration (run `pnpm lint`)
3. **Prettier**: Code must be formatted with Prettier (run `pnpm format`)
4. **Tests**: New components must have unit tests
5. **Documentation**: Update README.md for new components or changes

#### Component Guidelines

When creating a new component:

1. **Follow existing patterns**: Look at the Menu component as a reference
2. **Export types**: Export all TypeScript types/interfaces
3. **Accessibility**: Include ARIA attributes and keyboard navigation
4. **Zero-config**: CSS should be automatically applied
5. **Tree-shakeable**: Ensure components can be tree-shaken
6. **Tests**: Add unit tests with Vitest

#### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Button component
fix: correct Menu keyboard navigation
docs: update Menu component examples
refactor: simplify MenuItem logic
test: add tests for Menu subitems
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Pull Request Process

1. **Create a branch** from `main`
2. **Make your changes** following our code standards
3. **Write or update tests** as needed
4. **Ensure all tests pass** (`pnpm test`)
5. **Ensure linting passes** (`pnpm lint`)
6. **Ensure type checking passes** (`pnpm type-check`)
7. **Update documentation** if needed
8. **Write a clear PR description**:
   - What changed and why
   - How to test
   - Screenshots (if UI changes)
   - Related issues

#### PR Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project's code style
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Documentation is updated
- [ ] Commit messages follow Conventional Commits
- [ ] Branch is up to date with `main`
- [ ] PR description is clear and complete

#### Review Process

- PRs require at least one approval
- All CI checks must pass
- Maintainers may request changes
- Be responsive to feedback

#### Adding New Components

If you're adding a new component:

1. Create component in `src/components/[ComponentName]/`
2. Export from `src/index.ts`
3. Add types to `src/components/[ComponentName]/types.ts`
4. Create tests in `src/components/[ComponentName]/[ComponentName].test.tsx`
5. Update README.md with component documentation
6. Add example to dev playground (`dev/App.tsx`)

#### Code Review Guidelines

- Be respectful and constructive
- Explain your reasoning
- Ask questions if something is unclear
- Be open to suggestions
- Keep discussions focused on the code

## Questions?

If you have questions:

- Open a [discussion](https://github.com/MoldeDevelopment/molde-ui/discussions)
- Check existing issues
- Review the code and documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to molde-ui! 🎉
