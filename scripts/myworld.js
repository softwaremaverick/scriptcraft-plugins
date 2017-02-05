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

exports.railride = railride;
exports.torchwall = torchwall;
exports.railUp = railUp;
exports.railForward = railForward;