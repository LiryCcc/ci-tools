import { exec } from 'node:child_process';

const execCmd = (cmd: string): Promise<string> => {
  return new Promise((res, rej) => {
    exec(cmd, (err, stdout) => {
      if (err) {
        rej(err);
        return;
      }
      res(stdout.trim());
    });
  });
};

export { execCmd };
