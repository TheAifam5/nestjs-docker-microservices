import * as path from 'path';
import * as fs from 'fs';
import * as gulp from 'gulp';
import { spawn, SpawnOptions } from 'child_process';

type GulpTaskDoneFn = (error?: any) => void;

const BASE_DIR = './microservices';
const TASK_PREFIX = 'microservice';

const MICROSERVICES = fs.readdirSync(BASE_DIR).filter((value) => {
  const dirPath = path.resolve(path.join(BASE_DIR, value));
  const nodePkgPath = path.join(dirPath, 'package.json');
  return fs.statSync(dirPath).isDirectory()
    && fs.existsSync(nodePkgPath)
    && fs.statSync(nodePkgPath).isFile()
    && require(nodePkgPath)!.scripts!.start !== undefined;
}).map((value) => ({ name: value, path: path.resolve(path.join(BASE_DIR, value)) }));

function getTaskName(value: string): string {
  return `${TASK_PREFIX ? TASK_PREFIX + '-' : ''}${value}`;
}

function start(args?: ReadonlyArray<string>, options?: SpawnOptions, done?: GulpTaskDoneFn) {
  let hasExited: boolean = false;

  const child = spawn(
    /^win/.test(process.platform) ? 'yarn.cmd' : 'yarn',
    args,
    { stdio: [0, 1, 2], ...options },
  );
  child.on('error', (err: Error) => {
    if (hasExited)
      return;

    hasExited = true;

    if (done)
      done(err);
  });
  child.on('exit', (code: number) => {
    if (hasExited)
      return;

    hasExited = true;

    if (done && code !== 0)
      done(new Error(`Exit code: ${code}`));
  });
  return child;
}

function install(done: GulpTaskDoneFn) {
  start(['install'], { cwd: path.resolve('./shared') }, done);
  MICROSERVICES.map((obj) => start(['install', '--silent'], { cwd: obj.path }, done));

  done();
}

MICROSERVICES.forEach((obj) => gulp.add(getTaskName(obj.name), (done: GulpTaskDoneFn) => {
  start(['start', '--bail', '--display', 'errors-only'], { cwd: obj.path }, done);
}));

gulp.task('default', MICROSERVICES.map((obj) => getTaskName(obj.name)));

gulp.task('postinstall', install);

gulp.task('lint', (done: GulpTaskDoneFn) => {
  start(['lint'], { cwd: path.resolve('./shared') });
  MICROSERVICES.map((obj) => start(['lint'], { cwd: obj.path }, done));

  done();
});
