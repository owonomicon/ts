# Contributing

## Commit message guidelines

Commit messages roughly follow [Conventional Commits](https://conventionalcommits.org). They should be in the following format:

```
<type>(<package><:scope>)<!>: <tldr>

<body>

<footer>
```

Generally speaking, commits should be imperative and use present tense (e.g. "do" over "did" or "does").

Commit messages should not contain any line over 100 characters.

The `type` describes what kind of thing the commit addresses. It is described in more detail below.

The `package` and optional `scope` narrow what part of the codebase the commit most pertains to. If the commit is equally relevant to multiple areas, join them together with forward slashes `/`. If the commit is not relevant to any specific package, the package and scope and surrounding parentheses may be omitted.

`package` should correspond to the package name, ignoring the organization namespace (if applicable).

`!` should be appended after the type/scope if the commit is a breaking change.

`tldr` provides a brief description of the change. like any good tl;dr, it should not start with a capital letter or end with a period.

The `body` should elaborate more on the change. It should provide details like why the change is being made and discuss the previous behavior and what it does now.

The `footer` closes issues and/or elaborates on breaking changes.
- if the commit closes any issues, it should be on a separate in line in the footer of the form `closes #1, #2, #3, ..."
- if the commit contains breaking changes, the footer should contain a section delineated by a line `BREAKING CHANGE: <tldr>`
- sections of the footer should be separated by blank lines

### Commit types

| type          | description |
| :--           | :--
| `fix`         | patches a bug (this correlates with a SemVer `PATCH`)
| `feat`        | introduces a new feature (this correlates with a SemVer `MINOR`)
| `perf`        | improves performance of existing code
| `style`       | makes changes that do not affect the meaning of the code (e.g. whitespace, formatting, naming convention)
| `refactor`    | rewrites existing code (e.g. rename variable, swap out implementation, rename file/folder, move file/folder)
| `test`        | adds or updates test
| `comment`     | makes changes relating to to adding, removing, or updating comments inside code (e.g. doc comments) 
| `docs`        | makes changes to *external* documentation (i.e. README, docs site, etc; NOT doc comments)
| `build`       | build system (eg. monorepo tooling, linting, npm)
| `ci`          | makes changes relating to continuous integration (e.g. GitHub workflows)
| `chore`       | does "something else" (e.g. update the readme)
| `release`     | updates package version(s) for new release

#### What about revert commits?

If a commit is being reverted, it probably means something went wrong with an earlier commit. Use `fix`, `perf`, whatever is most applicable out of the existing list instead. Reverting is the _implementation_ of the fix or whatever, not the _motivation_.