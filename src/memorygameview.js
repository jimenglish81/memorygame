function MemoryGameView(game) {
   this._game = game;
}

MemoryGameView.prototype.render = function() {
   var jDom = MemoryGameView.TEMPLATE.clone();
   jDom.append(this._game.grid.map(MemoryGameView.buildItem));
};

MemoryGame.prototype._buildItem = function(item) {
   var jItem = MemoryGameView.ITEM_TEMPLATE.clone().text(item.value);
   return MemoryGameView.ITEM_TEMPLATE.clone
};

MemoryGameView.TEMPLATE = $('div />');

MemoryGameView.ITEM_TEMPLATE = $('div />');
