var  blocks = require('blocks');

var rainbow_blocks_windows = [
  blocks.stained_glass.red,
  blocks.stained_glass.orange,
  blocks.stained_glass.yellow,
  blocks.stained_glass.lime,
  blocks.stained_glass.lightblue,
  blocks.stained_glass.blue,
  blocks.stained_glass.purple
];

var rainbow_blocks_floor = [
  blocks.wool.red,
  blocks.wool.orange,
  blocks.wool.yellow,
  blocks.wool.lime,
  blocks.wool.lightblue,
  blocks.wool.blue,
  blocks.wool.purple
];



function rainbowApartments(width, height) {
   var drone = new Drone( self );

   var colour_block_height = height / 7;

   for (i in rainbow_blocks_windows) {
      drone.box0(rainbow_blocks_windows[i], width, colour_block_height, width);

      if (i == 0) {
          // first floor clear area
          new Drone (drone)
               .fwd()
               .right()
               .box (blocks.air, width - 2, colour_block_height, width - 2);
      }

      var floorDrone = new Drone (drone)
           .down()
           .box(rainbow_blocks_floor[i], width, 1, width)
           .up(2)
           .box0(blocks.torch, width, 1, width);

      if (i == 0) {
          // first floor doors
          new Drone (drone)
               .right (width / 2)
               .door()
               .fwd(width - 1)
               .turn(2)
               .door();
      }

      var ladderDrone = new Drone (drone)
          .right(width / 2)
          .fwd((width / 2) - 1);

      if (i != 0) {
          ladderDrone.down()
          .box(blocks.ladder)
          .up();
      }

      ladderDrone.ladder(colour_block_height);

      drone.up(colour_block_height);
   }

   drone.box0(blocks.torch, width, 1, width)
        .down()
        .box(rainbow_blocks_windows[6], width, 1, width);

      new Drone (drone)
          .right(width / 2)
          .fwd((width / 2) - 1)
          .box(blocks.ladder);
}

exports.rainbowApartments = rainbowApartments;