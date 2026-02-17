import {Contract as BrowserContract} from "../../browser/index.js"

/**
 * @import {Terms} from "./Terms.js"
 */

/**
 * Node-enhanced Contract with file reference support.
 * Extends the browser version to allow node-specific preprocessing
 * (e.g., resolving ref:// file schemas) before negotiation.
 */
export default class Contract extends BrowserContract {
  /**
   * Negotiates a contract between provider and consumer terms.
   * Node version — override point for file-based schema resolution.
   *
   * @param {Terms|object} providerTerms - What the provider offers (Terms instance or plain definition)
   * @param {Terms|object} consumerTerms - What the consumer expects (Terms instance or plain definition)
   * @param {object} options - Configuration options
   * @param {Function} [options.debug] - Debug function
   * @returns {Promise<Contract>} Negotiated contract
   */
  static async negotiate(providerTerms, consumerTerms, {debug = null} = {}) {
    // Node-specific preprocessing would go here
    // e.g., resolving ref:// file schemas via node Schemer

    return super.negotiate(providerTerms, consumerTerms, {debug})
  }
}
