/**
 * Terms represents an interface definition - what an action promises to provide or accept.
 * It's just the specification, not the negotiation. Contract handles the negotiation.
 */
export default class Terms {
    /**
     * Parses terms data from strings or objects
     *
     * @param {string|object} termsData - Terms data to parse
     * @param {object} [_directoryObject] - Reserved for server implementation (file references)
     * @returns {object} Parsed terms data
     */
    static parse(termsData: string | object, _directoryObject?: object): object;
    constructor(definition: any);
    /**
     * Get the terms definition
     *
     * @returns {object} The terms definition
     */
    get definition(): object;
    #private;
}
//# sourceMappingURL=Terms.d.ts.map