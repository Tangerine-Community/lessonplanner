
//This allows us to have a single file for template widgets.
var loadWidgetTemplates = function(){
	//var templateFunction;
	$.ajax("app/templates/templates.html",{
		dataType: "html",
		async:false, // make sure we pause execution until this template is loaded
		success: function(result){
			//console.log("loaded templates.html: " + result);
			$("head").append(result);
		},
		error: function(error){
			console.log("Error loaded templates.html: " + JSON.stringify(error));
		}
	});
};

loadWidgetTemplates();

inputTextWidgetCompiledHtml = Handlebars.compile($("#inputTextWidget").html());
datepickerWidgetCompiledHtml = Handlebars.compile($("#datepickerWidget").html());
checkboxWidgetCompiledHtml = Handlebars.compile($("#checkboxWidget").html());
checkboxWidgetAlertCompiledHtml = Handlebars.compile($("#checkboxAlertWidget").html());
dropdownWidgetCompiledHtml = Handlebars.compile($("#dropdownWidget").html());
dropdownWidgetFormDesignerCompiledHtml = Handlebars.compile($("#dropdownWidgetFormDesigner").html());
dropdownWidgetCascadeCompiledHtml = Handlebars.compile($("#dropdownWidgetCascade").html());
textareaWidgetCompiledHtml = Handlebars.compile($("#ckEditorWidget").html());
displayTableWidgetCompiledHtml = Handlebars.compile($("#displayTableWidget").html());
displayHeaderWidgetCompiledHtml = Handlebars.compile($("#displayHeaderWidget").html());
displaySubHeaderWidgetCompiledHtml = Handlebars.compile($("#displaySubHeaderWidget").html());
displayInfotextWidgetCompiledHtml = Handlebars.compile($("#displayInfotextWidget").html());
yesnoWidgetCompiledHtml = Handlebars.compile($("#yesnoWidget").html());
genderWidgetCompiledHtml = Handlebars.compile($("#genderWidget").html());
hiddenWidgetCompiledHtml = Handlebars.compile($("#hiddenWidget").html());
buttonWidgetCompiledHtml = Handlebars.compile($("#buttonWidget").html());
selectMultipleWidgetCompiledHtml = Handlebars.compile($("#selectMultipleWidget").html());

Handlebars.registerHelper("renderWidget", function(context) {
	//console.log("renderWidget:" + JSON.stringify(context));
	var template;
	var html = "";
	var useTemplate = true;
	var datatype = this.datatype;
	var inputType = this.inputType;
	var visible = this.visible;
	var tblCols = this.tblCols;
	var closeRow = this.closeRow;
	var identifier = this.identifier;
	var size = this.size;
	var maxlength = this.maxlength;
	var beginElement = "";
	var endElement = "";
	if (closeRow == "true") {
		//endElement = "</td></tr>\n<tr>\n";
	}
	if (inputType == 'text') {
		if (size == null || size == 0) {
			this.size = 20;
		}
		if (maxlength == null || maxlength == 0) {
			this.maxlength = 255;
		}
		template = inputTextWidgetCompiledHtml;
	} else if (inputType == 'patientid') {
			template = inputTextWidgetCompiledHtml;
	} else if (inputType == 'birthdate') {
		template = datepickerWidgetCompiledHtml;
	} else if (inputType == 'emptyDate') {
		template = datepickerWidgetCompiledHtml;
	} else if (inputType == 'checkbox') {
		template = checkboxWidgetCompiledHtml;
	} else if (inputType == 'alertCheckbox') {
		template = checkboxWidgetAlertCompiledHtml;
	} else if (inputType == 'dropdown-add-one') {
		template = dropdownWidgetCompiledHtml;
	} else if (inputType == 'dropdown') {
		template = dropdownWidgetCompiledHtml;
	} else if (inputType == 'selectFDA') {
		template = dropdownWidgetFormDesignerCompiledHtml;
	} else if (inputType == 'selectCascadeParent') {
		template = dropdownWidgetFormDesignerCompiledHtml;
	} else if (inputType == 'selectCascadeChild') {
		template = dropdownWidgetCascadeCompiledHtml;
	} else if (inputType == 'select') {
		template = dropdownWidgetCompiledHtml;
	} else if (inputType == 'textarea') {
		template = textareaWidgetCompiledHtml;
	} else if (inputType == 'yesno_br') {
		template = yesnoWidgetCompiledHtml;
	} else if (inputType == 'Yes/No') {
		template = yesnoWidgetCompiledHtml;
	} else if (inputType == 'gender') {
		template = genderWidgetCompiledHtml;
//	} else if (inputType == 'display-tbl-begin') {
//		template = displayTableWidgetCompiledHtml;
	} else if (inputType == 'display-header') {
		template = displayHeaderWidgetCompiledHtml;
	} else if (inputType == 'display-sub-header') {
		template = displaySubHeaderWidgetCompiledHtml;
	} else if (inputType == 'infotext') {
		template = displayInfotextWidgetCompiledHtml;
	} else if (inputType == 'hidden') {
		template = hiddenWidgetCompiledHtml;
	} else if (inputType == 'button') {
		template = buttonWidgetCompiledHtml;
  } else if (inputType == 'selectMult') {
    /*
    if (identifier === 'audio') {
      template = displayAudioWidgetCompiledHtml;
    } else {
      template = displayImagesWidgetCompiledHtml;
    }*/
		template = selectMultipleWidgetCompiledHtml;
  } else {
		useTemplate = false; 
	};
	if (useTemplate) {
		if (datatype == "display") {
			html = beginElement + template(this) + endElement;  
		} else if (inputType == 'hidden') {
			html = beginElement + template(this) + endElement;  
		} else {
			var labelHtml = "<label for='" + identifier + "'>" + this.label + "</label>";
			var errorHtml = " <span class='error-message' style='display:none'></span>";
			html = beginElement + labelHtml + template(this) + errorHtml + endElement; 
			//console.log("useTemplate: " + useTemplate + " inputType: " + inputType + " closeRow: " + closeRow + " html: "+ html);
		}
	} else {
		if (html == "") {
			html = beginElement + "No template for inputType: |" + inputType + "|" + endElement; 
		}
		console.log("html: " + html);
	}
	  return html;
	});

