
var templates = new Array();
var templates_imported = false;

var blank_doc = {
		title: 'Page Title',
		headers: '<link rel="preconnect" href="https://fonts.gstatic.com">',
		css: 'body {\n \tbackground-color: #eee;\n \tmargin: 0px;\n \ttext-align: center;\n }',
		body: '<h1>Edit This Text</h1>',
		file: 'index.html',
		template_color : '#EEE',
		template_bg : 'linear-gradient(180deg, #FFF, #CCC)',
		saved: false
};

var hello_world_doc = {
		title: 'Hello World',
		headers: '<meta></meta><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">',
		css: 'body { background-color: #FFFFFF; margin: 0px; } .page { background-color: #EEEEEE; color: #111111; width: 80%; margin: 0px auto; } .banner { background-color: #CCCCCC; color: #FFFFFF; padding: 20px; } .banner .title { margin: 0px auto; } .content { padding: 10px; } .footer { background-color: #CCCCCC; color: #FFFFFF; padding: 20px; } .page a { color: #000000; }',
		body: '<div class="page"><div class="banner"><i class="fa fa-globe"></i><div class="title">Hello World</div></div><div class="content">This is where the content goes. <a href="https://google.com">Google</a>.<img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/a/a8/1_Earth_%28ELitU%29-blank.png" /></div><div class="footer"></div></div>',
		file: 'hello.html',
		template_color : '#333',
		template_bg : 'linear-gradient(180deg, #EEE, #DDD)',
		saved: false
};
templates.push(hello_world_doc);

var lemon_tree_doc = {
		title: 'Lemon Tree',
		headers: '<meta keywords="Free Lemons!"></meta>',
		css: "body {\n \tbackground-image: linear-gradient(180deg, yellow, white);\n \tcolor: gold;\n \tfont-family: 'Courier New', monospace;\n }",
		body: '<div class="banner">[YELLOW]</div>',
		file: 'yellow.html',
		template_color : 'gold',
		template_bg : 'linear-gradient(120deg, yellow, white)',
		saved: false
};
templates.push(lemon_tree_doc);
