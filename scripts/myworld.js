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
    drone.left(radius)
         .cylinder(blocks.oak, radius, 1)
         .up()
         .hemisphere0(blocks.glass, radius, 'north')
         .move('start')
         .left(2)
         .down()
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

function watchTower(startptr, width, height) {
   buildWatchTower(startptr, width, height, buildTowerSide);
}

function buildWatchTower(startptr, width, height, buildSideCallback) {
   var drone = new Drone( self );

   drone.chkpt('entranceSideStart');

   drone.box(blocks.stone, width, 2, width)
        .up(2)
        .box0(blocks.stone, width, height - 2, width)
        .up(height - 2)
        .left()
        .back()
        .box(blocks.stone, width + 2, 1, width + 2)
        .up()
        .box0(blocks.cobblestone_wall, width + 2, 1, width + 2);

   // add torches to cobblestone wall
   drone.up()
        .box(blocks.torch)
        .right(width + 1)
        .box(blocks.torch)
        .fwd(width + 1)
        .box(blocks.torch)
        .left(width + 1)
        .box(blocks.torch);

   drone.move('entranceSideStart')
        .left(3)
        .back(3)
        .box0(blocks.air, width + 6, height, width + 6)
        .move('entranceSideStart');

   for (var sideNumber = 1; sideNumber <= 4; sideNumber++) {
      buildSideCallback(drone, sideNumber, width, height);

      if (sideNumber != 4) {
         drone.move('entranceSideStart')
              .fwd(width - 1)
              .turn()
              .chkpt('entranceSideStart');
      }
   }
}

function buildTowerSide(drone, sideNumber, width, height) {
   drone.up(2)
        .right(Math.floor(width / 2));

   torchLitDoor(drone);

   if (sideNumber == 1) {
      drone.right()
           .fwd()
           .turn(2)
           .ladder(height - 1);
   }

   // ground stairs
   drone.move('entranceSideStart')
        .back(2);

   stairs(drone, width, 2, 2);
}

function quadHouse() {
   buildWatchTower( self, quadHouseEntranceWidth, quadHouseEntranceHeight, buildQuadHouseSide );
}

function buildQuadHouseSide(drone, sideNumber) {
   buildTowerSide(drone, sideNumber, quadHouseEntranceWidth, quadHouseEntranceHeight);

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
}

function torchLitDoor(drone) {
    drone.chkpt('torchDoor')
         .door()
         .up()
         .back()
         .left()
         .hangtorch()
         .right(2)
         .hangtorch()
         .move('torchDoor');
}

function woodenHouse(startPoint, width, height, depth) {
    var drone = new Drone(startPoint);

    drone.box(blocks.wood, width, 1, depth)
         .up()
         .box0(blocks.oak, width, height - 2, depth)
         .up(height - 2)
         .box(blocks.wood, width, 1, depth);

    // door
    drone.move("start")
         .up()
         .right(Math.floor(width / 2));

    torchLitDoor(drone);

    // internal torches
    drone.move("start")
         .up(height - 2)
         .fwd()
         .right()
         .turn(3)
         .hangtorch()
         .right(depth - 3)
         .hangtorch();

    drone.back(width - 3)
         .turn(2)
         .hangtorch()
         .right(depth - 3)
         .hangtorch();
}

exports.railride = railride;
exports.testrails = testrails;
exports.torchwall = torchwall;
exports.domeHouse = domeHouse;
exports.quadHouse = quadHouse;
exports.woodenHouse = woodenHouse;
exports.watchTower = watchTower;
exports.stairs = stairs;