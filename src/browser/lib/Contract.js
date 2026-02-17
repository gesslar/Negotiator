import {Data, Sass} from "@gesslar/toolkit"
import Schemer from "./Schemer.js"

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
  #providerTerms = null
  #consumerTerms = null
  #validator = null
  #debug = null
  #isNegotiated = false

  /**
   * Negotiates a contract between provider and consumer terms
   *
   * @param {Terms|object} providerTerms - What the provider offers (Terms instance or plain definition)
   * @param {Terms|object} consumerTerms - What the consumer expects (Terms instance or plain definition)
   * @param {object} options - Configuration options
   * @param {Function} [options.debug] - Debug function
   * @returns {Promise<Contract>} Negotiated contract
   */
  static async negotiate(providerTerms, consumerTerms, {debug = null} = {}) {
    const contract = new this()

    contract.#providerTerms = providerTerms
    contract.#consumerTerms = consumerTerms
    contract.#debug = debug

    contract.#negotiate()

    return contract
  }

  /**
   * Extracts the actual schema from a terms definition
   *
   * @param {object} definition - Terms definition with TLD descriptor
   * @returns {object} Extracted schema content
   * @throws {Sass} If definition structure is invalid
   * @private
   */
  static #extractSchemaFromTerms(definition) {
    // Must be a plain object
    if(!Data.isPlainObject(definition)) {
      throw Sass.new("Terms definition must be a plain object")
    }

    // Must have exactly one key (the TLD/descriptor)
    const keys = Object.keys(definition)
    if(keys.length !== 1) {
      throw Sass.new("Terms definition must have exactly one top-level key (descriptor)")
    }

    // Extract the content under the TLD
    const [key] = keys

    return definition[key]
  }

  /**
   * Creates a contract from terms with schema validation
   *
   * @param {string} name - Contract identifier
   * @param {object} termsDefinition - The terms definition
   * @param {ValidateFunction} [validator] - Optional AJV schema validator function with .errors property
   * @param {Function} [debug] - Debug function
   * @returns {Contract} New contract instance
   */
  static fromTerms(name, termsDefinition, validator = null, debug = null) {
    // Validate the terms definition if validator provided
    if(validator) {
      const valid = validator(termsDefinition)

      if(!valid) {
        const error = Schemer.reportValidationErrors(validator.errors)
        throw Sass.new(`Invalid terms definition for ${name}:\n${error}`)
      }
    }

    // Extract schema from terms definition for validation
    const schemaDefinition = Contract.#extractSchemaFromTerms(termsDefinition)
    const termsSchemaValidator = Schemer.getValidator(schemaDefinition)

    const contract = new this()
    contract.#validator = termsSchemaValidator
    contract.#debug = debug
    contract.#isNegotiated = true // Single-party contract is automatically negotiated

    return contract
  }

  /**
   * Performs negotiation between provider and consumer terms
   *
   * @private
   */
  #negotiate() {
    // Single-party contracts are only allowed when both are explicitly null
    // (use Contract.fromTerms() for single-party contracts with validation)
    if(!this.#providerTerms && !this.#consumerTerms) {
      // Explicit single-party contract scenario (both null)
      this.#isNegotiated = true

      return
    }

    // If only one party is missing, that's an error - not a valid contract
    if(!this.#providerTerms || !this.#consumerTerms) {
      throw Sass.new(
        "Both provider and consumer terms are required for contract " +
        "negotiation. Use Contract.fromTerms() for single-party contracts."
      )
    }

    // Extract content for comparison (ignore TLD metadata)
    // Support both Terms instances and plain definition objects
    const providerDef = this.#providerTerms.definition ?? this.#providerTerms
    const consumerDef = this.#consumerTerms.definition ?? this.#consumerTerms
    const providerContent = Contract.#extractSchemaFromTerms(providerDef)
    const consumerContent = Contract.#extractSchemaFromTerms(consumerDef)

    // Compare terms for compatibility
    const compatibility = this.#compareTerms(providerContent, consumerContent)

    if(compatibility.status === "error") {
      throw Sass.new(
        `Contract negotiation failed: ${compatibility.errors.map(e => e.message).join(", ")}`
      )
    }

    this.#isNegotiated = true
    this.#validator = Schemer.getValidator(providerContent)

    this.#debug?.(`Contract negotiated successfully`, 3)
  }

  /**
   * Validates data against this contract
   *
   * @param {object} data - Data to validate
   * @returns {boolean} True if valid
   * @throws {Sass} If validation fails or contract not negotiated
   */
  validate(data) {
    const debug = this.#debug

    if(!this.#isNegotiated)
      throw Sass.new("Cannot validate against unnegotiated contract")

    if(!this.#validator)
      throw Sass.new("No validator available for this contract")

    debug?.("Validating data %o", 4, data)

    const valid = this.#validator(data)

    if(!valid) {
      const error = Schemer.reportValidationErrors(this.#validator.errors)
      throw Sass.new(`Contract validation failed:\n${error}`)
    }

    return true
  }

  /**
   * Compares terms for compatibility
   *
   * @param {object} providerSchema - JSON Schema offered by provider
   * @param {object} consumerSchema - JSON Schema expected by consumer
   * @param {Array<string>} stack - Stack trace for nested validation
   * @returns {{status: string, errors: Array<Sass>}} Result with status and errors
   * @private
   */
  #compareTerms(providerSchema, consumerSchema, stack = []) {
    const debug = this.#debug
    const breadcrumb = key => (stack.length ? `@${[...stack, key].join(".")}` : "")
    const errors = []

    if(!providerSchema || !consumerSchema) {
      return {
        status: "error",
        errors: [Sass.new("Both provider and consumer terms are required")]
      }
    }

    const providerProps = providerSchema.properties ?? {}
    const consumerProps = consumerSchema.properties ?? {}
    const consumerRequired = new Set(consumerSchema.required ?? [])

    debug?.("Comparing provider keys:%o with consumer keys:%o", 3,
      Object.keys(providerProps), Object.keys(consumerProps))

    // Check that consumer requirements are met by provider
    for(const [key, consumerProp] of Object.entries(consumerProps)) {
      const isRequired = consumerRequired.has(key)

      debug?.("Checking consumer requirement: %o [required = %o]", 3,
        key, isRequired)

      if(isRequired && !(key in providerProps)) {
        debug?.("Provider missing required capability: %o", 2, key)
        const path = breadcrumb(key)
        errors.push(
          Sass.new(`Provider missing required capability: ${key}${path ? ` ${path}` : ""}`)
        )
        continue
      }

      if(key in providerProps) {
        const expectedType = consumerProp.type
        const providedType = providerProps[key]?.type

        if(expectedType && providedType && expectedType !== providedType) {
          const path = breadcrumb(key)
          errors.push(
            Sass.new(
              `Type mismatch for ${key}: Consumer expects ${expectedType}, provider offers ${providedType}${path ? ` ${path}` : ""}`
            )
          )
        }

        // Recursive validation for nested properties
        if(consumerProp.properties) {
          debug?.("Recursing into nested requirement: %o", 3, key)
          const nestedResult = this.#compareTerms(
            providerProps[key],
            consumerProp,
            [...stack, key]
          )

          if(nestedResult.errors.length) {
            errors.push(...nestedResult.errors)
          }
        }
      }
    }

    return {status: errors.length === 0 ? "success" : "error", errors}
  }

  /**
   * Check if contract negotiation was successful
   *
   * @returns {boolean} True if negotiated
   */
  get isNegotiated() {
    return this.#isNegotiated
  }

  /**
   * Get the provider terms (if any)
   *
   * @returns {Terms|object|null} Provider terms
   */
  get providerTerms() {
    return this.#providerTerms
  }

  /**
   * Get the consumer terms (if any)
   *
   * @returns {Terms|object|null} Consumer terms
   */
  get consumerTerms() {
    return this.#consumerTerms
  }

  /**
   * Get the contract validator
   *
   * @returns {(data: object) => boolean|null} The contract validator function
   */
  get validator() {
    return this.#validator
  }
}
