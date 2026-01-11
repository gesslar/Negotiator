#!/usr/bin/env node

import {rmSync} from "node:fs"
import {execSync} from "node:child_process"

// Remove existing types directory
try {
  rmSync("src/types", {recursive: true, force: true})
} catch {
  // Ignore if directory doesn't exist
}

// Build types
execSync("tsc -p tsconfig.types.json", {stdio: "inherit"})
