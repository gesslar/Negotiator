/**
 * Terms represents an interface definition - what an action promises to provide or accept.
 * It's just the specification, not the negotiation. Contract handles the negotiation.
 */
export default class Terms {
    /**
     * Parses terms data from strings or objects
     *
     * @param {string|Record<string, unknown>} termsData - Terms data to parse
     * @returns {Promise<Record<string, unknown>>} Parsed terms data
     */
    static parse(termsData: string | Record<string, unknown>): Promise<Record<string, unknown>>;
    constructor(definition: any);
    /**
     * Get the terms definition
     *
     * @returns {Record<string, unknown>} The terms definition
     */
    get definition(): Record<string, unknown>;
    #private;
}
//# sourceMappingURL=Terms.d.ts.map