var Drone = require('drone'),
    blocks = require('blocks');

function underwaterBox(width, depth) {
    var drone = new Drone( self );
    drone.down(depth-1)
         .box(blocks.glass, width, 1, width)
         .up().box0(blocks.glass_pane, width, depth - 1, width)
         .fwd().right().box(blocks.air, width-2, depth - 1, width - 2);
}

function underwaterGlassTunnel(width, depth, distance) {
    var drone = new Drone( self );
    drone.box(blocks.glass, width, 1, distance)
         .down(depth-1)
         .box(blocks.glass, width, 1, distance)
         .up().box0(blocks.glass_pane, width, depth - 2, distance)
         .fwd().right().box(blocks.air, width-2, depth - 2, distance - 2);
}

Drone.extend( underwaterBox );
Drone.extend( underwaterGlassTunnel );
