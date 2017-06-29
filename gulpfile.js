var gulp = require('gulp');
var ghpages = require('gh-pages');
var path = require('path');

gulp.task('ghpages', function(){
  ghpages.publish(path.join(__dirname, 'public'));
});
