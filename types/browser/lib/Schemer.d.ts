/**
 * Schemer provides utilities for compiling and validating JSON schemas using AJV.
 *
 * Usage:
 *   - Use `Schemer.fromUrl(url, options)` to create a validator from a URL.
 *   - Use `Schemer.from(schemaData, options)` to create a validator from a schema object.
 *   - Use `Schemer.getValidator(schema, options)` to get a raw AJV validator function.
 *   - Use `Schemer.reportValidationErrors(errors)` to format AJV validation errors.
 */
export default class Schemer {
    /**
     * Creates a validator function from a schema URL
     *
     * @param {URL|string} url - The URL to fetch the schema from
     * @param {object} [options={}] - AJV options
     * @returns {Promise<(data: unknown) => boolean>} The AJV validator function, which may have additional properties (e.g., `.errors`)
     */
    static fromUrl(url: URL | string, options?: object): Promise<(data: unknown) => boolean>;
    static from(schemaData?: {}, options?: {}): Promise<(data: unknown) => boolean>;
    /**
     * Creates a validator function from a schema object
     *
     * @param {object} schema - The schema to compile
     * @param {object} [options] - AJV options
     * @returns {(data: unknown) => boolean} The AJV validator function, which may have additional properties (e.g., `.errors`)
     */
    static getValidator(schema: object, options?: object): (data: unknown) => boolean;
    static reportValidationErrors(errors: any): any;
}
//# sourceMappingURL=Schemer.d.ts.map