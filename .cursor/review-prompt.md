# Full Library Review Prompt for Cursor

Use this prompt in Cursor to request a comprehensive review of the entire codebase:

---

**Perform a comprehensive review of the entire `@gesslar/negotiator` library codebase. Review all source files, exports, types, tests, and configuration for correctness, sanity, consistency, and best practices. This is NOT a diff review - analyze the complete current state of the library.**

## Review Scope

### 1. **Architecture & Exports**
- Verify dual entry point architecture (`src/index.js` for Node, `src/browser/index.js` for browser)
- Check that `package.json` exports map correctly matches actual file structure
- Verify all classes are exported from appropriate entry points
- Ensure browser-safe classes are available from both entry points
- Verify Node-enhanced classes are only in Node entry point
- Check that type definitions (`src/types/`) align with actual exports

### 2. **API Consistency**
- Verify all public methods have proper JSDoc documentation
- Check that JSDoc types match actual implementation signatures
- Ensure method names, parameter names, and return types are consistent across browser/Node versions
- Verify that inherited methods from browser classes work correctly in Node-enhanced versions
- Check that static methods are properly documented and accessible

### 3. **Code Correctness**
- Review error handling: are errors thrown with appropriate types and messages?
- Check edge cases: null, undefined, empty strings/arrays/objects, invalid inputs
- Verify type validation: are user inputs properly validated before processing?
- Review async operations: proper error handling, await usage, promise chains
- Check for potential runtime errors: destructuring from null, accessing undefined properties, etc.
- Verify parsing logic: JSON5 vs YAML order, error messages, fallback behavior

### 4. **Dependency Management**
- Verify all imports are used (no unused dependencies)
- Check that Node-only modules (`node:fs`, `node:path`, `node:url`, `undici`) are NOT in browser code
- Verify browser code uses only browser-safe APIs (`fetch`, not `undici`)
- Check that `package.json` dependencies match actual imports
- Verify `undici` is only used if needed (or removed if not)

### 5. **Type Definitions**
- Verify `src/types/` files are auto-generated from JSDoc (don't manually edit)
- Check that type definitions match actual exports in `package.json`
- Verify browser types (`src/types/browser/`) are separate from Node types
- Check that type paths in `package.json` exports map point to correct locations
- Ensure all exported classes have corresponding type definitions

### 6. **Test Coverage & Quality**
- Verify tests cover happy paths, edge cases, and error conditions
- Check that tests use proper imports (package-style, not relative paths)
- Verify tests for both browser and Node entry points exist
- Check that test descriptions match actual behavior
- Verify test utilities are used appropriately

### 7. **Documentation Alignment**
- Check that code comments match actual implementation
- Verify JSDoc accurately describes method behavior
- Check that test descriptions match code behavior (not outdated expectations)
- Verify README (if present) matches actual API

### 8. **Configuration Files**
- Verify `package.json` scripts are correct and cross-platform compatible
- Check `tsconfig.types.json` configuration for type generation
- Verify `eslint.config.js` covers all source files appropriately
- Check `.gitignore` and `.npmignore` are appropriate

### 9. **Pattern Consistency**
- Verify naming conventions are consistent (PascalCase for classes, camelCase for methods)
- Check error handling patterns are consistent across classes
- Verify import/export patterns match codebase style
- Check that code structure follows established patterns

### 10. **Security & Best Practices**
- Check for potential security issues (unsafe eval, path traversal, etc.)
- Verify input sanitization where appropriate
- Check that error messages don't leak sensitive information
- Verify proper use of private fields (`#private`) where appropriate

## Output Format

For each issue found, provide:
1. **File path and line numbers** (if applicable)
2. **Issue description** (what's wrong)
3. **Impact** (why it matters)
4. **Suggested fix** (how to resolve it)
5. **Severity** (critical, high, medium, low)

Group issues by category and prioritize critical/high severity issues first.

---

**Note**: Focus on correctness, sanity, and consistency. Flag any discrepancies between documentation and implementation, export mismatches, type definition issues, or architectural inconsistencies.