// Debug handlebars.js templates
// place {{debug}} in your template
// kudos: http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/
Handlebars.registerHelper("debug", function(optionalValue) {
	  console.log("Current Context");
	  console.log("====================");
	  console.log(this);
	 
	  if (optionalValue) {
	    console.log("Value");
	    console.log("====================");
	    console.log(optionalValue);
	  }
	});

Handlebars.registerHelper('dropdown', function(items) {
	  var out = "";
	  var arry = items.split(',');
	  out = out + "<option value=\"\">--Select--</option>";
	  for(var i=0, l=arry.length; i<l; i++) {
	    out = out + "<option value=\"" + arry[i] + "\">" + arry[i] + "</option>";
	  }

	  return out;
	});
Handlebars.registerHelper('dropdownWidgetValue', function(enumerations, value) {
	var out = "";
	out = out + "<option value=\"\">--Select--</option>";
	//console.log("sorting");
	enumerations.sort(sortBylabelAlpha);
	for (fenum in enumerations) {
		var record = enumerations[fenum];
		if (record.defaultValue === value) {
			out = out + "<option value=\"" + record.defaultValue + "\" selected=\"selected\"";
		} else {
			out = out + "<option value=\"" + record.defaultValue + "\"";
		}
		if (record.parent_id != null) {
			out = out + " class = \"sub_" + record.parent_id + "\"";
		}
		out = out + ">" + record.label + "</option>";
	}
	return out;
});
function sortBylabelAlpha(a,b) {
	return a.label.toLowerCase() > b.label.toLowerCase();
}
Handlebars.registerHelper('renderPriority', function(priority, resolved) {
	var out = "";
	switch (priority){
    case "1":
    	out = '<img src="images/alert-low.png" title="Low Priority">';
    	break;
    case "2":
    	out = '<img src="images/alert-medium.png" title="Medium Priority">';
    	break;
    case "3":
    	out = '<img src="images/alert-high.png" title="High Priority">';
    	break;
	}
	if (resolved != null && resolved == "1") {
		out = '<img src="images/resolved.png" title="Resolved">';
	}
	return out;
});
Handlebars.registerHelper('renderDepartment', function(value) {
	var out = "";
	switch (value){
	case "1":
		out = "Admin";
		break;
	case "2":
		out = "Fin.";
		break;
	case "3":
		out = "Educ.";
		break;
	case "4":
		out = "Health";
		break;
	case "5":
		out = "Works";
		break;
	case "6":
		out = "Council.";
		break;
	}
	return out;
});

