var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#books',
	events: {
		'click #add' : 'addBook'
	},
	initialize: function(initialBooks){
		this.collection = new app.Library(initialBooks);
		this.render();
		this.listenTo(this.collection, 'add', this.renderBook);
	},
	render: function(){
		this.collection.each(function(item){
			this.renderBook(item);
		}, this);
	},
	renderBook: function(item){
		var bookView = new app.BookView({
			model: item
		});
		// console.log(item, bookView.render());
		this.$el.append( bookView.render().el );
	},
	addBook: function(e){
		e.preventDefault();

		var formData = {};

		$('#addBook div').children('input').each(function(i, el){
			if( $(el).val() != ''){
				formData[el.id] = $(el).val();
			}
		});

		this.collection.add(new app.Book(formData));
	}
});