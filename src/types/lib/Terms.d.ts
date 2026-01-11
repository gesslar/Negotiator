/**
 * Node-enhanced Terms with file reference support.
 * Extends the browser version with ref:// file loading capabilities and uses Node Sass for errors.
 */
export default class Terms {
    /**
     * Parses terms data, handling file references
     *
     * @param {string|object} termsData - Terms data or reference
     * @param {import("./DirectoryObject.js").DirectoryObject?} directoryObject - Directory context for file resolution
     * @returns {object} Parsed terms data
     */
    static parse(termsData: string | object, directoryObject: any | null): object;
}
//# sourceMappingURL=Terms.d.ts.map