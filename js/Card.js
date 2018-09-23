function Card(id, name, columnID) {
	var self = this;

	this.id = id;
	this.name = name;
	this.columnID = columnID;
	this.$element = createCard();

// Create blocks
	function createCard() {
		var $card = $('<li>').addClass('card restored-item').attr('id', id);
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('card-delete').append('<i class="fas fa-minus-circle" aria-hidden="true"></i>');
		var $cardEdit = $('<button>').addClass('edit').append('<i class="far fa-edit" aria-hidden="true"></i>');

// Firm click events
		$cardDelete.click(function () {
			self.removeCard();
		});

		$cardEdit.click(function () {
			self.editCard($cardDescription, columnID);
		});

// Combine block and return
		$card.append($cardDelete)
		.append($cardDescription)
		.append($cardEdit);
		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.$element.remove();
			}
		});
	},

	editCard: function(card, columnID) {
		var newDescription = prompt('Please edit your card:', card.text());
		var self = this;

		if (newDescription !== null && newDescription !== "") {
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: newDescription,
					bootcamp_kanban_column_id: columnID
				},
				success: function (response) {
					self.$element.children('p').text(newDescription);
				}
			});
		}
	}
};
