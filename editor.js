
function load_template (temp) {
    	
    	titlebox.value = temp.title;
    	cssbox.value = temp.css;
    	textbox.value = temp.body;
    	filebox.value = temp.file;    
    	
    	if(!temp.saved) {
			save_new(); //document.getElementById("save_button").innerHTML = '** <button onclick="save_new(); load_docs(active_index); preview_code() ">Save a Copy</button>';
		}	
		
		active_doc = null;
}
			
function show_templates (id) {
		if(!templates_imported) {
			var i;
			document.getElementById(id).innerHTML = '';
			for(i = 0; i < templates.length; i++) {
			  var tmp = "<div class=\"inline-block\" onClick=\"load_template(templates[" + i + "]); preview_code ();\">"
				+ "<div class=\"dropdown_icon\" style=\""
				+ " color: " + templates[i]['template_color'] + ";"
				+ " background-image: " + templates[i]['template_bg'] + ";"
				+ " border: 1px solid " + templates[i]['template_color'] + ";"
				+ " border-top: 8px solid " + templates[i]['template_color'] + ";"
				+ "\">&#60; &#47; &#62;"
				+ "</div>"
				+ "<a title=\"" + templates[i]['title'] + "\">" 
				+ templates[i]['title'] + "</a>" 
				+ "</div>";
				
				var editButtonHTML = document.createElement('div');
					editButtonHTML.className = 'dropdown_button inline-block';
					editButtonHTML.innerHTML = tmp;
					document.getElementById(id).appendChild(editButtonHTML);
			}
			templates_imported = true;
		}
}

function save_new () {

		active_index = docs.length;
		
		docs[active_index] = new Object();
    	auto_save ();
}

function save_a_copy (doc) {
	
		var new_doc = new Object();
		
		new_doc.title = doc.title; 
		new_doc.css = doc.css; 
		new_doc.body = doc.body; 
		new_doc.file = doc.file; 
		new_doc.saved = true;
		
		docs.push(new_doc);
		hide_docs_list ('docs_dropdown');
}

function save_active () {
		if(active_doc) {
			auto_save();
		}
}

function auto_save () {
	
    	docs[active_index].title = titlebox.value;
    	docs[active_index].css = cssbox.value;
    	docs[active_index].body = textbox.value;
    	docs[active_index].file = filebox.value;
    	docs[active_index].saved = true;
}

function load_docs (index) {
		if(index == 0 && !(index in docs)) {
			blank_doc.saved = false;
			load_template (blank_doc);
			return;
		}
		
    	titlebox.value = docs[index].title;
    	cssbox.value = docs[index].css;
    	textbox.value = docs[index].body;
    	filebox.value = docs[index].file;    	

		active_index = index;
		update_save_button(active_index);
		active_doc = docs[active_index];
}

function update_save_button (index) {
    	if(!docs[index].saved) {
			document.getElementById("save_button").innerHTML = '** <button onclick="auto_save(); load_docs(' + index + '); preview_code();">Save</button>';
		} else {
			document.getElementById("save_button").innerHTML = '<button class="inactive">Saved</button>';
		}	
}
	
function show_docs_list (id) {
	var i;
	 while (document.getElementById(id).firstChild) {
        document.getElementById(id).removeChild(document.getElementById(id).firstChild);
    }
	for(i = 0; i < docs.length; i++) {
		
		<!--//UPDATE INNERHTML UPDATES TO CREATE ELEMENT //-->
		var buttonHTML = document.createElement('div');
		buttonHTML.className = 'docs_list_title';
		if(i == active_index) {
			buttonHTML.className += ' active_doc';
		}
		document.getElementById(id).appendChild(buttonHTML);
		
		var titleButtonHTML = document.createElement('button');
		titleButtonHTML.setAttribute("onclick","save_active(); load_docs(" + (i) + "); hide_docs_list ('docs_dropdown'); show_docs_list('docs_list'); preview_code(); ");
		titleButtonHTML.title = docs[i]['title'];
		titleButtonHTML.innerHTML = docs[i]['title'];
		buttonHTML.appendChild(titleButtonHTML);
		
		var copyButtonHTML = document.createElement('span');
		copyButtonHTML.className = 'light';
		copyButtonHTML.innerHTML = docs[i]['file'];
		buttonHTML.appendChild(copyButtonHTML);	
			
		var copyButtonHTML = document.createElement('span');
		copyButtonHTML.setAttribute("onclick","save_a_copy(docs[" + (i) +"]); show_docs_list('docs_list'); load_docs(docs.length-1);");
		copyButtonHTML.innerHTML = "Copy";
		buttonHTML.appendChild(copyButtonHTML);
		
		var destroyButtonHTML = document.createElement('span');
		destroyButtonHTML.setAttribute("onclick", "destroy_doc (" + (i) + "); show_docs_list('docs_list'); preview_code();");
		destroyButtonHTML.innerHTML = "Delete";
		buttonHTML.appendChild(destroyButtonHTML);	
	}
	
	if(docs.length == 0) {
		document.getElementById(id).innerHTML = "<b>SCRATCH PAD</b><br />Try it! Edit the text below and export an HTML file.<br /> Download the editor to create your own add-ons, layouts and themes.";
	}
};

