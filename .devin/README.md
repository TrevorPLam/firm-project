# .devin

Configuration directory for AI agent workflows and development automation.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Available Workflows](#available-workflows)
- [Usage](#usage)
- [Creating Workflows](#creating-workflows)
- [License](#license)

## Overview

The `.devin` directory contains workflow definitions for AI coding assistants (Cascade, Devin, etc.). These workflows automate repetitive development tasks, enforce best practices, and ensure consistent execution of complex procedures.

Workflows are defined as markdown files with YAML frontmatter and follow a structured step-by-step format that AI agents can execute systematically.

## Directory Structure

```
.devin/
└── workflows/
    ├── README.md    # Workflows directory documentation
    └── todo.md      # Execute first open task from TODO.md
```

## Available Workflows

### `/todo` - Execute Next Task Workflow

Executes the first incomplete task from `TODO.md` with comprehensive research, best practices application, quality assurance, and version control.

**Description**: Executes the first open task from TODO.md with research, best practices, QA, and commit

**Steps**:
1. Read TODO.md and identify first incomplete task
2. Assess repository structure and related files
3. Conduct online research on task topics
4. Validate task relevance and update if needed
5. Execute task following DDD, TDD, BDD, and deep modules principles
6. Run quality assurance (typecheck, lint, tests, coverage)
7. Mark task complete in TODO.md
8. Verify and document any discovered issues
9. Commit changes with conventional commit message and push

**Usage**: Invoke via slash command `/todo` in your AI assistant interface

## Usage

Workflows are invoked through your AI assistant's slash command interface. Each workflow file corresponds to a slash command (e.g., `todo.md` → `/todo`).

When a workflow is invoked:
1. The AI assistant reads the workflow file
2. Executes each step sequentially
3. Follows any `// turbo` annotations for auto-running safe commands
4. Provides progress updates and results

## Creating Workflows

To add a new workflow:

1. Create a new markdown file in `.devin/workflows/`
2. Add YAML frontmatter with a `description` field
3. Document the workflow purpose and steps
4. Use `// turbo` annotations above steps that can be auto-run safely
5. Follow the existing workflow structure for consistency

**Example workflow file**:

```markdown
---
description: Brief description of what this workflow does
---

# Workflow Name

Detailed description of the workflow.

## Steps

1. First step description
2. Second step description
// turbo
3. Third step description (auto-run safe)

## Notes

Additional context or precautions.
```

The workflow filename (without `.md`) becomes the slash command name.

## License

UNLICENSED - Private project. All rights reserved.
