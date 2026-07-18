# .cursor

Cursor IDE configuration and state directory for the firm project.

## Overview

This directory contains configuration files and runtime state for Cursor, the AI-powered code editor. These files are automatically managed by Cursor and should not be manually edited unless you are configuring Cursor-specific behaviors.

## Directory Structure

```
.cursor/
├── README.md
└── hooks/
    ├── README.md
    └── state/
        ├── README.md
        └── continual-learning.json
```

## Files

- `hooks/README.md` - Documentation for the hooks subdirectory
- `hooks/state/README.md` - Documentation for the hook state subdirectory
- `hooks/state/continual-learning.json` - Runtime state for Cursor's continual learning feature, tracking generation IDs, turn counts, and learning trial timestamps

## Usage

This directory is managed automatically by Cursor IDE. No manual configuration is required for standard development workflows.

## Notes

- Files in this directory are generated and maintained by Cursor
- Manual edits may interfere with Cursor's functionality
- This directory is typically included in `.gitignore` for individual developer setups
- The current configuration is tracked in this repository for team consistency

## Related Documentation

- [Cursor Documentation](https://cursor.com/docs)
- [Project README](../README.md)
