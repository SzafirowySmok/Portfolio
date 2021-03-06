$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i=0; i<10; i++) {
            str +=chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    // klasa Column
    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
        function createColumn() {
            // tworzenie elementów składowych
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
            // podpinanie zdarzeń
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt('Wpisz nazwę karty')));
            });
            // konstruowanie elementów kolumny
            $column.append($columnTitle)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($columnCardList);
            // zwracanie stworzonej kolumny
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    // klasa Card
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            $cardDelete.click(function() {
                self.removeCard();
            });
           $card.append($cardDelete)
                .append($cardDescription);
            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }
    // obiekt board
    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    }
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    $('.create-column').click(function() {
        var name = prompt('Wpisz nazwę kolumny');
        var column = new Column(name);
        board.addColumn(column);
    });
    // tworzenie kolumn
    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie');
    var doneColumn = new Column('Skończone');
    // dodawanie kolumn do tablicy
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    //tworzenie nowych kart
    var card1 = new Card('Szukanie ofert pracy');
    var card2 = new Card('Przygotowanie portfolio');
    var card3 = new Card('Tablica Kanban');
    //dodawanie kart do kolumn
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
})