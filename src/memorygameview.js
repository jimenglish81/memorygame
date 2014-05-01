function MemoryGameView(game, cssSelector) {
   this._game = game;
   this._jContainer = $(cssSelector).css('position', 'relative');
}

MemoryGameView.prototype.render = function() {
    var jDom = MemoryGameView.TEMPLATE.clone().css({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    });
   jDom.append(this._game.grid.map(MemoryGameView.buildItem.bind(null, this._game)))
      .appendTo(this._jContainer);
      
   return this;
};

MemoryGameView.buildItem = function(game, item) {
   var jItem = MemoryGameView.ITEM_TEMPLATE.clone()
                     .text(item.value)
                     .css({
                        width: 100 / game.width + '%',
                        height: 100 / game.height + '%'
                      });
   
   return jItem;
};

MemoryGameView.TEMPLATE = $('<div />');

MemoryGameView.ITEM_TEMPLATE = $('<div />').addClass('item');
