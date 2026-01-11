import JSON5 from "json5"
import yaml from "yaml"
import {Data, FileObject, Sass, Valid} from "@gesslar/toolkit"
import {Terms as BrowserTerms} from "../browser/index.js"

const refex = /^ref:\/\/(?<file>.*)$/

/**
 * Node-enhanced Terms with file reference support.
 * Extends the browser version with ref:// file loading capabilities and uses Node Sass for errors.
 */
export default class Terms extends BrowserTerms {
  /**
   * Parses terms data, handling file references
   *
   * @param {string|object} termsData - Terms data or reference
   * @param {import("./DirectoryObject.js").DirectoryObject?} directoryObject - Directory context for file resolution
   * @returns {object} Parsed terms data
   */
  static async parse(termsData, directoryObject) {
    if(Data.isBaseType(termsData, "String")) {
      const match = refex.exec(termsData)

      if(match?.groups?.file) {
        Valid.type(directoryObject, "DirectoryObject")

        const file = new FileObject(match.groups.file, directoryObject)

        return await file.loadData()
      }

      // Try parsing as JSON5/YAML (using Node Sass for errors)
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
}
