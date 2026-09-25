#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# Gathos · agent skill installer (shim)
#
# This script lives at https://gathos.com/install.sh and simply
# fetches + runs the canonical installer from the open-source repo:
#   https://github.com/yashaiguy-dev/gathos
#
# The real installer auto-detects your agent (Claude Code, Gemini
# CLI, Cursor, Windsurf), downloads the Gathos skill, and drops it
# in the right place. Source: the `install.sh` in the repo above.
#
# Audit what's about to run:
#   curl -sSL https://raw.githubusercontent.com/yashaiguy-dev/gathos/main/install.sh | less
# ─────────────────────────────────────────────────────────────

set -euo pipefail

readonly REPO="yashaiguy-dev/gathos"
readonly BRANCH="main"
readonly CANONICAL="https://raw.githubusercontent.com/${REPO}/${BRANCH}/install.sh"

if ! command -v curl >/dev/null 2>&1; then
  printf '\033[31merror:\033[0m curl is required but not installed on this system.\n' >&2
  printf 'Install curl, then re-run:\n  curl -sSL https://gathos.com/install.sh | bash\n' >&2
  exit 1
fi

# Small banner so users see what's happening before it runs
printf '\n'
printf '  ╭──────────────────────────────────────────────╮\n'
printf '  │  \033[1mGathos\033[0m · agent skill installer              │\n'
printf '  │  fetching from github.com/%s  │\n' "$REPO"
printf '  ╰──────────────────────────────────────────────╯\n'
printf '\n'

# Pipe the canonical installer through bash. -f makes curl exit non-zero on
# HTTP errors so we don't pipe an error page into bash.
if ! curl -fsSL "$CANONICAL" | bash; then
  printf '\n\033[31m✗ installation failed.\033[0m\n' >&2
  printf 'See source + troubleshooting at https://github.com/%s\n' "$REPO" >&2
  exit 1
fi
