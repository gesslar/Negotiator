import {Data, Sass, Util, Valid} from "@gesslar/toolkit"
import Ajv from "ajv"

/**
 * Schemer provides utilities for compiling and validating JSON schemas using AJV.
 *
 * Usage:
 *   - Use `Schemer.fromUrl(url, options)` to create a validator from a URL.
 *   - Use `Schemer.from(schemaData, options)` to create a validator from a schema object.
 *   - Use `Schemer.getValidator(schema, options)` to get a raw AJV validator function.
 *   - Use `Schemer.reportValidationErrors(errors)` to format AJV validation errors.
 */
export default class Schemer {
  /**
   * Creates a validator function from a schema URL
   *
   * @param {URL|string} url - The URL to fetch the schema from
   * @param {object} [options={}] - AJV options
   * @returns {Promise<(data: unknown) => boolean>} The AJV validator function, which may have additional properties (e.g., `.errors`)
   */
  static async fromUrl(url, options={}) {
    Valid.type(url, "URL|String")
    Valid.assert(Data.isPlainObject(options), "Options must be a plain object.")

    try {
      if(Data.isType(url, "String"))
        url = new URL(url)

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Schemer",
          "Accept": "application/json",
          "Cache-Control": "max-age=604800"
        },
        method: "GET",
        redirect: "follow"
      })

      if(!response.ok)
        throw Sass.new(response.statusText)

      const json = await response.json()

      return Schemer.getValidator(json, options)
    } catch(error) {
      throw Sass.new(`Unable to load schema from ${url}`, error)
    }
  }

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
   * Creates a validator function from a schema object
   *
   * @param {object} schema - The schema to compile
   * @param {object} [options] - AJV options
   * @returns {(data: unknown) => boolean} The AJV validator function, which may have additional properties (e.g., `.errors`)
   */
  static getValidator(schema, options = {allErrors: true, verbose: true}) {
    const ajv = new Ajv(options)

    return ajv.compile(schema)
  }

  static reportValidationErrors(errors) {
    if(!errors) {
      return ""
    }

    return errors.reduce((errorMessages, error) => {
      let msg = `- "${error.instancePath || "(root)"}" ${error.message}`

      if(error.params) {
        const details = []

        if(error.params.type)
          details.push(`  ➜ Expected type: ${error.params.type}`)

        if(error.params.missingProperty)
          details.push(`  ➜ Missing required field: ${error.params.missingProperty}`)

        if(error.params.allowedValues) {
          details.push(`  ➜ Allowed values: "${error.params.allowedValues.join('", "')}"`)
          details.push(`  ➜ Received value: "${error.data}"`)
          const closestMatch =
            Util.findClosestMatch(error.data, error.params.allowedValues)

          if(closestMatch)
            details.push(`  ➜ Did you mean: "${closestMatch}"?`)
        }

        if(error.params.pattern)
          details.push(`  ➜ Expected pattern: ${error.params.pattern}`)

        if(error.params.format)
          details.push(`  ➜ Expected format: ${error.params.format}`)

        if(error.params.additionalProperty)
          details.push(`  ➜ Unexpected property: ${error.params.additionalProperty}`)

        if(details.length)
          msg += `\n${details.join("\n")}`
      }

      return errorMessages ? `${errorMessages}\n${msg}` : msg
    }, "")
  }
}
