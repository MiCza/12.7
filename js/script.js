$(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() *chars.length)];
    }
    return str;
  }
  randomString();

  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;

    this.$element = createColumn();

// Functions of colums
    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').append('<i class="far fa-trash-alt" aria-hidden="true"></i>');
      var $columnAddCard = $('<button>').addClass('add-card').append('<i class="fas fa-plus-circle" aria-hidden="true"></i>');

// Add events
      $columnDelete.click(function () {
        self.removeColumn();
      });

// Add note after click
      $columnAddCard.click(function(event) {

        var input = prompt("Enter name of the new card:");
        if (input) {
          self.addCard(new Card(input));
        } else if (input === "") {
          alert('Please complete your card:');
        }}
      );

// Column events
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
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

// Create blocks
    function createCard() {
      var $card = $('<li>').addClass('card restored-item');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('card-delete').append('<i class="fas fa-minus-circle" aria-hidden="true"></i>');
      var $cardEdit = $('<button>').addClass('edit').append('<i class="far fa-edit" aria-hidden="true"></i>');

// Firm click events
      $cardDelete.click(function () {
        self.removeCard();
      });

      $cardEdit.click(function () {
        self.cardEdit($cardDescription);
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
      this.$element.remove();
    },

    cardEdit: function(newDescription) {
      var $newDescription = prompt('Please edit your card:', newDescription.text());
      if ($newDescription !== null && $newDescription !== "") {
        this.$element.children('p').text($newDescription);
      }
    }
  };

  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      forcePlaceholderSize: true,
      dropOnEmpty: true,
      tolerance: 'intersect'
    }).disableSelection();
  }

  $('.create-column').click(function() {
    var name = prompt('Enter your new column name:');
    if (name) {
      var column = new Column(name);
      board.addColumn(column);
    }  else if (name === "") {
      alert('Please name your new column:');
    }
  });

  // CREATING COLUMNS
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card('Create new boards');
  var card2 = new Card('and move them');
  var card3 = new Card('or edit or delete');

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
});
