var Drone = require('drone'),
    blocks = require('blocks');

function twistyrail(width, height) {
    var drone = new Drone( self );
    var remainingHeight = height;
    var myrails = rails();

    for (var remainingHeight = height; remainingHeight > 0; remainingHeight -= width) {
        myrails.fwd()
               .up(width)
               .turnLeft();
    }
}

function funtower(width, height) {
    var drone = new Drone( self );
    var remainingHeight = height;

    drone.box(blocks.oak, width, height, width)
         .right(width+1)
         .back();

    var myrails = rails(drone);
    myrails.fwd();

    var first = true;

    for (var remainingHeight = height; remainingHeight > 0; remainingHeight -= width) {
        myrails.fwd()
               .up(first? width : width+2)
               .turnLeft();

        first = false;
    }
}

Drone.extend( twistyrail );
Drone.extend( funtower );
