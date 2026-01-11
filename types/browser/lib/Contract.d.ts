/**
 * Contract represents a successful negotiation between Terms.
 * It handles validation and compatibility checking between what
 * one action provides and what another accepts.
 */
export default class Contract {
    /**
     * Extracts the actual schema from a terms definition
     *
     * @param {object} definition - Terms definition with TLD descriptor
     * @returns {object} Extracted schema content
     * @throws {Sass} If definition structure is invalid
     * @private
     */
    private static "__#private@#extractSchemaFromTerms";
    /**
     * Creates a contract from terms with schema validation
     *
     * @param {string} name - Contract identifier
     * @param {object} termsDefinition - The terms definition
     * @param {import('ajv').ValidateFunction|null} [validator] - Optional AJV schema validator function with .errors property
     * @param {Function} [debug] - Debug function
     * @returns {Contract} New contract instance
     */
    static fromTerms(name: string, termsDefinition: object, validator?: import("ajv").ValidateFunction | null, debug?: Function): Contract;
    /**
     * Creates a contract by negotiating between provider and consumer terms
     *
     * @param {import("./Terms.js").default} providerTerms - What the provider offers
     * @param {import("./Terms.js").default} consumerTerms - What the consumer expects
     * @param {object} options - Configuration options
     * @param {Function} [options.debug] - Debug function
     */
    constructor(providerTerms: import("./Terms.js").default, consumerTerms: import("./Terms.js").default, { debug }?: {
        debug?: Function;
    });
    /**
     * Validates data against this contract
     *
     * @param {object} data - Data to validate
     * @returns {boolean} True if valid
     * @throws {Sass} If validation fails or contract not negotiated
     */
    validate(data: object): boolean;
    /**
     * Check if contract negotiation was successful
     *
     * @returns {boolean} True if negotiated
     */
    get isNegotiated(): boolean;
    /**
     * Get the provider terms (if any)
     *
     * @returns {import("./Terms.js").default|null} Provider terms
     */
    get providerTerms(): import("./Terms.js").default | null;
    /**
     * Get the consumer terms (if any)
     *
     * @returns {import("./Terms.js").default|null} Consumer terms
     */
    get consumerTerms(): import("./Terms.js").default | null;
    /**
     * Get the contract validator
     *
     * @returns {(data: object) => boolean|null} The contract validator function
     */
    get validator(): (data: object) => boolean | null;
    #private;
}
//# sourceMappingURL=Contract.d.ts.map