Handlebars.registerHelper('dateFormat', function(item) {
	var out = "";
	var d1 = new Date(item * 1000);
	//out = d1.toString('yyyy-MM-dd hh:mm');
	//out = $.format.date(d1, "yyyy-MM-dd hh:mm:ss");
	out = $.format.date(d1, "dd-MM hh:mm");
	return out;
});
Handlebars.registerHelper('dateFormatDate', function(item) {
	var out = "";
	var d1 = new Date(item * 1000);
	out = $.format.date(d1, "dd/MM");
	//console.log("item: " + item + " d1: " + d1 + " out: " + out);
	return out;
});
Handlebars.registerHelper('dateFormatdMY', function(item) {
	var out = "";
	var d1 = new Date(item * 1000);
	//out = d1.toString('yyyy-MM-dd hh:mm');
	//out = $.format.date(d1, "yyyy-MM-dd hh:mm:ss");
	out = $.format.date(d1, "dd/MM/yyyy");
	return out;
});
Handlebars.registerHelper('substring', function(identifier, from) {
	return identifier.substring(from);
});
Handlebars.registerHelper('ifEquals', function(context, fn, inverse, comparisonString) {
	//console.log(this);
	  if(!context || context == []) {
	    return inverse(this);
	  } else {
		  if (context === comparisonString) {
			    return fn(this); 
		  } else {
			  	return inverse(this);	
		  }
	  }
	});


Handlebars.registerHelper("stringEquals", function(conditional, options) {
  if (options.hash.desired === options.hash.type) {
    options.fn(this);
  } else {
    options.inverse(this);
  }
});

Handlebars.registerHelper('renderSubject', function(value) {
  var out = "";
  switch (value){
    case "1":
      out = "English";
      break;
    case "2":
      out = "Kiswahili";
      break;
  }
  return out;
});

Handlebars.registerHelper('renderSelector', function(list, value) {
  list.sort();
  var out = "";
  for (var i = 0; i < list.length; i++) {
    if (value.indexOf(encodeURIComponent(list[i])) >= 0) {
      out = out + '  <option selected = "selected" value="' + encodeURIComponent(list[i]) + '">'  + list[i] + '</option>';
    } else {
      out = out + '  <option value="' + encodeURIComponent(list[i]) + '">'  + list[i] + '</option>';
    }
  }
  return out;
});

Handlebars.registerHelper('renderAudioCode', function( ) {
  var out = '';

  if (this.identifier === "audio")
  {
    out = " \
      <h2>Embed code</h2> \
      <div id='audio-code' style='font-size:10px; padding:20px; background-color:#ccc;'></div> \
    ";
  }

  return out;

});

Handlebars.registerHelper('renderCkeditor', function(identifier, value) {
  var out = "<br/><textarea id='"+ identifier + "' name='"+ identifier + "' " + ">"+ value + "</textarea>";
  //CKEDITOR.replace('lessonText');
  return out;
});

Handlebars.registerHelper('renderOrderItems', function(identifier) {
//  $( "#sortable" ).sortable();
//  $( "#sortable" ).disableSelection();
  var selectedMediaItems = [];
  $('#image :selected').each(function(i, selected){
    selectedMediaItems.push($(selected).text());
    //console.log("selectedMediaItems[i]: " + i + " text: " + $(selected).text())
  });
  $('#audio :selected').each(function(i, selected){
    selectedMediaItems.push($(selected).text());
  });
  var out = '<ul id="sortable">';
  for(var i=0, l=selectedMediaItems.length; i<l; i++) {
    var encodedValue = encodeURIComponent(selectedMediaItems[i]);
    var cssFriendlyValue = encodedValue.replace(/%/g, 'ZZZ');
    var cssFriendlyValue = cssFriendlyValue.replace(/\./g, 'XXX');
    out = out + '<li id="'+ cssFriendlyValue + '" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + selectedMediaItems[i] + '</li>';
  }
  out = out + '</ul>';
 // out = out + '<button type="button" id="resetOrder" name="resetOrder">Refresh Order</button> ';
  out = out + '<input type="hidden" id="'+ identifier + '" name="'+ identifier + '"/>';
  return out;
});