"use strict";

/*
    Error Codes
	https://github.com/jshint/jshint/blob/master/src/messages.js
 */

var 
	merge = require('lodash.merge');

var 
	index = function (error_data, user_style = {}, filter = []) {

	const 
		new_error_data = [];

	let 
	    style,
	    label_style,
	    label_message,
		level_message;


	style = getStyle(user_style);

	error_data.forEach(function(item){
	  	// E - error, W - warning, I - info
	  	level_message = item.error.code.charAt(0);

	  	if(includesIn(filter, level_message) == false){
		  	if(level_message === 'E'){
		  		label_style = style.label.error;
		  		label_message = 'Error';
		  	}else 
		  	if(level_message === 'W'){
		  		label_style = style.label.warning;
		  		label_message = 'Warning';
		  	}else 
		  	if(level_message === 'I'){
		  		label_style = style.label.info;
		  		label_message = 'Info';	  		
		  	}

			new_error_data.push({ 
				label: { 
					style: label_style, 
					name: label_message 
				}, 
				message: 
					html_template('', item.file, style.file) 
					+
					html_template('Line:', item.error.line, style.line)		
					+
					html_template('Col:', item.error.character, style.column)	
					+
					html_template(' ', item.error.evidence, style.evidence)				
					+
					html_template('Reason:', item.error.reason, style.reason)																	
			});
		}
	}); 

	return new_error_data;
}

module.exports = index;


function html_template(field = '', message, style){
	if(message == undefined){
		return ''
	}else
	if(field != '' && message != ''){
		return 	'<span style="' + style.field + '">' + field + '</span>' + 
	       		'<span style="' + style.message + '">' + message + '</span>';
	}else 
	if(field == ''){
		return 	'<span style="' + style + '">' + message + '</span>';
	}
}


function includesIn(filter, level_message){
	for (let i = 0; filter.length > i; i++) {
		if(filter[i].charAt(0).toUpperCase() === level_message){
			return true;
		}
	}

	return false;
}


function getStyle(user_style){	
	const
		style_default = {};	


	style_default.label = {
		error: { backgroundColor: '#ff0000', color: '#ffffff' },
		warning: { backgroundColor: 'yellow', color: '#000000' },
		info: { backgroundColor: '#90ee90', color: '#000000' }
	};

	style_default.file = 'color: #ffffff !important; text-decoration: underline !important;';
	
	style_default.line = {
		field: 'color: #aaaaaa !important; padding-left: 7px !important;', 
		message: 'color: #ffffff !important; padding-left: 3px !important;'
	};

	style_default.column = {
		field: 'color: #aaaaaa !important; padding-left: 7px !important;', 
		message: 'color: #ffffff !important; padding-left: 3px !important;'
	};

	style_default.evidence = {
		field: 'color: #aaaaaa !important; display: block !important; padding-bottom: 8px !important;', 
		message: 'box-sizing: border-box !important; width: 100% !important; overflow-x: auto !important; color: #ffffff !important; display: inline-block !important; border: dashed 1px #b9b9b9 !important; padding: 20px !important;'
	};

	style_default.reason = {
		field: 'color: #aaaaaa !important; display: block !important;  padding-top: 3px !important;', 
		message: 'color: #ffffff !important;'
	};	

	// Setting the user's style, if any	
	return merge(style_default, user_style);
}