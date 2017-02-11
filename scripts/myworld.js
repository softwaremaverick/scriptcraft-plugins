function railride(length, count, baseblock) {
   if (!count) {
      count = 1;
   }

   if (baseblock) {
      for (i=0; i < count; i++) {
         fwd(2*i).left().down().box(baseblock, length+2, 1, 2);
      }
   }

   for (i=0; i < count; i++) {
      fwd(2*i).box(blocks.powered_rail, length).fwd().box(blocks.torch_redstone, length);
   }
}

function torchwall(length, depth, baseblock) {
   box0(baseblock, length, 1, depth).up().box0(blocks.torch, length, 1, depth);
}

var torchInterval = 1;
var headroomHeight = 4;

function Rails() {
   this.drone = new Drone(self);
   this.baseblock = blocks.slab.upper.stonebrick;
   this.headroom = true;
}

Rails.prototype.fwd = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   this.drone.down();

   if (this.headroom) {
      this.drone.box(blocks.air, 1, headroomHeight, length);
   }

   this.drone.box(this.baseblock, 1, 1, length);
   this.drone.up().box(blocks.powered_rail, 1, 1, length);

   this.drone.right().box(blocks.torch_redstone);

   var times = parseInt(length / torchInterval) - 1;

   this.drone.down().box(this.baseblock, 1, 1, length);
   this.drone.up();

   for (i=0; i < times; i++) {
      this.drone.fwd(torchInterval).box(blocks.torch_redstone);
   }

   this.drone.fwd().left();
   return this;
}

function railUpOrDown(railObject, isUp, length) {
   railObject.drone.chkpt('start');

   if (isUp) {
       railObject.drone.down();
   } else {
       railObject.drone.down(2);
   }

   for (i=0; i < length; i++) {
      if (railObject.headroom) {
		  railObject.drone.box(blocks.air, 1, headroomHeight);
	  }

	  railObject.drone.box(railObject.baseblock).fwd();

      if (isUp) {
          railObject.drone.up();
      } else {
          railObject.drone.down();
      }
   }

   railObject.drone.move('start');

   if (!isUp) {
       railObject.drone.down();
   }

   for (i=0; i < length; i++) {
      railObject.drone.box(blocks.powered_rail).fwd();

      if (isUp) {
          railObject.drone.up();
      } else {
          railObject.drone.down();
      }
   }

   railObject.drone.move('start');

   if (isUp) {
      railObject.drone.down();
   } else {
      railObject.drone.down(2);
   }

   railObject.drone.right().box(railObject.baseblock).up().box(blocks.torch_redstone);

   var times = parseInt(length / torchInterval);

   if (!isUp) {
	   times--;
   }

   for (i=0; i < times; i++) {
      if (isUp) {
          railObject.drone.up(torchInterval);
      } else {
          railObject.drone.down(torchInterval);
      }

      railObject.drone.fwd(torchInterval).down().box(railObject.baseblock).up().box(blocks.torch_redstone);
   }

   railObject.drone.left();
}

Rails.prototype.up = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   railUpOrDown(this, true, length);
   return this;
}

Rails.prototype.down = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   railUpOrDown(this, false, length);
   return this;
}

Rails.prototype.left = function(length) {
   if (this.headroom) {
      this.drone.box(blocks.air, 1, headroomHeight, length);
   }

   this.drone.down().box(this.baseblock).up().box(blocks.rail).turn(3).fwd();

   if (length) {
      this.fwd(length);
   }

   return this;
}

Rails.prototype.right = function(length) {
   if (this.headroom) {
      this.drone.box(blocks.air, 1, headroomHeight, length);
   }

   this.drone.down().box(this.baseblock).up().box(blocks.rail).turn().fwd();

   if (length) {
      this.fwd(length);
   }

   return this;
}

function rails() {
   return new Rails();
}

exports.rails = rails;
exports.railride = railride;
exports.torchwall = torchwall;