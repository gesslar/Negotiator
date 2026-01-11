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
    static parse(termsData: string | object, directoryObject: import("@gesslar/toolkit").DirectoryObject | null): Promise<object>;
}
import { Terms as BrowserTerms } from "../browser/index.js";
//# sourceMappingURL=Terms.d.ts.map