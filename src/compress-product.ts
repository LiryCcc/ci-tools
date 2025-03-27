// 从各个模块中具名导入所需函数
import { name } from '@@/package.json';
import AdmZip from 'adm-zip';
import { existsSync } from 'fs';
import { access, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { getLatestTag } from './utils/tag';

async function compressDistFolder(
  sourcePath: string = join(process.cwd(), 'dist'),
  outputPath: string = join(process.cwd(), 'dist.zip'),
  baseFolder: string = 'dist'
): Promise<string> {
  try {
    console.log('开始压缩dist文件夹...');

    // 检查源文件夹是否存在
    if (!existsSync(sourcePath)) {
      throw new Error(`源文件夹不存在: ${sourcePath}`);
    }

    // 确保输出目录存在
    const outputDir = dirname(outputPath);
    try {
      await access(outputDir);
    } catch {
      await mkdir(outputDir, { recursive: true });
    }

    // 创建一个新的zip实例
    const zip = new AdmZip();

    // 添加源文件夹到zip（包括所有子文件夹和文件）
    zip.addLocalFolder(sourcePath, baseFolder);

    // 写入zip文件
    zip.writeZip(outputPath);

    console.log(`压缩完成！文件已保存至: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('压缩过程中发生错误:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

await compressDistFolder('dist', `${name}-${await getLatestTag()}-release.zip`);
