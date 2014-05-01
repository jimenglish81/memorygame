function MemoryGameView(game, cssSelector) {
   this._game = game;
   this._jContainer = $(cssSelector).css('position', 'relative');
   this._addEvents();
}

MemoryGameView.prototype._addEvents = function() {
   this._jContainer.on('click', '.item', this._handleItemClicked.bind(this));
};

MemoryGameView.prototype.render = function() {
   var jDom = MemoryGameView.TEMPLATE.clone().css({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
   }).append(this._game.grid.map(MemoryGameView.buildItem.bind(null, this._game)))
     .appendTo(this._jContainer.empty());
   
   return this;
};

MemoryGameView.prototype._handleItemClicked = function(evt) {
   var jTarget = $(evt.target).addClass('selected');
   this._game.selectItem(jTarget.data('item'));
};

MemoryGameView.buildItem = function(game, item) {
   var jItem = MemoryGameView.ITEM_TEMPLATE.clone()
                .text(item.value)
                .data('item', item)
                .css({
                  width: 100 / game.width + '%',
                  height: 100 / game.height + '%'
                 });
   
   return jItem;
};

MemoryGameView.TEMPLATE = $('<div />');

MemoryGameView.ITEM_TEMPLATE = $('<div />').addClass('item');
