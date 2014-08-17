window.RecordElementView = Backbone.View.extend({
  tagName: "td",
  template: Handlebars.compile($("#record-element-template").html()),
  initialize: function (){
	  //this.model.bind('destroy', this.remove, this);
	  //this.model.bind('change', this.render, this);
	  this.model.bind('validationError', this.showErrorMessages, this);
	  this.model.view = this;
  },
  render: function(){
	  this.colspan = this.model.get("colspan");
	  if (this.colspan == null) {
		  this.colspan = 1;
	  }
	  $(this.el).attr('colspan',this.colspan);
	  
	  var renderedHtml = this.template(this.model.toJSON());

	  $(this.el).html(renderedHtml); 

	  // fix links

	  $(this.el).find("source").each(function(i, el){
	  	var $el = $(el);
	  	var src = $el.attr("src");
	  	var url = encodeURI("http://"+window.location.hostname+"/" + decodeURIComponent(src));
	  	$el.attr("src", url);
	  });

	  return this;
  },
});
