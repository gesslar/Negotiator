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

### Browser

#### esm.sh (recommended for CDN usage)

esm.sh automatically resolves npm dependencies, so no additional setup is
needed:

```html
<script type="module">
  import {Schemer, Terms, Contract} from 'https://esm.sh/@gesslar/negotiator'
</script>
```

For TypeScript editor support, use the `?dts` parameter:

```html
https://esm.sh/@gesslar/negotiator?dts
```

Alternatively, install the package locally for development to get full
TypeScript support.

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

// Provider terms: what you offer (using JSON Schema)
const providerTerms = new Terms({
  provides: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: {type: "string"},
          name: {type: "string"},
          email: {type: "string"}
        },
        required: ["id", "name", "email"]
      }
    },
    required: ["user"]
  }
})

// Consumer terms: what you need (using JSON Schema)
const consumerTerms = new Terms({
  accepts: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: {type: "string"},
          name: {type: "string"}
        },
        required: ["id", "name"]
      }
    },
    required: ["user"]
  }
})
```

Parse terms from JSON or YAML:

```javascript
// From JSON string
const jsonTerms = `{
  "accepts": {
    "type": "object",
    "properties": {
      "config": {"type": "object"}
    },
    "required": ["config"]
  }
}`
const terms = new Terms(await Terms.parse(jsonTerms))

// From YAML string
const yamlTerms = `
provides:
  type: object
  properties:
    data:
      type: array
    status:
      type: string
  required:
    - data
    - status
`
const yamlTermsObj = new Terms(await Terms.parse(yamlTerms))
```

### Contract: Negotiate Compatibility

Negotiate contracts between providers and consumers:

```javascript
import {Contract, Terms} from "@gesslar/negotiator"

const provider = new Terms({
  provides: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: {type: "string"},
          name: {type: "string"},
          email: {type: "string"}
        },
        required: ["id", "name", "email"]
      }
    },
    required: ["user"]
  }
})

const consumer = new Terms({
  accepts: {
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: {type: "string"},
          name: {type: "string"}
        },
        required: ["id", "name"]
      }
    },
    required: ["user"]
  }
})

// Negotiate contract
try {
  const contract = await Contract.negotiate(provider, consumer)
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
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          name: {type: "string"}
          // Missing 'id' that consumer requires
        },
        required: ["name"]
      }
    },
    required: ["user"]
  }
})

const contract = await Contract.negotiate(insufficientProvider, consumer)
// Throws: "Contract negotiation failed: Provider missing required capability: id"
```

### Real-World Example: Plugin System

```javascript
import {Contract, Terms} from "@gesslar/negotiator"

// Plugin defines what it provides (using JSON Schema)
const pluginTerms = new Terms({
  provides: {
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
  }
})

// App defines what it accepts
const appTerms = new Terms({
  accepts: {
    type: "object",
    properties: {
      forecast: {
        type: "object",
        properties: {
          temperature: {type: "number"}
        },
        required: ["temperature"]
      }
    },
    required: ["forecast"]
  }
})

// Negotiate compatibility — contract gets a validator from provider schema
const contract = await Contract.negotiate(pluginTerms, appTerms)

// Validate plugin data at runtime using the contract's validator
const pluginData = {
  forecast: {temperature: 72, condition: "Sunny"}
}

contract.validate(pluginData) // true
```

Are they gone yet? That ... is some _dry_ topic, for sure. Who writes
a _contract negotiation schema validation terms thingamajig **anyway**_.

uggghhhh

Anyway, so as I say, you ...

Oh. Someone's still here. Okay. _clears throat_

This module has been brought to you today by the letters, F, and U. And by the
number 87.

Also, all of my code here is under the 0BSD because seriously, and I cannot
stress this enough, absolutely nothing in this is worth protecting. If
_anything_, it could maybe use a nap, or, what's the opposite of a nap...
uhhhhh karaoke?

bye

## Post-it Note

“Negotiator lets independent systems prove they’re compatible before exchanging
data.”

^ ChatGPT said I should include this because something about being the anchor?
But it also said to put it at the top and that's not how anchors work, ChatGPT.

## License

`@gesslar/negotiator` is released into the public domain under the [0BSD](LICENSE.txt).

This package includes or depends on third-party components under their own
licenses:

| Dependency | License |
| --- | --- |
| [@gesslar/toolkit](https://github.com/gesslar/toolkit) | 0BSD |
| [ajv](https://github.com/ajv-validator/ajv) | MIT |
| [json5](https://github.com/json5/json5) | MIT |
| [yaml](https://github.com/eemeli/yaml) | ISC |
