import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const rollupConfig = defineConfig({
  input: {
    'sort-author': './src/scripts/sort-authors.ts'
  },
  makeAbsoluteExternalsRelative: undefined,
  watch: undefined,
  external: [],
  experimentalCacheExpiry: undefined,
  experimentalLogSideEffects: undefined,
  treeshake: true,
  onLog: undefined,
  onwarn: undefined,
  maxParallelFileOps: undefined,
  perf: undefined,
  preserveEntrySignatures: undefined,
  preserveSymlinks: undefined,
  shimMissingExports: undefined,
  strictDeprecations: undefined,
  jsx: undefined,
  logLevel: undefined,
  cache: undefined,
  context: undefined,
  moduleContext: undefined,
  output: {
    format: 'esm',
    dir: 'dist'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.ts']
    })
  ]
});

export default rollupConfig;
