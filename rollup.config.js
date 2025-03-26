import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const rollupConfig = defineConfig({
  input: ['src/utils/index.ts'],
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
