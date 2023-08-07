AFRAME.registerComponent('vr-motion-gain', {
  schema: {
    gain: { type: 'number', default: 20 } // Default gain is 20.
  },

  // Initialization function, called when the component is attached to an entity.
  init: function () {
    // Get the camera entity.
    this.camera = document.querySelector('a-camera');
    console.log('vr-motion-gain component is initialized.');
    
    // Store the last position to keep track of changes in position.
    this.lastPosition = new THREE.Vector3();
  },

  // Tick function, called on every frame.
  tick: function (time, timeDelta) {
    var gain = this.data.gain;
    // Check if the position has changed (ignoring small floating point errors).
    if (!this.lastPosition.equals(this.camera.object3D.position)) {
      // Calculate the position change since the last tick.
	    var position = this.camera.object3D.position;
      console.log('Head position b4:', position.x, position.y, position.z);
      // Apply gain to the camera's position.
      this.camera.object3D.position.x *= gain;
      this.camera.object3D.position.y *= gain;
      //this.camera.object3D.position.z *= gain;

      var position = this.camera.object3D.position;
      console.log('Head position after:', position.x, position.y, position.z, gain);

      // Log that the gain is being applied.
      console.log('Applying gain');
    }

    // Update the lastPosition with the new position.
    this.lastPosition.copy(this.camera.object3D.position);
  },

  // Remove function, called when the component is detached from an entity.
  remove: function () {
    // Clean up any event listeners, if necessary.
    this.camera = null;
    console.log('vr-motion-gain component is removed.');
  }
});
