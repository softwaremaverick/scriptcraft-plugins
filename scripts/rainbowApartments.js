var  blocks = require('blocks');

var rainbow_blocks_windows = [
  blocks.stained_glass_pane.red,
  blocks.stained_glass_pane.orange,
  blocks.stained_glass_pane.yellow,
  blocks.stained_glass_pane.lime,
  blocks.stained_glass_pane.blue,
  blocks.stained_glass_pane.purple,
  blocks.stained_glass_pane.magenta
];

var rainbow_blocks_floor = [
  blocks.concrete.red,
  blocks.concrete.orange,
  blocks.concrete.yellow,
  blocks.concrete.lime,
  blocks.concrete.blue,
  blocks.concrete.purple,
  blocks.concrete.magenta
];



function rainbowApartments(width, height) {
   if (width % 2 == 0) {
      echo(self, 'rainbowApartments width should be an odd number like ' + (width + 1) + " or " + (width - 1));
      return;
   }
   if (width < 5 || height < 21) {
      echo(self, 'rainbowApartments width must be atleast 5 and height must atleast 21');
      return;
   }


   var centre_block = Math.floor(width / 2) + 1;

   var drone = new Drone( self );

   var colour_block_height = height / 7;

   for (i in rainbow_blocks_windows) {
      drone.box0(rainbow_blocks_windows[i], width, colour_block_height, width);

      // Build solid corners
      var cornerDrone = new Drone (drone)
           .box(rainbow_blocks_floor[i], 1, colour_block_height, 1)
           .left()
           .turn();

      cornerDrone.box( blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[cornerDrone.dir], 1, colour_block_height, 1)
           .turn(3)
           .right()
           .fwd(width - 1)
           .box(rainbow_blocks_floor[i], 1, colour_block_height, 1)
           .fwd()
           .turn(2);

      cornerDrone.box( blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[cornerDrone.dir], 1, colour_block_height, 1)
           .fwd()
           .left(width - 1)
           .box(rainbow_blocks_floor[i], 1, colour_block_height, 1)
           .left()
           .turn();

      cornerDrone.box( blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[cornerDrone.dir], 1, colour_block_height, 1)
           .left(width - 1)
           .fwd()
           .box(rainbow_blocks_floor[i], 1, colour_block_height, 1)
           .left()
           .turn()

      cornerDrone.box( blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[cornerDrone.dir], 1, colour_block_height, 1);

      if (i == 0) {
          // first floor clear area
         new Drone (drone)
               .fwd()
               .right()
               .box (blocks.air, width - 2, colour_block_height, width - 2);
      }

      // Build floor
      new Drone (drone)
           .down()
           .box(rainbow_blocks_floor[i], width, 1, width);


      if (i == 0) {
         // first floor doors
         new Drone (drone)
              .right (centre_block - 2)
              .box(rainbow_blocks_floor[i], 3, 2, 1)
              .right()
              .door()
              .fwd(width - 1)
              .turn(2)
              .left()
              .box(rainbow_blocks_floor[i], 3, 2, 1)
              .right()
              .door();
      }

      var ladderDrone = new Drone (drone)
          .right(centre_block - 1)
          .fwd(centre_block - 1);

      if (i != 0) {
         ladderDrone.down()
                    .box(blocks.ladder)
                    .up();
      }

      ladderDrone.ladder(colour_block_height);

      drone.up(colour_block_height);
   }

   // rooftop
   drone.box0(blocks.fence.acacia, width, 1, width)
        .up()
        .box0(blocks.torch, width, 1, width)
        .down(2)
        .box(rainbow_blocks_floor[6], width, 1, width);

   new Drone (drone)
       .right(centre_block - 1)
       .fwd(centre_block - 1)
       .box(blocks.ladder);
}

exports.rainbowApartments = rainbowApartments;