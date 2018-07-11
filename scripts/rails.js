
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

function layRails(railObject, railBlocks, length, headroomHeight) {
   railObject.drone
            .left(railBlocks.railOffset)
            .box(blocks.air, railBlocks.width, headroomHeight, length)
            .down()
            .box(railObject.baseblock, railBlocks.width, 1, length)
            .up()
            .boxa(railBlocks.blocks, railBlocks.width, 1, length)
            .fwd(length - 1)
            .right(railBlocks.railOffset);
}

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

   layRails(this, this.railBlocks, length);

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

      layRails(railObject, railObject.upDownRailBlocks, 1, headroomHeight + 1);
      railObject.drone.fwd();
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

   // Must be an uunpowered rail to turn
   layRails(this, unpoweredRail, 1, headroomHeight);

   return this;
};

Rails.prototype.left = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   this.turnLeft();

   if (!this.isFirstRail) {
       this.drone.fwd();
   }

   layRails(this, this.railBlocks, length, headroomHeight);

   this.isFirstRail = false;
   return this;
};

Rails.prototype.turnRight = function(length) {
   this.drone
      .turn();

   // Must be an uunpowered rail to turn
   layRails(this, unpoweredRail, 1, headroomHeight);

   return this;
};

Rails.prototype.right = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }

   this.turnRight();

   if (!this.isFirstRail) {
       this.drone.fwd();
   }

   layRails(this, this.railBlocks, length, headroomHeight);

   this.isFirstRail = false;
   return this;
};

function rails(startPoint) {
   return new Rails(startPoint);
}

exports.rails = rails;
