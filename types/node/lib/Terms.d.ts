/**
 * Node-enhanced Terms with file reference support.
 * Extends the browser version with ref:// file loading capabilities and uses Node Sass for errors.
 */
export default class Terms extends BrowserTerms {
    /**
     * Parses terms data, handling file references
     *
     * @param {string|object} termsData - Terms data or reference
     * @param {DirectoryObject?} directoryObject - Directory context for file resolution
     * @returns {Promise<object>} Parsed terms data
     */
    static parse(termsData: string | object, directoryObject: DirectoryObject | null): Promise<object>;
}
import { Terms as BrowserTerms } from "../../browser/index.js";
import type { DirectoryObject } from "@gesslar/toolkit";
//# sourceMappingURL=Terms.d.ts.map