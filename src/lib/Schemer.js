import {Schemer as BrowserSchemer} from "../browser/index.js"
import {Data, Valid} from "@gesslar/toolkit"

/**
 * Node-enhanced Schemer with file-based schema loading capabilities.
 * Extends the browser version with FileObject support and uses Node Sass for errors.
 *
 * Usage:
 *   - Use Schemer.fromFile(file, options) to create a validator from a FileObject.
 *   - Use Schemer.from(schemaData, options) to create a validator from a schema object.
 *   - Use Schemer.getValidator(schema, options) to get a raw AJV validator function.
 *   - Use Schemer.reportValidationErrors(errors) to format AJV validation errors.
 */
export default class Schemer extends BrowserSchemer {
  static async from(schemaData={}, options={}) {
    Valid.assert(Data.isPlainObject(schemaData), "Schema data must be a plain object.")
    Valid.assert(Data.isPlainObject(options), "Options must be a plain object.")

    return Schemer.getValidator(schemaData, options)
  }

  static async fromFile(file, options={}) {
    Valid.type(file, "FileObject")
    Valid.assert(Data.isPlainObject(options), "Options must be a plain object.")

    const schemaData = await file.loadData()

    return Schemer.getValidator(schemaData, options)
  }
}
