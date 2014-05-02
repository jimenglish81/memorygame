function MemoryGame(width, height) {
   this.width = width || MemoryGame.WIDTH;
   this.height = height || MemoryGame.HEIGHT;
   this._size = this.height * this.width;
   this._moves = 0;
   this._selected = [];

   this._initialise();
}

MemoryGame.prototype._initialise = function() {
   var numberOfPairs = this._size / 2;

   // as used by @steveukx
   this.grid = (new String(new Array(this.width * this.height)).split(',').map(function(value, index) { 
      return new MemoryGame.Item(index % numberOfPairs + 1);
   }, this)).sort(function() { 
      return 0.5 - Math.random(); 
   });
   
   return this;
};

MemoryGame.prototype._getItem = function(row, col) {
   return this.grid[row * this.width + col];
};

MemoryGame.prototype.selectItem = function(item) {
   var selectedLen = this._selected.length;
   
   if (item) {
      if (this.hasMaximumSelected()) {
         while(selectedLen--) {
            this._selected.pop().exposed = false;
         }
      }
    
      item.exposed = true;
      this._selected.push(item);
    
      if (this.hasMaximumSelected()) {
         if (this._selected[0].value === this._selected[1].value) {
            this._selected.forEach(function(item) {
               item.correct = true;
            });
            var gameOver = !this._grid.filter(function(item) {
               return !item.correct;
            }).length;
            if (gameOver) {
               console.log('won!');
            }
         }
      }
    
      this._moves++;
   }

   return this;
};

MemoryGame.prototype.hasMaximumSelected = function() {
   return this._selected.length === 2;
};

MemoryGame.WIDTH = 5;

MemoryGame.HEIGHT = 4;

MemoryGame.Item = function(value) {
   this.value = value;
   this.exposed = false;
   this.correct = false;
};
