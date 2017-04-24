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

function domeHouse(radius) {
    var drone = new Drone( self );
    drone.cylinder(blocks.oak, radius, 1)
         .up()
         .hemisphere0(blocks.glass, radius, 'north')
         .fwd(radius + 2)
         .down(2)
         .turn()
         .arc({blockType: 95, meta: 4, radius: 2, orientation: 'vertical', fill:false, quadrants:{topleft:true, topright:true, bottomleft:false, bottomright:false}})
         .up(2)
         .right()
         .box(blocks.air, 3, 2);
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

function stairs(startPoint, width, height, depth) {
   var drone = new Drone( startPoint );

   if (width == 1) {
      drone.box(blocks.stairs.stone);
   }
   else {
      drone.fwd(depth - 1)
           .turn()
           .box(blocks.stairs.stone, depth)
           .fwd(width - 1)
           .turn(2)
           .left(depth - 1)
           .box(blocks.stairs.stone, depth);

      if (width > 2) {
         drone.move('start')
              .right()
              .box(blocks.stairs.stone, width-2)
              .fwd()
              .box(blocks.stone, width - 2, 1, depth - 1, 1);

         if (height > 1 && depth > 1) {
            drone.up();

            stairs(drone, width - 2, height - 1, depth - 1);
         }
      }
   }
}

var quadHouseEntranceWidth = 5;
var quadHouseEntranceHeight = 6;

function quadHouse() {
   var drone = new Drone( self );
   
   drone.chkpt('entranceSideStart');

   drone.box(blocks.stone, quadHouseEntranceWidth, 2, quadHouseEntranceWidth)
        .up(2)
        .box0(blocks.stone, quadHouseEntranceWidth, quadHouseEntranceHeight - 2, quadHouseEntranceWidth)
        .up(quadHouseEntranceHeight - 2)
        .left()
        .back()
        .box(blocks.stone, quadHouseEntranceWidth + 2, 1, quadHouseEntranceWidth + 2)
        .up()
        .box0(blocks.cobblestone_wall, quadHouseEntranceWidth + 2, 1, quadHouseEntranceWidth + 2);

   drone.move('entranceSideStart')
        .left(3)
        .back(3)
        .box0(blocks.air, quadHouseEntranceWidth + 6, quadHouseEntranceHeight, quadHouseEntranceWidth + 6)
        .move('entranceSideStart');

   for (var sideNumber = 1; sideNumber <= 4; sideNumber++) {
      buildQuadHouseSide(drone, sideNumber);

      if (sideNumber != 4) {
         drone.move('entranceSideStart')
              .fwd(quadHouseEntranceWidth - 1)
              .turn()
              .chkpt('entranceSideStart');
      }
   }
}

function woodenHouse(startPoint, width, height, depth) {
    var houseDrone = new Drone(startPoint);

    houseDrone.box(blocks.wood, width, 1, depth)
              .up()
              .box0(blocks.oak, width, height - 2, depth)
              .up(height - 2)
              .box(blocks.wood, width, 1, depth);

    // door
    houseDrone.move("start")
              .up()
              .right(Math.floor(width / 2))
              .door();

    // external torches
    houseDrone.up()
              .back()
              .left()
              .hangtorch()
              .right(2)
              .hangtorch();

    // internal torches
    houseDrone.move("start")
              .up(height - 2)
              .fwd()
              .right()
              .turn(3)
              .hangtorch()
              .right(depth - 3)
              .hangtorch();

    houseDrone.back(width - 3)
              .turn(2)
              .hangtorch()
              .right(depth - 3)
              .hangtorch();
}

function buildQuadHouseSide(drone, sideNumber) {
   drone.up(2)
        .right(2)
        .door();

   if (sideNumber == 1) {
      drone.right()
           .fwd()
           .turn(2)
           .ladder(quadHouseEntranceHeight - 1);
   }

   // upper stairs
   drone.move('entranceSideStart')
        .right(3)
        .back()
        .up(quadHouseEntranceHeight + 1)
        .turn(2);

   for (var i=0; i < 2; i++) {
        drone.box(blocks.stairs.spruce, 3)
             .up()
             .fwd();
   }

   drone.box(blocks.stairs.spruce, 3)
        .fwd()
        .box(blocks.spruce, 3);

   // wooden house
   drone.left(4);

   woodenHouse(drone, 11, 6, 11);

   // ground stairs
   drone.move('entranceSideStart')
        .back(2);

   stairs(drone, quadHouseEntranceWidth, 2, 2);
}

exports.railride = railride;
exports.testrails = testrails;
exports.torchwall = torchwall;
exports.domeHouse = domeHouse;
exports.quadHouse = quadHouse;
exports.woodenHouse = woodenHouse;
exports.stairs = stairs;