/**
 * @import {Terms} from "./Terms.js"
 * @import {ValidateFunction} from "ajv"
 */
/**
 * Contract represents a successful negotiation between Terms.
 * It handles validation and compatibility checking between what
 * one action provides and what another accepts.
 */
export default class Contract {
    /**
     * Negotiates a contract between provider and consumer terms
     *
     * @param {Terms|object} providerTerms - What the provider offers (Terms instance or plain definition)
     * @param {Terms|object} consumerTerms - What the consumer expects (Terms instance or plain definition)
     * @param {object} options - Configuration options
     * @param {Function} [options.debug] - Debug function
     * @returns {Promise<Contract>} Negotiated contract
     */
    static negotiate(providerTerms: Terms | object, consumerTerms: Terms | object, { debug }?: {
        debug?: Function;
    }): Promise<Contract>;
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
     * @param {ValidateFunction} [validator] - Optional AJV schema validator function with .errors property
     * @param {Function} [debug] - Debug function
     * @returns {Contract} New contract instance
     */
    static fromTerms(name: string, termsDefinition: object, validator?: ValidateFunction, debug?: Function): Contract;
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
     * @returns {Terms|object|null} Provider terms
     */
    get providerTerms(): Terms | object | null;
    /**
     * Get the consumer terms (if any)
     *
     * @returns {Terms|object|null} Consumer terms
     */
    get consumerTerms(): Terms | object | null;
    /**
     * Get the contract validator
     *
     * @returns {(data: object) => boolean|null} The contract validator function
     */
    get validator(): (data: object) => boolean | null;
    #private;
}
import type { ValidateFunction } from "ajv";
//# sourceMappingURL=Contract.d.ts.map