/* eslint-disable no-console */
/* eslint-disable function-paren-newline */

import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import eslint from 'gulp-eslint';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.jsx',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  clientBundle: 'dist/client-bundle.js?(.map)',
  libDir: 'lib',
  distDir: 'dist',
  publickDir: 'public',
};

// Compile files to distDir
gulp.task('build', ['lint'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(paths.publickDir)),
);

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

// For development
gulp.task('default', ['webpack-dev-server']);

gulp.task('webpack-dev-server', ['lint', 'clean'], () => {
  const myConfig = Object.create(webpackConfig);

  new WebpackDevServer(webpack(myConfig), {
    contentBase: `${myConfig.devServer.contentBase}`,
    hot: true,
    // progress: true,
    stats: {
      colors: true,
    },
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});
