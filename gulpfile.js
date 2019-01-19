require('dotenv').config();
const { src, series, dest } = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const shell = require('gulp-shell');
const mocha = require('gulp-mocha');
const { gather, format, instrument } = require('gulp-coverage');


const plugins = loadPlugins();

const paths = {
  test: './tests/**/*.js',
  serverFiles: ['./src/**/*.js']
};

const setEnv = (done) => {
  process.env.NODE_ENV = 'test';
  done();
}

const test = () => {
  return src(paths.test, { read: false })
    .pipe(instrument({
      pattern: paths.serverFiles,
      debugDirectory: 'debug'
    }))
    .pipe(mocha({ exit: true }))
    .pipe(gather())
    .pipe(format())
    .pipe(dest('reports'));
}

const migrate = (done) => {
  shell.task([
    'cross-env NODE_ENV=test sequelize db:migrate',
  ]);
  done();
}


const restart = (done) => {
  plugins.nodemon({
    script: 'server',
    ignore: ['README.md', 'node_modules/**/*.js', 'dist/**/*.js'],
    ext: 'js'
  });
  done();
}

exports.test = series(setEnv, migrate, test);
exports.default = restart;

