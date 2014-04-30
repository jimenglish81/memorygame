function MemoryGameView(game, cssSelector) {
   this._game = game;
   this._jContainer = $(cssSelector);
}

MemoryGameView.prototype.render = function() {
   var jDom = MemoryGameView.TEMPLATE.clone();
   jDom.append(this._game.grid.map(MemoryGameView.prototype._buildItem, this))
		.appendTo(this._jContainer);
		
   return this;
};

MemoryGameView.prototype._buildItem = function(item, index) {
   var jItem = MemoryGameView.ITEM_TEMPLATE.clone()
							.text(item.value)
							.toggleClass('break', !(index % this._game.width));
   return jItem;
};

MemoryGameView.TEMPLATE = $('<div />');

MemoryGameView.ITEM_TEMPLATE = $('<div />').addClass('item');