function hide_docs_list (id) {
	document.getElementById(id).style.display='none';
};

function destroy_doc (index) {
	docs.splice(index, 1);
	
	if (index >= docs.length && active_index != 0) {
		active_index = docs.length-1;
	} else if(index != active_index && active_index != 0 ) { 
		//Not the first doc or active doc
		active_index -= 1;
	}
	
	load_docs(active_index)
	hide_docs_list ('docs_dropdown');
};

function show_JS (js) {
	var showJSBox = document.getElementById('showJS');
	showJSBox.innerHTML = "";
		
	var showJSHTML = document.createElement('textarea');
	showJSHTML.id = 'showJS_textarea';
	showJSHTML.style = "height: 140px; width: 320px; border: 0px solid #FFF; padding: 20px; margin: 20px; color: #999; font-size: 16px;";
	showJSHTML.setAttribute("onclick","this.select()");
	showJSHTML.innerHTML = js;
	showJSBox.appendChild(showJSHTML);

	var tipsHTML = document.createElement('div');
	tipsHTML.style = "margin: 20px";
	tipsHTML.className = "editor_button";
	tipsHTML.innerHTML = "<button>Copy to Clipboard</button>";
	tipsHTML.setAttribute("onclick", "document.getElementById('showJS_textarea').select(); document.execCommand('copy')");
	showJSBox.appendChild(tipsHTML);
	
	document.getElementById('showJS_textarea').select();
}

function strip_spaces(value) {
	return value.replace(/ /g,"_");
}

function escape_lines (input_text) {
	var escaped = input_text;
	return escaped.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}

function activate_tabs (element) {
	element.addEventListener('keydown', function(e) {
		if (e.key == 'Tab') { 
			e.preventDefault(); 
			var start = this.selectionStart; 
			var end = this.selectionEnd; 
			
			// set textarea value to: text before caret + tab + text after caret
			this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

				// put caret at right position again 
			this.selectionStart = this.selectionEnd = start + 1; 
		}
	});
}

function create_download () {
    var links = document.getElementById("downloadlink");
    
    var html = makeHTML(); 
    
 	links.download = filebox.value;
    links.href = makeTextFile(html, "text/html");   
    links.style.display = "none";
	links.click();
}

function create_template () {
    var links = document.getElementById("downloadlink");
    
    var js = makeJS(); 
    
 	links.download = strip_spaces(titlebox.value) + ".js";
    links.href = makeTextFile(js, "text/javascript");   
    links.style.display = "none";
	links.click();
}

function copy_template () {
	var js = makeJS();
	show_JS(js);
}

function preview_code () {
    var previewframe = document.getElementById("preview_frame");
		previewframe.innerHTML = "<iframe id=\"new_frame\">" + html + "</iframe>";

    var newframe = document.getElementById("new_frame");
	var frame = (newframe.contentWindow || newframe.contentDocument); //Cross-browser support
	if (frame.document) { frame = frame.document; }	

    var html = makeHTML(); 
    
	frame.write(html);	
}

var textFile = null;
var makeTextFile = function (text, text_type) {
    var data = new Blob([text], {type: text_type, endings:"native"});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};
 
var makeHTML = function() {
	var html = "<html>\n<head>\n<title>\n"
    	+ titlebox.value
		+ "\n</title>\n" 
    	+ "<style>\n"
    	+ cssbox.value
    	+ "\n</style>\n"
    	+ "</head>\n<body>\n"
    	+ textbox.value
    	+ "\n</body>\n</html>\n";		
	return html;
}; 

var makeJS = function() {
	var clean_title = strip_spaces(titlebox.value);
	var JS = "var " + clean_title + "  = {\n"
		+ "\ttitle: \'" + titlebox.value + "\', \n"
		+ "\theaders: \'\', \n"
		+ "\tcss: \'" + escape_lines(cssbox.value) + "\', \n"
		+ "\tbody: \'" + escape_lines(textbox.value) + "\', \n"
		+ "\tfile: \'" + clean_title + ".js\', \n"
		+ "\ttemplate_color : \'#333\', \n"
		+ "\ttemplate_bg : \'linear-gradient(180deg, #EEE, #DDD)\', \n"
		+ "\tsaved: false\n"
		+ "};\n"
		+ "templates.push(" + clean_title + ");\n";	
	return JS;
}; 

class Doc {
	constructor  () {
		this.title = "Page Title";
		this.headers = "<meta></meta>";
		this.css = "body {\n \n}";
		this.body = "";
		this.file = "index.html";
		this.saved = false;
	}
}

var docs = new Array();
var active_index = 0;
var active_doc = new Doc();

window.onload = function() {

	var create = document.getElementById("create"),
		textbox = document.getElementById("textbox"),
		cssbox = document.getElementById("cssbox"),
		titlebox = document.getElementById("titlebox"),
		filebox = document.getElementById("filebox");

		activate_tabs(textbox);	
		activate_tabs(cssbox);
		
		//Start with a saved document
		//blank_doc.saved = true;
		//docs.push(blank_doc);
		//load_docs(0);

		//Start with temporary document
		load_template (blank_doc);
};
