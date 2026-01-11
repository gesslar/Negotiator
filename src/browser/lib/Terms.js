import {Data, Sass} from "@gesslar/toolkit"
import JSON5 from "json5"
import yaml from "yaml"

/**
 * Terms represents an interface definition - what an action promises to provide or accept.
 * It's just the specification, not the negotiation. Contract handles the negotiation.
 */
export default class Terms {
  #definition = null

  constructor(definition) {
    this.#definition = definition
  }

  /**
   * Parses terms data from strings or objects
   *
   * @param {string|Record<string, unknown>} termsData - Terms data to parse
   * @returns {Promise<Record<string, unknown>>} Parsed terms data
   */
  static async parse(termsData) {
    if(Data.isType(termsData, "String")) {
      // Try parsing as JSON5 first, then fall back to YAML
      // JSON5 must be tried first because YAML is too forgiving - it will parse
      // invalid JSON5 as a string without throwing, preventing proper validation
      try {
        const result = JSON5.parse(termsData)

        return result
      } catch {
        try {
          const result = yaml.parse(termsData)

          return result
        } catch {
          throw Sass.new(`Could not parse terms data as YAML or JSON: ${termsData}`)
        }
      }
    }

    if(Data.isType(termsData, "Object"))
      return termsData

    throw Sass.new(`Invalid terms data type: ${typeof termsData}`)
  }

  /**
   * Get the terms definition
   *
   * @returns {Record<string, unknown>} The terms definition
   */
  get definition() {
    return this.#definition
  }

}
