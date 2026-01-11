import uglify from "@gesslar/uglier"

export default [
  ...uglify({
    with: ["lints-js", "lints-jsdoc", "web", "node"],
    overrides: {
      "lints-js": {files: ["src/**/*.js"]},
      "lints-jsdoc": {files: ["src/**/*.js"]},
      web: {files: ["src/browser/**/*.js"]},
      node: {files: ["src/**/*.js", "!src/browser/**"]},
    }
  })
]
