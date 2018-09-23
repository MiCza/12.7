function Column(id, name) {
	var self = this;

	this.id = id;
	var columnID = id;
	this.name = name || 'Name is not given';
	this.$element = createColumn();

// Creating column
	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list').attr('id', columnID);
		var $columnDelete = $('<button>').addClass('btn-delete').append('<i class="far fa-trash-alt" aria-hidden="true"></i>');
		var $columnAddCard = $('<button>').addClass('add-card').append('<i class="fas fa-plus-circle" aria-hidden="true"></i>');

// Add events and notes
		$columnDelete.click(function () {
			self.removeColumn();
		});
		$columnAddCard.click(function(event) {

			var cardName = prompt("Enter name of the new card:");
			if (cardName) {
				$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: {
						name: cardName,
						bootcamp_kanban_column_id: id
					},
					success: function(response) {
						var card = new Card(response.id, cardName, columnID);
						self.addCard(card);
					}
				});
			} else if (cardName === "") {
				alert('Please complete your card:');
			}
		});

// Construction column
		$column.append($columnDelete)
						.append($columnTitle)
						.append($columnAddCard)
						.append($columnCardList);

		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function (response){
				self.$element.remove();
			}
		});
	}
};
