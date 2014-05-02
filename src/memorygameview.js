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
   var game = this._game,
      jTarget = $(evt.currentTarget);
   if (game.isComplete() || jTarget.hasClass('selected correct')) {
      return false;
   }
   var jItems = this._jContainer.find('.item').removeClass('selected');
   game.selectItem(jTarget.data('item'));
      
   window.clearTimeout(this._timeout);
   
   jItems.each(function(index, el) {
      var jEl = $(el),
         item = jEl.data('item');
      jEl.toggleClass('selected', item.exposed)
         .toggleClass('correct',  item.correct);
   });
   
   if (game.hasMaximumSelected()) {
      this._timeout = window.setTimeout(function() {
         jItems.removeClass('selected');
      }, 2000);
   }
   
   return false;
};

MemoryGameView.buildItem = function(game, item) {
   var jItem = MemoryGameView.ITEM_TEMPLATE.clone()
                  .find('.front')
                  .text(item.value)
                  .end()
                  .data('item', item)
                  .css({
                      width: 100 / game.width + '%',
                      height: 100 / game.height + '%'
                  });
   
   return jItem;
};

MemoryGameView.TEMPLATE = $('<div class="game-container" />');

MemoryGameView.ITEM_TEMPLATE = $('<div class="item"><div class="item-inner"><div class="front" /><div class="back" /></div>');
