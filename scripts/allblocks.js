var Drone = require('drone');

function allBlocks() {
   var drone = new Drone(self);
   var width = 10;

   var totalWidth = (width * 2) + 1;

   var block = 0;
   while (block < 300) {
      var rowDrone = new Drone(drone)
                 .down()
                 .back(2)
                 .box(blocks.cobblestone, totalWidth, 1, 3)
                 .fwd(2)
                 .up()
                 .box(blocks.nether_fence, totalWidth)
                 .back();

      for (var x=0; x < width; x++) {
         rowDrone.box(blocks.nether_fence)
                 .right()
                 .box(block++)
                 .right();
      }

      rowDrone.box(blocks.nether_fence);

      drone.back(2);
   }

   drone.box(blocks.nether_fence, totalWidth);
}

Drone.extend('allBlocks',  allBlocks);

