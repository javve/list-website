desc('Startup the server');
task('default', function() {
    jake.exec('nodemon --watch . web.js', function() {
        console.log('Quit supervisor.');
    }, {
        printStdout: true,
        printStderr: true
    });
});