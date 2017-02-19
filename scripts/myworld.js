function railride(length, count, baseblock) {
   if (!count) {
      count = 1;
   }

   if (baseblock) {
      for (var i=0; i < count; i++) {
         fwd(2*i).left().down().box(baseblock, length+2, 1, 2);
      }
   }

   for (var i=0; i < count; i++) {
      fwd(2*i).box(blocks.powered_rail, length).fwd().box(blocks.torch_redstone, length);
   }
}

function torchwall(length, depth, baseblock) {
   box0(baseblock, length, 1, depth).up().box0(blocks.torch, length, 1, depth);
}

function testrails() {
   var drone = new Drone( self );

   var baseblocks = [ 
      blocks.wool.red, 
      blocks.wool.orange, 
      blocks.wool.yellow, 
      blocks.wool.lime, 
      blocks.wool.lightblue, 
      blocks.wool.blue, 
      blocks.wool.purple 
   ];

   for (var i=0; i < 7; i++) {
       rails(drone).fwd(20, baseblocks [i % baseblocks.length]).up(30).fwd(50).down(30).fwd(10);

       drone.left(2);
   }
}

exports.railride = railride;
exports.testrails = testrails;
exports.torchwall = torchwall;
