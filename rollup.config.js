import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { readdir, stat } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';
import process from 'node:process';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';

const getTsFiles = async (dir) => {
  try {
    // 读取目录内容
    const items = await readdir(dir);

    // 初始化结果对象
    const result = {};

    // 检查每个文件
    for (const item of items) {
      const fullPath = join(dir, item);

      try {
        // 获取文件状态
        const st = await stat(fullPath);

        // 检查是否为文件且扩展名为 .ts
        if (st.isFile() && extname(item) === '.ts') {
          // 获取不带扩展名的文件名
          const fileName = basename(item, '.ts');

          // 生成相对路径（相对于当前工作目录）
          const relativePath = relative(process.cwd(), fullPath);

          // 添加到结果对象
          result[fileName] = relativePath;
        }
      } catch (statError) {
        console.error(`获取文件状态失败: ${fullPath}`, statError);
      }
    }

    return result;
  } catch (error) {
    console.error(`读取目录失败: ${dir}`, error);
    throw error; // 重新抛出错误，让调用者处理
  }
};

const rollupConfig = defineConfig({
  input: await getTsFiles('./src'),
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
    dir: 'dist',
    sourcemap: 'inline'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.ts']
    }),
    json(),
    alias({
      entries: [
        {
          find: '@',
          replacement: './src'
        },
        {
          find: '@@',
          replacement: '.'
        }
      ]
    }),
    del({
      targets: ['dist/*']
    })
  ]
});

export default rollupConfig;
