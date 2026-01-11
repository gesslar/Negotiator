import {Data, FileObject, Valid} from "@gesslar/toolkit"
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
   * @param {import("@gesslar/toolkit").DirectoryObject?} directoryObject - Directory context for file resolution
   * @returns {Promise<object>} Parsed terms data
   */
  static async parse(termsData, directoryObject) {
    if(Data.isType(termsData, "String")) {
      const {file} = refex.exec(termsData)?.groups ?? {}

      if(file) {
        Valid.type(directoryObject, "DirectoryObject")

        const fo = new FileObject(file, directoryObject)

        termsData = await fo.loadData()
      }
    }

    return super.parse(termsData)
  }
}
