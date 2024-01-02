## Issue

When a TypeScript enum is re-exported in a barrel file and a sub-dependency of the barrel file imports that enum through the barrel file and tries to access one of its members, a TypeError is thrown:

```
TypeError: Cannot read properties of undefined (reading 'A')
```

This is due to how `swc_mut_cjs_exports` groups all the `require` calls at the top of the transpiled file and then adds the keys to the `exports` object after all of those `require`. See [`results/output_with_plugin/task.js`](results/output_with_plugin/task.js).

I manually modified the code outputted by the plugin to add the relevant keys to the `exports` object immediately after the relevant `require` call. See [`results/fixed_output_with_plugin/task.js`](results/fixed_output_with_plugin/task.js).

## Test

To test the various outputs, run Node on the `index.js` file each of the `results/*` folders.

### To demonstrate error

```bash
node results/output_with_plugin/index.js
```

**Output**:

```
/Users/wjohnson/code/swc_mut_cjs_debug_ts/results/output_with_plugin/testImport.js:16
var enumValue = _task.SomeEnum.A;
                               ^

TypeError: Cannot read properties of undefined (reading 'A')
    at Object.<anonymous> (/Users/wjohnson/code/swc_mut_cjs_debug_ts/results/output_with_plugin/testImport.js:16:32)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Module.require (node:internal/modules/cjs/loader:1235:19)
    at require (node:internal/modules/helpers:176:18)
    at Object.<anonymous> (/Users/wjohnson/code/swc_mut_cjs_debug_ts/results/output_with_plugin/anotherDep.js:5:19)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)

Node.js v21.3.0
```

### To demonstrate fixed output code:

```bash
node results/fixed_output_with_plugin/index.js
```

**Output**:

```
{ enumValue: 'A' }
{ enumValue: 'A' }
{ SomeEnum: { A: 'A', B: 'B' } }
```

## Output without `swc_mut_cjs_exports` plugin

Output of `swc` transpilation _without_ the `swc_mut_cjs_exports` plugin can be found in the [`results/base_output`](results/base_output) folder.

## Output with `swc_mut_cjs_exports` plugin

Output of `swc` transpilation _with_ the `swc_mut_cjs_exports` plugin can be found in the [`results/output_with_plugin`](results/output_with_plugin) folder.

## Fixed output with `swc_mut_cjs_exports` plugin

Output of `swc` transpilation _with_ the `swc_mut_cjs_exports` plugin that has been manually modified to fix the issue can be found in the [`results/fixed_output_with_plugin`](results/fixed_output_with_plugin) folder.
