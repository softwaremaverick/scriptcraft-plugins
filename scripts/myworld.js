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

var headroomHeight = 3;

function Rails() {
   this.drone = new Drone(self);
   this.baseblock = blocks.slab.upper.stonebrick;
   this.headroomHeight = headroomHeight;
}

Rails.prototype.fwd = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   if (this.headroomHeight) {
      this.drone.box(blocks.air, 1, headroomHeight, length);
   }

   this.drone.down().box(this.baseblock, 2, 1, length);
   this.drone.up().box(blocks.powered_rail, 1, 1, length);
   this.drone.right().box(blocks.torch_redstone, 1, 1, length);

   this.drone.fwd(length).left();
   return this;
}

function railUpOrDown(railObject, isUp, length) {
   if (isUp) {
       railObject.drone.up();
   } else {
       railObject.drone.down();
   }

   for (i=0; i < length; i++) {
      if (railObject.headroomHeight) {
		  railObject.drone.box(blocks.air, 1, headroomHeight);
	  }

	  railObject.drone.down().box(railObject.baseblock, 2);
	  railObject.drone.up().box(blocks.powered_rail);
	  railObject.drone.right().box(blocks.torch_redstone);

      railObject.drone.left().fwd();

	  if (isUp) {
          railObject.drone.up();
      } else {
          railObject.drone.down();
      }
   }

   // Gone up/down too far
   if (isUp) {
      railObject.drone.down();
   } else {
      railObject.drone.up();
   }
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
   if (this.headroomHeight) {
      this.drone.box(blocks.air, 1, headroomHeight, length);
   }

   this.drone.down().box(this.baseblock).up().box(blocks.rail).turn(3).fwd();

   if (length) {
      this.fwd(length);
   }

   return this;
}

Rails.prototype.right = function(length) {
   if (this.headroomHeight) {
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