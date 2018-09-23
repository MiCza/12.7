var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3283',
  'X-Auth-Token': '8e8a93efa4b622cde695bca1684fbf74'
};

$.ajaxSetup({
  headers: myHeaders
});

function setupCards(col, cards) {
  cards.forEach(function(card) {
    var newCard = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    col.addCard(newCard);
  });
}

function setupColumns(columns) {
  columns.forEach(function (column) {
    var col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  });
}

$.ajax({
  url: baseUrl + '/board',
  method: 'GET',
  success: function(response) {
    setupColumns(response.columns);
  }
});

function initSortable() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder',
    forcePlaceholderSize: true,
    dropOnEmpty: true,
    tolerance: 'intersect',
    receive: function(e, ui) {
      var sortableColumnID = this.id;
      var cardID = ui.item.attr('id');
      var cardName = ui.item.text();

      $.ajax({
        url: baseUrl + '/card/' + cardID,
        method: 'PUT',
        data: {
          name: cardName,
          bootcamp_kanban_column_id: sortableColumnID
        }
      });
    }
  }).disableSelection();
}
