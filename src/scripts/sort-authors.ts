/**
 * 统计仓库中所有author及其次数
 */

import { execCmd } from '../utils/exec';

execCmd('git shortlog -sne --all ').then((res) => {
  console.log(res);
});
