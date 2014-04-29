function MemoryGame() {

}

MemoryGame.prototype.init = function(size) {
   this._size = size || MemoryGame.SIZE;
   this._moves = 0;
   this._selected = [];
   
   // as used by @steveukx
   this._grid = (new String(new Array(this._size * this._size)).split(",").map(function() { 
      return new MemoryGame.Item();
   })).sort(function() { 
      return 0.5 - Math.random(); 
   });
   
   return this;
};

MemoryGame.prototype._getItem = function(row, col) {
   return this._grid[row * this._size + col];
};

MemoryGame.prototype.selectItem = function(row, col) {
   var item = this._getItem();
   var selectedLen = this._selected.length;
   
   if (item) {
      if (selectedLen === 2) {
         while(selectedLen--) {
            this._selected.pop().exposed = false;
         }
      }
      
      item.exposed = true;
      this._selected.push(item);
      
      if (this._selected.length === 2) {
         if (this._selected[0].value === this._selected[1].value) {
            var gameOver = !!!this._grid.filter(function(item) {
               return !item.exposed;
            }).length;
            this._selected = [];
            if (gameOver) {
               console.log('won!');
            }
         }
      }
      
      this._moves++;
   }
   return this;
};

MemoryGame.SIZE = 3;

MemoryGame.Item = function(value) {
   this.value = value;
   this.exposed = false;
};
