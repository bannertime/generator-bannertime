const execSync = require('child_process').execSync;
const fs = require('fs');
const semver = require('semver');

let version;

const updateConfig = (file, release) => {
  return new Promise((resolve) => {
    const data = fs.readFileSync(`./${file}.json`, 'utf8');
    const config = JSON.parse(data);
    const oldVersion = config.version;
    version = semver.inc(oldVersion, release);
    config.version = version;
    const string = JSON.stringify(config, null, '\t');
    fs.writeFileSync(`./${file}.json`, string, 'utf8');
    console.log(`updated ${file} to ${version}`);
    resolve();
  });
};

const getArg = (key) => {
  const index = process.argv.indexOf(key);
  const next = process.argv[index + 1];
  return (index < 0) ? null : (!next || next[0] === '-') ? true : next;
};

const patch = getArg('--patch');
const minor = getArg('--minor');
const major = getArg('--major');
let release = 'patch';
if (minor) release = 'minor';
if (major) release = 'major';

updateConfig('package', release).then(() => {
  console.log(`version updated to ${version}. Committing and tagging now...`);
  execSync('git status && git add --all && git status', { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${version}"`, { stdio: 'inherit' });
  execSync(`git tag ${version} && git push origin master && git push --tags`, { stdio: 'inherit' });
  execSync('npm publish', { stdio: 'inherit' });
}).catch((error) => {
  throw new Error(error);
});
