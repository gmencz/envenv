import { exec } from 'child_process';

export default async function getDockerHostname(): Promise<void | string> {
  try {
    const hostname = await new Promise((res, rej) => {
      exec('hostname -f', (err, stdout) => {
        if (err) {
          rej(err);
        }

        res(stdout);
      });
    });

    return hostname as string;
  } catch (error) {
    console.error(error);
  }
}
