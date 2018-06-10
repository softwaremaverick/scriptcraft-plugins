
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

function Rails(startPoint) {
   if (typeof startPoint === 'undefined') {
      startPoint = self;
   }

   this.drone = new Drone(startPoint);
   this.baseblock = blocks.slab.upper.stonebrick;

   this.railBlocks = railWithDetectorRail;
   this.upDownRailBlocks = railWithTorchOnRight;
}

Rails.prototype.fwd = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }
   if (typeof length == 'undefined') {
      length = 1;
   }

   this.drone
            .left(this.railBlocks.railOffset)
            .box(blocks.air, 1, headroomHeight, length)
            .down()
            .box(this.baseblock, this.railBlocks.width, 1, length)
            .up()
            .boxa(this.railBlocks.blocks, this.railBlocks.width, 1, length)
            .fwd(length)
            .right(this.railBlocks.railOffset);

   return this;
}

function railUpOrDown(railObject, isUp, length) {
   for (var i=0; i < length; i++) {
      if (isUp) {
         railObject.drone.up();
      } else {
         railObject.drone.down();
      }

      railObject.drone
                     .left(railObject.upDownRailBlocks.railOffset)
                     .box(blocks.air, 1, headroomHeight + 1)
                     .down()
                     .box(railObject.baseblock, 2)
                     .up()
                     .boxa(railObject.upDownRailBlocks.blocks, railObject.upDownRailBlocks.width)
                     .fwd()
                     .right(railObject.upDownRailBlocks.railOffset)
   }
}

Rails.prototype.up = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }
   if (typeof length == 'undefined') {
      length = 1;
   }

   // add extra head room before going up
   this.drone
       .up()
       .back()
       .box(blocks.air, 1, headroomHeight + 1)
       .fwd()
       .down();

   railUpOrDown(this, true, length);
   return this;
}

Rails.prototype.down = function(length, baseblock) {
   if (typeof baseblock !== 'undefined') {
      this.baseblock = baseblock;
   }
   if (typeof length == 'undefined') {
      length = 1;
   }

   railUpOrDown(this, false, length);
   return this;
}

Rails.prototype.left = function(length) {
   this.drone
            .box(blocks.air, 1, headroomHeight)
            .down()
            .box(this.baseblock)
            .up()
            .box(blocks.rail)
            .turn(3)
            .fwd();

   if (length) {
      this.fwd(length);
   }

   return this;
}

Rails.prototype.right = function(length) {
   this.drone
            .box(blocks.air, 1, headroomHeight)
            .down()
            .box(this.baseblock)
            .up()
            .box(blocks.rail)
            .turn()
            .fwd();

   if (length) {
      this.fwd(length);
   }

   return this;
}

function rails(startPoint) {
   return new Rails(startPoint);
}

exports.rails = rails;
