'use strict';

import babel from 'gulp-babel';
import fs from 'fs';
import gulp from 'gulp';
import {execSync} from 'child_process';
import semver from 'semver';

let oldVersion = '';
let version = '';

let updateConfig = (file, release, done) => {
  let data = fs.readFileSync(`./${file}.json`, 'utf8');
  let config = JSON.parse(data);
  oldVersion = config.version;
  version = semver.inc(oldVersion, release);
  config.version = version;
  let string = JSON.stringify(config, null, '\t');
  fs.writeFileSync(`./${file}.json`, string, 'utf8');
  console.log(`updated ${file} to ${version}`);
};

let getArg = (key) => {
  let index = process.argv.indexOf(key);
  let next = process.argv[index + 1];
  return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
};

let patch = getArg('--patch');
let minor = getArg('--minor');
let major = getArg('--major');
let release = 'patch';
if (minor) release = 'minor';
if (major) release = 'major';

gulp.task('build', () => {
  return gulp.src(['src/**/*.js', '!src/**/templates/**/*'])
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['babel-plugin-add-module-exports']
    }))
    .pipe(gulp.dest('generators'));
});

gulp.task('deploy', (done) => {
  updateConfig('package', release);

  setTimeout(()=> {
    console.log(`version updated to ${version}. Committing and tagging now...`);
    execSync(`git status && git add --all && git status`, {stdio: 'inherit'});
    execSync(`git commit -m "chore: bump version to ${version}"`, {stdio: 'inherit'});
    execSync(`git tag ${version} && git push origin master && git push --tags`, {stdio: 'inherit'});
    execSync(`npm publish`, {stdio: 'inherit'});
    done();
  }, 1000);
});
