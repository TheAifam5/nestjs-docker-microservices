import * as path from 'path';
import * as fs from 'fs';
import * as gulp from 'gulp';
import { spawn, SpawnOptions } from 'child_process';

type GulpTaskDoneFn = (error?: any) => void;

const BASE_DIR = './microservices';
const TASK_PREFIX = 'task';
const MICROSERVICES = fs.readdirSync(BASE_DIR).filter((value) => {
  const dirPath = path.join(BASE_DIR, value);
  const nodePkgPath = path.join(dirPath, 'package.json');
  return fs.statSync(dirPath).isDirectory() && fs.existsSync(nodePkgPath) && fs.statSync(nodePkgPath).isFile();
}).map((value) => ({ name: value, path: path.resolve(path.join(BASE_DIR, value)) }));

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

MICROSERVICES.forEach((obj) => gulp.add(getTaskName(obj.name), (done: GulpTaskDoneFn) => {
  start(done, ['start'], { cwd: obj.path });
}));

gulp.task('default', MICROSERVICES.map((obj) => getTaskName(obj.name)));