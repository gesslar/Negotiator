import {Schemer as BrowserSchemer} from "../browser/index.js"
import {Data, Valid} from "@gesslar/toolkit"

/**
 * Node-enhanced Schemer with file-based schema loading capabilities.
 * Extends the browser version with FileObject support and uses Node Sass for errors.
 *
 * Usage:
 *   - Use `Schemer.fromUrl(url, options)` to create a validator from a URL (inherited from browser version).
 *   - Use `Schemer.fromFile(file, options)` to create a validator from a FileObject.
 *   - Use `Schemer.from(schemaData, options)` to create a validator from a schema object.
 *   - Use `Schemer.getValidator(schema, options)` to get a raw AJV validator function.
 *   - Use `Schemer.reportValidationErrors(errors)` to format AJV validation errors.
 */
export default class Schemer extends BrowserSchemer {
  /**
   * Creates a validator function from a schema object
   *
   * @param {object} [schemaData={}] - Schema data object
   * @param {object} [options={}] - AJV options
   * @returns {Promise<(data: unknown) => boolean>} The AJV validator function, which may have additional properties (e.g., `.errors`)
   */
  static async from(schemaData={}, options={}) {
    Valid.assert(Data.isPlainObject(schemaData), "Schema data must be a plain object.")
    Valid.assert(Data.isPlainObject(options), "Options must be a plain object.")

    return Schemer.getValidator(schemaData, options)
  }

  /**
   * Creates a validator function from a FileObject
   *
   * @param {import("@gesslar/toolkit").FileObject} file - FileObject containing schema data
   * @param {object} [options={}] - AJV options
   * @returns {Promise<(data: unknown) => boolean>} The AJV validator function, which may have additional properties (e.g., `.errors`)
   */
  static async fromFile(file, options={}) {
    Valid.type(file, "FileObject")
    Valid.assert(Data.isPlainObject(options), "Options must be a plain object.")

    const schemaData = await file.loadData()

    return Schemer.getValidator(schemaData, options)
  }
}
