var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

$('.create-column').click(function() {
	var columnName = prompt('Enter name of the new column:');
	if (columnName) {
		$.ajax({
			url: baseUrl + '/column',
			method: 'POST',
			data: {
				name: columnName
			},
			success: function(response) {
				var column = new Column(response.id, columnName);
				board.addColumn(column);
			}
		});
	}  else if (name === "") {
		alert('Please name your new column:');
	}
});
