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

function railUp(length, baseblock) {
   fwd().box(baseblock).up().times(length);
   box(blocks.powered_rail).fwd().up().times(length+1);

   var drone = new Drone(self);
   drone.right().box(blocks.torch_redstone);

   var times = parseInt(length / torchInterval);

   for (i=0; i < times; i++) {
      drone.up(torchInterval).fwd(torchInterval).down().box(baseblock).up().box(blocks.torch_redstone);
   }
}

function railForward(length, baseblock) {
   down().box(baseblock, 1, 1, length);
   box(blocks.powered_rail, 1, 1, length);

   var drone = new Drone(self);
   drone.right().box(blocks.torch_redstone);

   var times = parseInt(length / torchInterval);

   for (i=0; i < times; i++) {
      drone.fwd(torchInterval).box(blocks.torch_redstone);
   }

   return fwd(length);
}


function Rails() {
   this.drone = new Drone(self);
   this.baseblock = blocks.wool.white;
}

Rails.prototype.fwd = function(length) {
   this.drone.down().box(this.baseblock, 1, 1, length);
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

Rails.prototype.up = function(length) {

   this.drone.chkpt('start').down();

   for (i=0; i < length; i++) {
      this.drone.box(this.baseblock).fwd().up();
   }

   this.drone.move('start');

   for (i=0; i < length; i++) {
      this.drone.box(blocks.powered_rail).fwd().up();
   }

   this.drone.move('start').right().down().box(this.baseblock).up().box(blocks.torch_redstone);

   var times = parseInt(length / torchInterval);

   for (i=0; i < times; i++) {
      this.drone.up(torchInterval).fwd(torchInterval).down().box(this.baseblock).up().box(blocks.torch_redstone);
   }

   this.drone.left();

   return this;
}

function rails() {
   return new Rails();
}

exports.rails = rails;
exports.railride = railride;
exports.torchwall = torchwall;
exports.railUp = railUp;
exports.railForward = railForward;