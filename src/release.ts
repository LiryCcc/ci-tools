import { name } from '@@/package.json';
import { getLatestTag } from './utils/tag';
console.log(`${name} ${await getLatestTag()} release`);
