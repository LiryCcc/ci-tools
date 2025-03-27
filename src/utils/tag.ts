import simpleGit, { SimpleGit } from 'simple-git';

export async function getLatestTag(repoPath: string = process.cwd()): Promise<string> {
  try {
    // 初始化simple-git
    const git: SimpleGit = simpleGit(repoPath);

    // 检查是否是git仓库
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      throw new Error(`路径不是一个git仓库: ${repoPath}`);
    }

    // 按照时间顺序获取所有tag
    const tags = await git.tags();

    // 如果没有tag，抛出错误
    if (!tags.all.length) {
      throw new Error('仓库中没有找到任何tag');
    }

    // 获取所有tag的详细信息，包括提交日期
    const tagDetails = await Promise.all(
      tags.all.map(async (tag) => {
        const showResult = await git.show([tag]);
        // 从show命令输出中提取日期
        const dateMatch = showResult.match(/Date:\s+(.*?)$/m);
        const date = dateMatch ? new Date(dateMatch[1]) : new Date(0);
        return { tag, date };
      })
    );

    // 按日期排序，最新的在前
    tagDetails.sort((a, b) => b.date.getTime() - a.date.getTime());

    // 返回最新的tag
    return tagDetails[0].tag;
  } catch (error) {
    console.error('获取最新tag时出错:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}
