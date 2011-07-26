/*
copyright 2009 Peter Keane
Licensed under the terms of the MIT License
http://www.opensource.org/licenses/mit-license.php
*/

/******* example
 var h = new HTMLBuilder;
 h.add('h1',null,'Item Status ('+status+')');
 var form = h.add('form',{'id':'itemStatusForm'});
 var sel = form.add('select',{'name':'status'});
 sel.add('option',null,'select status:');
 sel.add('option',{'value':'public'},'public');
 sel.add('option',{'value':'draft'},'draft');
 sel.add('option',{'value':'delete'},'delete');
 sel.add('option',{'value':'archive'},'archive');
 form.add('input',{'type':'submit','value':'update status'});
 form.add('span',null,' ');
 form.add('span',{'id':'updateMsg'});
 h.attach(status_form);
 *************/

HTMLBuilder = function(tagName,keyvals,text) {
	this.tagName = tagName || ''; //no tagname means container
	this.keyvals = keyvals || {};
	this.text = text || '';
	this.elements = [];
	this.attach = function(target,append_flag) {
		var result = [];
		if (append_flag) {
			target.innerHTML += HTMLBuilder.buildstring(this,result).join('');
		} else {
			target.innerHTML = HTMLBuilder.buildstring(this,result).join('');
		}
	};
	this.getString = function(target) {
		var result = [];
		return HTMLBuilder.buildstring(this,result).join('');
	};
	return this;
};

HTMLBuilder.buildstring = function(el,result) {
//	alert(JSON.stringify(el));
	if (el.tagName) {
		result.push('<'+el.tagName);
		if (el.keyvals) {
			for (var key in el.keyvals) {
				result.push(' '+key+'="'+el.keyvals[key]+'"');
			}
		}
		if (el.elements.length) {
			result.push('>\n');
		} else {
			if (!el.text) {
				//close tag
				result.push('/>');
				return result;
			}
			result.push('>');
		}
	}
	for (var i=0;i<el.elements.length;i++) {
		HTMLBuilder.buildstring(el.elements[i],result);
	}
	if (el.tagName) {
		result.push(el.text+'</'+el.tagName+'>\n');
	}
	return result;
};

HTMLBuilder.prototype.set = function(key,val) {
	this.keyvals[key] = val;
};

HTMLBuilder.prototype.setText = function(text) {
	this.text = text;
};

HTMLBuilder.prototype.add = function(tagName,keyvals,text) {
	var h = new HTMLBuilder(tagName,keyvals,text);
	this.elements.push(h);
	return h;
};

HTMLBuilder.prototype.$ = function(id) {
	return document.getElementById(id);
};

