/**
 * 统计仓库中所有author及其次数
 */

import { execCmd } from '@/utils';
const getAuthorMails = async () => {
  const l = await execCmd('git shortlog -sne --all ');

  const list = l.split('\n').map((item) => {
    return item.replaceAll('\t', ' ').trim().replaceAll('>', '').replaceAll('<', '');
  });
  console.log(list);
  const mailMap: Record<string, number> = {};
  list.forEach((item) => {
    const count = parseInt(item.split(' ')[0]);
    const mail = item.split('@')[1];
    console.log(mail, count);
    if (!mailMap[mail]) {
      mailMap[mail] = count;
    } else {
      mailMap[mail] += count;
    }
  });
  const so = new Map(Object.entries(mailMap).sort((a, b) => b[1] - a[1]));
  const res = Object.fromEntries(so);
  console.dir(res);
};

export { getAuthorMails };
