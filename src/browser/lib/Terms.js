import {Data, Sass} from "@gesslar/toolkit"
import JSON5 from "json5"
import yaml from "yaml"

// import Valid from "./Valid.js"

// const refex = /^ref:\/\/(?<file>.*)$/

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
   * @param {string|object} termsData - Terms data to parse
   * @param {object} [_directoryObject] - Reserved for server implementation (file references)
   * @returns {object} Parsed terms data
   */
  static async parse(termsData, _directoryObject) {
    // File reference support is server-only (requires FileObject/DirectoryObject)
    // if(Data.isBaseType(termsData, "String")) {
    //   const match = refex.exec(termsData)
    //
    //   if(match?.groups?.file) {
    //     Valid.type(directoryObject, "DirectoryObject")
    //
    //     const file = new FileObject(match.groups.file, directoryObject)
    //
    //     return await file.loadData()
    //   }
    // }

    if(Data.isBaseType(termsData, "String")) {
      // Try parsing as JSON5/YAML
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

    if(Data.isBaseType(termsData, "Object")) {
      return termsData
    }

    throw Sass.new(`Invalid terms data type: ${typeof termsData}`)
  }

  /**
   * Get the terms definition
   *
   * @returns {object} The terms definition
   */
  get definition() {
    return this.#definition
  }

}
