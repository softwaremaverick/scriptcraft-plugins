
var headroomHeight = 2;

var railWithTorchOnLeft = {
   blocks: [ blocks.torch_redstone, blocks.powered_rail ],
   railOffset: 1,
   width: 2
};

var railWithTorchOnRight = {
   blocks: [ blocks.powered_rail, blocks.torch_redstone ],
   railOffset: 0,
   width: 2
};

var railWithDetectorRail = {
   blocks: [blocks.detector_rail, blocks.powered_rail],
   railOffset: 0,
   width: 1
};

var unpoweredRail = {
   blocks: [ blocks.rail ],
   railOffset: 0,
   width: 1
};

function Rails(startPoint) {
   if (typeof startPoint === 'undefined') {
      startPoint = self;
   }

   this.drone = new Drone(startPoint);
   this.baseblock = blocks.slab.upper.stonebrick;

   this.railBlocks = railWithDetectorRail;
   this.upDownRailBlocks = railWithTorchOnRight;

   this.isFirstRail = true;
}

Rails.prototype.powerMode = function(powerMode) {
   switch (powerMode) {
      case 0:
            this.railBlocks = unpoweredRail;
            this.upDownRailBlocks = unpoweredRail;
            break;

      case 1:
            this.railBlocks = railWithDetectorRail;
            this.upDownRailBlocks = railWithDetectorRail;
            break;

      case 2:
            this.railBlocks = railWithTorchOnLeft;
            this.upDownRailBlocks = railWithTorchOnLeft;
            break;

      case 3:
            this.railBlocks = railWithTorchOnRight;
            this.upDownRailBlocks = railWithTorchOnRight;
            break;
   }

   return this;
};

Rails.prototype.fwd = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }
   if (typeof length == 'undefined') {
      length = 1;
   }

   if (!this.isFirstRail) {
       this.drone.fwd();
   }

   this.drone
            .left(this.railBlocks.railOffset)
            .box(blocks.air, this.railBlocks.width, headroomHeight, length)
            .down()
            .box(this.baseblock, this.railBlocks.width, 1, length)
            .up()
            .boxa(this.railBlocks.blocks, this.railBlocks.width, 1, length)
            .fwd(length - 1)
            .right(this.railBlocks.railOffset);

   this.isFirstRail = false;
   return this;
};

function railUpOrDown(railObject, isUp, length) {
   if (typeof length == 'undefined') {
      length = 1;
   }

   for (var i=0; i < length; i++) {
      if (isUp) {
         railObject.drone.up();
      } else {
         railObject.drone.down();
      }

      railObject.drone
                     .left(railObject.upDownRailBlocks.railOffset)
                     .box(blocks.air, railObject.upDownRailBlocks.width, headroomHeight + 1)
                     .down()
                     .box(railObject.baseblock, railObject.upDownRailBlocks.width)
                     .up()
                     .boxa(railObject.upDownRailBlocks.blocks, railObject.upDownRailBlocks.width)
                     .fwd()
                     .right(railObject.upDownRailBlocks.railOffset)
   }

   railObject.drone.back();
}

Rails.prototype.up = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   if (!this.isFirstRail) {
       this.drone.fwd();
   }

   // add extra head room before going up
   this.drone
       .up()
       .back()
       .box(blocks.air, 1, headroomHeight + 1)
       .fwd()
       .down();

   railUpOrDown(this, true, length);
   this.isFirstRail = false;
   return this;
}

Rails.prototype.down = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   if (!this.isFirstRail) {
       this.drone.fwd();
   }

   railUpOrDown(this, false, length);
   this.isFirstRail = false;
   return this;
};

Rails.prototype.turnLeft = function(length) {
   this.drone
      .turn(3);

   return this;
};

Rails.prototype.left = function(length, baseblock) {
   this.turnLeft()
      .fwd(length, baseBlock);

   this.isFirstRail = false;
   return this;
};

Rails.prototype.turnRight = function(length) {
   this.drone
      .turn();

   return this;
};

Rails.prototype.right = function(length, baseblock) {
   this.turnRight()
      .fwd(length, baseBlock);

   this.isFirstRail = false;
   return this;
};

function rails(startPoint) {
   return new Rails(startPoint);
}

exports.rails = rails;
