/**
 * Node-enhanced Schemer with file-based schema loading capabilities.
 * Extends the browser version with FileObject support and uses Node Sass for errors.
 *
 * Usage:
 *   - Use Schemer.fromFile(file, options) to create a validator from a FileObject.
 *   - Use Schemer.from(schemaData, options) to create a validator from a schema object.
 *   - Use Schemer.getValidator(schema, options) to get a raw AJV validator function.
 *   - Use Schemer.reportValidationErrors(errors) to format AJV validation errors.
 */
export default class Schemer extends BrowserSchemer {
    static fromFile(file: any, options?: {}): Promise<(data: unknown) => boolean>;
}
import { Schemer as BrowserSchemer } from "../browser/index.js";
//# sourceMappingURL=Schemer.d.ts.map