import { readdir, stat } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';

const getTsFiles = async (dir: string): Promise<Record<string, string>> => {
  try {
    // 读取目录内容
    const items = await readdir(dir);

    // 初始化结果对象
    const result: Record<string, string> = {};

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

export { getTsFiles };
