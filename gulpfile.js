var gulp     = require('gulp');
var clean    = require('gulp-clean');
var es       = require('event-stream');
var rseq     = require('gulp-run-sequence');
var zip      = require('gulp-zip');
var shell    = require('gulp-shell');
var firefox  = require('./firefox/package');

function pipe(src, transforms, dest) {
  if (typeof transforms === 'string') {
    dest = transforms;
    transforms = null;
  }

  var stream = gulp.src(src);
  transforms && transforms.forEach(function(transform) {
    stream = stream.pipe(transform);
  });

  if (dest) {
    stream = stream.pipe(gulp.dest(dest));
  }

  return stream;
}

gulp.task('clean', function() {
  //Clean FF for the moment
  return pipe('./build/firefox', [clean()]);
});

gulp.task('chrome', function() {
  console.log("Chrome build coming soon?");
});

gulp.task('firefox', function() {
  return es.merge(
    pipe('./app/**/*', './build/firefox/data/app'),  
    pipe('./firefox/index.js', './build/firefox/'),  
    pipe('./firefox/package.json', './build/firefox/')
  );
});

gulp.task('default', function(cb) {
    return rseq('clean', ['chrome', 'firefox'], cb);
});

gulp.task('watch', function() {
  gulp.watch(['./app'], ['default']);
});


gulp.task('firefox-build', shell.task([ 
  'cd ./build/firefox && jpm xpi'  
]));

gulp.task('firefox-run', shell.task([ 
  'cd ./build/firefox && jpm run --debug -b /Applications/FirefoxDeveloperEdition.app'  
]));

