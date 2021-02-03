# js_record_sdk

## Prerequisites

```bash
$ yarn       # install dependencies
$ yarn build # call `tsc` to compile TypeScript into JavaScript
```

## Usage

```javascript
import { readFromRecordFile } from 'js_record_sdk/dist/record_io.js'

readFromRecordFile(arrayBuf) // return: parsed version of record
```

Or run the record parser with command-line (after `yarn build`):

```bash
$ yarn dist <path-to-binary-record>
```