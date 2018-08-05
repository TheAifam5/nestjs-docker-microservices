import * as path from 'path';
import * as gulp from 'gulp';
import { spawn, SpawnOptions } from 'child_process';
import MICROSERVICES from './microservices';

type GulpTaskDoneFn = (error?: any) => void;

const TASK_PREFIX = 'task';

function getTaskName(value: string): string {
  return `${TASK_PREFIX ? TASK_PREFIX + '-' : ''}${value}`
}

function start(done: GulpTaskDoneFn, args?: ReadonlyArray<string>, options?: SpawnOptions) {
  let hasExited: boolean = false;

  const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [...args, '--silent'], { stdio: [0, 1, 2], ...options });
  child.on('error', (err: Error) => { if (hasExited) return; hasExited = true; done(err); });
  child.on('exit', (code: number, signal: string) => { if (hasExited) return; hasExited = true; done((code !== 0 ? new Error(`Exit code: ${code}`) : undefined)); });
  return child;
}

MICROSERVICES.forEach((value) => gulp.add(getTaskName(value), (done: GulpTaskDoneFn) => {
  const cwd = path.resolve(path.join('./microservices', value));
  start(done, ['start'], { cwd });
}))

gulp.task('deploy', (done: GulpTaskDoneFn) => {
  MICROSERVICES.forEach((value) => {
    const cwd = path.resolve(path.join('./microservices', value));
    // use node-docker-api to update images
    // send to repostory
  });
});

gulp.task('default', MICROSERVICES.map((value) => getTaskName(value)));