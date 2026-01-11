# @gesslar/negotiator

Welcome to the wonderful world of SCHEMA VALIDATION and CONTRACT NEGOTIATION
and... uhmm TERMS ARTICULATION!

That sounded impressive.

## Installation

```shell
# npm
npm i -D @gesslar/negotiator

# pnpm
pnpm i -D @gesslar/negotiator

# yarn
yarn add -D @gesslar/negotiator

# bun
bun add -d @gesslar/negotiator

# cinnabon
cinna bon -yum @gesslar/negotiator
```

## Usage

Negotiator is environment aware and automatically detects whether it is being
used in a web browser or in Node.js. You can optionally specify the `node` or
`browser` variant explicitly.

### Browser-like

TypeScript editors do not pick up types from jsDelivr. If you want inline types
without installing from npm, use the esm.sh `?dts` URL or install the package
locally for development and use the CDN at runtime.

#### jsDelivr (runtime only)

```html
https://cdn.jsdelivr.net/npm/@gesslar/negotiator
```

#### esm.sh (runtime, types)

```html
https://esm.sh/@gesslar/negotiator
https://esm.sh/@gesslar/negotiator?dts` (serves `.d.ts` for editors)
```

### Node.js

```javascript
import * as N from "@gesslar/negotiator"
```

```javascript
import {Contract, Schemer, Terms} from "@gesslar/negotiator"
```

```javascript
import {Schemer} from "@gesslar/negotiator/node"
```

```javascript
import {Contract, Schemer, Terms as SideshowBob} from '@gesslar/negotiator/browser'
```

## Examples

### Schemer: Schema Validation

Create validators from JSON Schema objects:

```javascript
import {Schemer} from "@gesslar/negotiator"

// Create a validator from a schema
const userSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    age: {type: "number"},
    email: {type: "string"}
  },
  required: ["name", "email"]
}

const validator = await Schemer.from(userSchema)

// Validate data
const validUser = {name: "Alice", email: "alice@example.com", age: 30}
validator(validUser) // true

// Check errors if validation fails
const invalidUser = {name: "Bob"} // missing email
if (!validator(invalidUser)) {
  const errors = Schemer.reportValidationErrors(validator.errors)
  console.log(errors)
}
```

Load schemas from URLs (browser) or files (Node.js):

```javascript
// Browser: Load from URL
const validator = await Schemer.fromUrl(new URL("https://example.com/schema.json"))

// Node.js: Load from file
import {FileObject} from "@gesslar/toolkit"
const file = new FileObject("schema.json", directoryObject)
const validator = await Schemer.fromFile(file)
```

### Terms: Define Data Contracts

Create terms definitions to describe what you provide or accept:

```javascript
import {Terms} from "@gesslar/negotiator"

// Provider terms: what you offer
const providerTerms = new Terms({
  provides: {
    user: {
      dataType: "object",
      required: true,
      contains: {
        id: {dataType: "string", required: true},
        name: {dataType: "string", required: true},
        email: {dataType: "string", required: true}
      }
    }
  }
})

// Consumer terms: what you need
const consumerTerms = new Terms({
  accepts: {
    user: {
      dataType: "object",
      required: true,
      contains: {
        id: {dataType: "string", required: true},
        name: {dataType: "string", required: true}
      }
    }
  }
})
```

Parse terms from JSON or YAML:

```javascript
// From JSON string
const jsonTerms = `{
  "accepts": {
    "config": {
      "dataType": "object",
      "required": true
    }
  }
}`
const terms = new Terms(await Terms.parse(jsonTerms))

// From YAML string
const yamlTerms = `
provides:
  data:
    dataType: array
    required: true
`
const yamlTermsObj = new Terms(await Terms.parse(yamlTerms))
```

### Contract: Negotiate Compatibility

Negotiate contracts between providers and consumers:

```javascript
import {Contract, Terms} from "@gesslar/negotiator"

const provider = new Terms({
  provides: {
    user: {
      dataType: "object",
      required: true,
      contains: {
        id: {dataType: "string", required: true},
        name: {dataType: "string", required: true},
        email: {dataType: "string", required: true}
      }
    }
  }
})

const consumer = new Terms({
  accepts: {
    user: {
      dataType: "object",
      required: true,
      contains: {
        id: {dataType: "string", required: true},
        name: {dataType: "string", required: true}
      }
    }
  }
})

// Negotiate contract
try {
  const contract = new Contract(provider, consumer)
  console.log(contract.isNegotiated) // true
} catch (error) {
  console.error("Negotiation failed:", error.message)
}
```

Contracts fail when requirements aren't met:

```javascript
// Provider doesn't have required field
const insufficientProvider = new Terms({
  provides: {
    user: {
      dataType: "object",
      required: true,
      contains: {
        name: {dataType: "string", required: true}
        // Missing 'id' that consumer requires
      }
    }
  }
})

const contract = new Contract(insufficientProvider, consumer)
// Throws: "Contract negotiation failed: Provider missing required capability: id"
```

### Real-World Example: Plugin System

```javascript
import {Contract, Terms, Schemer} from "@gesslar/negotiator"

// Plugin defines what it provides
const pluginTerms = new Terms({
  provides: {
    forecast: {
      dataType: "object",
      required: true,
      contains: {
        temperature: {dataType: "number", required: true},
        condition: {dataType: "string", required: true}
      }
    }
  }
})

// App defines what it accepts
const appTerms = new Terms({
  accepts: {
    forecast: {
      dataType: "object",
      required: true,
      contains: {
        temperature: {dataType: "number", required: true}
      }
    }
  }
})

// Negotiate compatibility
const contract = new Contract(pluginTerms, appTerms)

// Validate plugin data at runtime
const validator = await Schemer.from({
  type: "object",
  properties: {
    forecast: {
      type: "object",
      properties: {
        temperature: {type: "number"},
        condition: {type: "string"}
      },
      required: ["temperature", "condition"]
    }
  },
  required: ["forecast"]
})

const pluginData = {
  forecast: {temperature: 72, condition: "Sunny"}
}

validator(pluginData) // true
```

Are they gone yet? That ... is some _dry_ topic, for sure. Who writes
a _contract negotiation schema validation terms thingamajig **anyway**_.

uggghhhh

Anyway, so as I say, you ...

Oh. Someone's still here. Okay. _clears throat_

This module has been brought to you today by the letters, F, and U. And by the
number 87.

Also, all of my code here is under the [Unlicense](https://unlicense.org/)
because seriously, and I cannot stress this enough, absolutely nothing in this
is worth protecting. If _anything_, it could maybe use a nap, or, what's the
opposite of a nap... uhhhhh karaoke?

bye

## Post-it Note

“Negotiator lets independent systems prove they’re compatible before exchanging
data.”

^ ChatGPT said I should put that there because something about being the
anchor? But it also said to put it at the top and that's not how anchors work,
ChatGPT.
