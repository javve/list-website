var express = require('express'),
    lessMiddleware = require('less-middleware'),
    partials = require('express-partials'),
    examples = require('./examples'),
    https = require('https');

require('ejs');

var app = express();

/**
* Middleware.
*/
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(lessMiddleware({
        src: __dirname + '/public/less',
        dest: __dirname + '/public/css',
        prefix: '/css'
    }));
    app.use(express.static(__dirname + "/public"));
    app.use(partials());
    app.use(function(req, res, next) {
      res.locals.url = req.url;
      next();
    });
});


/**
* Settings
*/
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('views');
    app.set('view engine', 'ejs');
});

/**
* Locals
*/
app.locals({
    title: "List.js - Search, sort, filters, flexibility to tables, list and more!",
    description: "Perfect library for adding search, sort, filters and flexibility to tables, lists and various HTML elements. Built to be invisible and work on existing HTML.",
    ogImage: "http://listjs.com/images/graphics/listjs-logo.png",
    exampleList: examples
});
app.use(function(req, res, next){
    res.locals.currentUrl = req.protocol + '://' + req.host + req.url;
    next();
});


/**
* Routes
*/
app.get('/', function(req, res) {
    res.render('index', {
        home: true
    });
});
app.get('/examples', function(req, res) {
    res.render('examples/index', {
        example: examples['existing-list'],
        examples: true
    });
});
app.get('/examples/:id', function(req, res) {
    res.render('examples/index', {
        example: examples[req.params.id],
        examples: true
    });
});

app.get('/performance', function(req, res) {
    res.render('performance', {
        mainMenu: true,
        title: "List.js - Performance, wrooooom! Index, search and sort thousands of items. By @javve",
        description: "List.js is pretty fast. Try it out yourself!"
    });
});

app.get('/overview', function(req, res) {
    res.render('overview/index', {
        title: "Overview - List.js",
        overview: true
    });
});
app.get('/overview/download', function(req, res) {
    res.render('overview/download', {
        title: "Download - List.js",
        overview: true
    });
});
app.get('/overview/press', function(req, res) {
    res.render('overview/press', {
        overview: true
    });
});
app.get('/overview/changelog', function(req, res) {
    res.render('overview/changelog', {
        title: "Changelog - List.js",
        overview: true
    });
});
app.get('/overview/contribute', function(req, res) {
    res.render('overview/contribute', {
        title: "Contribute - List.js",
        overview: true
    });
});

app.get('/docs', function(req, res) {
    res.render('docs/index', {
        title: "Documentation - List.js",
        description: "The core thing in List.js have always been simplicity. It should require as little effort as possible to use the script and it's features.",
        docs: true
    });
});
app.get('/docs/options', function(req, res) {
    res.render('docs/options', {
        title: "Options / Parameters - Documentation - List.js",
        description: "Using List.js is pretty much plug and play, but you can change some options if you feel like it.",
        docs: true,
        name: "Options"
    });
});
app.get('/docs/list-api', function(req, res) {
    res.render('docs/list-api', {
        title: "List API - Documentation - List.js",
        description: "When you've initiated the List-object you got a bunch of different properties and methods available.",
        docs: true,
        name: "List API"
    });
});
app.get('/docs/item-api', function(req, res) {
    res.render('docs/item-api', {
        title: "Item API - Documentation - List.js",
        descrition: "Each item in the list have  properties and methods available.",
        docs: true,
        name: "Item API"
    });
});


app.get('/docs/plugins', function(req, res) {
    res.render('docs/plugins/index', {
        title: "Plugins introduction - List.js",
        docs: true
    });
});
app.get('/docs/plugins/fuzzysearch', function(req, res) {
    res.render('docs/plugins/fuzzysearch', {
        title: "Fuzzy search - Plugins - List.js",
        docs: true
    });
});
app.get('/docs/plugins/pagination', function(req, res) {
    res.render('docs/plugins/pagination', {
        title: "Pagination - Plugins - List.js",
        docs: true
    });
});

app.get('/docs/plugins/build', function(req, res) {
    res.render('docs/plugins/build', {
        title: "Build your own plugin - List.js",
        docs: true
    });
});


var github = function(res, host, path) {
    var options = {
        host: host,
        path: path
    }
    var request = https.request(options, function (reqRes) {
        var data = '';
        reqRes.on('data', function (chunk) {
            data += chunk;
        });
        reqRes.on('end', function () {
            res.set('Content-Type', 'text/javascript');
            res.send(data);
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
}

app.get('/no-cdn/list.js', function(req, res) {
    github(res, 'raw.github.com', '/javve/list.js/v1.1.1/dist/list.js');
});
app.get('/no-cdn/list.pagination.js', function(req, res) {
    github(res, 'raw.github.com', '/javve/list.pagination.js/v0.1.1/dist/list.pagination.js');
});
app.get('/no-cdn/list.fuzzysearch.js', function(req, res) {
    github(res, 'raw.github.com', '/javve/list.fuzzysearch.js/v0.1.0/dist/list.fuzzysearch.js');
});

// 404
app.get('*', function(req, res){
    res.status(404);
    res.render('404', { url: req.url });
});

var port = process.env.PORT || 3003;
app.listen(port);
console.log('Listening on port '+ port);
