# AGENTS.md Playbook — Verified Reference + Template

Corrected against primary sources (AAIF/Linux Foundation announcements, the official
agents.md spec, the ETH Zürich evaluation paper, and Anthropic's own Claude Code docs)
as of July 2026. Use this instead of the original research doc when writing or updating
any AGENTS.md in your repository.

---

## 1. Verified facts (safe to rely on)

- **Governance**: AGENTS.md is stewarded by the Agentic AI Foundation (AAIF), a Linux
  Foundation initiative launched Dec 9, 2025, alongside MCP (Anthropic) and Goose (Block).
  190+ member orgs as of May 2026. Executive Director: Mazin Gilbert.
- **Adoption**: 60,000+ public repos use it; 30+ tools support it including Codex, Cursor,
  Windsurf, Aider, Gemini CLI, GitHub Copilot, Devin, RooCode, Amp, Zed, Warp.
- **Conflict resolution**: the closest AGENTS.md to the edited file wins; explicit
  in-chat user instructions override everything, always.
- **Monorepo precedent**: OpenAI's own monorepo uses 88 nested AGENTS.md files — this is
  the standard's own reference example for exactly your situation (multiple apps/packages
  in one repo).
- **Length**: keep it under ~150 lines / well under the 32 KiB hard limit most tools
  enforce (Codex truncates silently past this). Independent studies converge on 100–150
  lines as the performance sweet spot; longer files show diminishing or reversing returns.
- **Real research verdict (ETH Zürich, arXiv 2602.11988, Feb 2026)**: human-written
  context files give a *marginal* ~4% task-success improvement over no file at all, but
  also increase agent steps and cost (up to ~19%). LLM-auto-generated files (`/init`
  commands) make things *slightly worse* (~3% lower success, ~20%+ more cost) and should
  be avoided — write these by hand.
- **Claude Code does not natively read AGENTS.md** as of mid-2026. It reads CLAUDE.md.
  To keep Claude Code in sync with a shared AGENTS.md, either:
  - make `CLAUDE.md`'s first line `@AGENTS.md` (import), or
  - `ln -s AGENTS.md CLAUDE.md`
  Cursor and Windsurf (your actual tools) both read AGENTS.md natively — no workaround
  needed for your day-to-day setup.
- **Real incidents behind the "boundaries" pattern**: a Replit agent deleted a live
  production database in July 2025 despite an explicit code freeze; a separate Gemini
  CLI incident deleted user files after misreading a command. These are why the
  Always/Ask first/Never tiering below isn't boilerplate — treat "Ask first" and "Never"
  as load-bearing, not decorative.

### Corrections to the original doc
- Drop the "reduces bugs by 35–55%" claim — it does not appear in the ETH Zürich paper
  (or any primary source found) and looks like an unsourced addition from a content-mill
  article that got stapled onto the real 4% figure.
- The "2.45–3.92 extra steps" figure is real, but it's LLM-generated files vs. *no file*,
  not vs. hand-written files.
- Claude Code should not be listed among natively-supporting tools (see above).

---

## 2. Distilled rules for every AGENTS.md in this repo

1. Write it by hand. Never let an agent `/init`-generate one and leave it as-is.
2. Commands before prose — fenced code blocks, exact flags, copy-pasteable.
3. One code example beats three paragraphs for any convention.
4. State *why* a path is off-limits, not just that it is, so agents don't route around it.
5. Don't restate what's already in `package.json` / `nx.json` — link, don't duplicate.
6. Update it in the same PR that changes the convention it describes, not on a schedule.
7. In this monorepo: root AGENTS.md = org-wide standards only. Anything app- or
   package-specific goes in a nested AGENTS.md inside that app/package.

---

## 3. Root `AGENTS.md` template

Copy this to the repo root and fill in the `[...]` placeholders as decisions land.

```markdown
# AGENTS.md

[Project description — what this repo is for, tech stack, deployment target]

## Setup
- Install: `[command]`
- Run dev: `[command]`
- Build: `[command]`
- Test: `[command]`
- Lint/format: `[command]`

## Project structure
- `[directory]` — [purpose]
- `[directory]` — [purpose]
- Every `[subdirectory]` gets its own nested AGENTS.md once its conventions diverge
  from this root file. Agents read the closest AGENTS.md to the file they're editing,
  so keep this root file to org-wide rules only.

## Open decisions (do not assume — ask if a task touches these)
- [Decision 1 — update once decided]
- [Decision 2 — update once decided]

## Code style
- [Linting/formatting tool and rules]
- [Additional conventions: TypeScript strict mode, naming conventions, import order, etc.]

## Testing
- [Framework and how to run tests]
- [Coverage requirements, if any]

## Definition of done
- [Required checks before considering a task done]
- [Commit message convention]
- [Any other completion criteria]

## Boundaries

### Always
- [Action 1 — e.g., run tests before marking done]
- [Action 2 — e.g., use the designated formatter]
- [Action 3 — e.g., ask before touching files outside scope]

### Ask first
- [Change type 1 — e.g., adding dependencies]
- [Change type 2 — e.g., modifying shared libraries]
- [Change type 3 — e.g., changing deploy config]

### Never
- [Prohibited action 1 — e.g., committing secrets]
- [Prohibited action 2 — e.g., direct production deploys]
- [Prohibited action 3 — e.g., modifying live systems outside task scope]
- Auto-generate this file's content via an agent's `/init` — edit it by hand

## Gotchas
- [Fill in as they surface — e.g., cache invalidation quirks, config conflicts, etc.]

## Git workflow
- Branch naming: `[convention]`
- Commits: `[convention]`
- Merge strategy: `[convention]`
```

---

## 4. Nested AGENTS.md — when and how

Add a nested file inside a specific project or package directory as soon as that
project's conventions genuinely differ from the root (a different test runner, a
client-specific constraint, a package with its own release process). Keep nested files
even shorter than the root one — they only need to state what's *different* from the
root, not repeat it.

```markdown
# [path]/AGENTS.md

[Project/package name]. Inherits root AGENTS.md; overrides below.

## [Category]
- [Specific rule 1]
- [Specific rule 2]
- [Specific rule 3]
```

---

## 5. Keeping this current

- Update an AGENTS.md in the same PR/commit that changes the convention it documents —
  don't wait for a scheduled review.
- If you ever add Claude Code to your toolchain, add a one-line `CLAUDE.md` with
  `@AGENTS.md` (or symlink) in every project that has an AGENTS.md, so it isn't flying
  blind.
- Re-check this file's "Verified facts" section every few months — AAIF membership,
  tool support lists, and model-specific behavior (like the Claude Code gap above) are
  all still moving targets in mid-2026.