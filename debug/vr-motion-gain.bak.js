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

    // Add the componentchanged event listener here.
    this.camera.addEventListener('componentchanged', this.onComponentChanged.bind(this));
  },

  // Event listener for componentchanged event.
  onComponentChanged: function (event) {
    console.log('componentchanged event is triggered.');
    if (event.detail.name === 'position') {
      var positionDelta = event.detail.newData.clone().sub(event.detail.oldData);

      // Check if the position has changed (ignoring small floating point errors).
      if (!this.lastPosition.equals(this.camera.object3D.position)) {
        this.camera.object3D.position.addScaledVector(positionDelta, this.data.gain);

        // Log that the gain is being applied.
        console.log('Applying gain');
      }

      // Update the lastPosition with the new position.
      this.lastPosition.copy(this.camera.object3D.position);
    }
  },

  // Remove function, called when the component is detached from an entity.
  remove: function () {
    // Clean up any event listeners, if necessary.
    this.camera.removeEventListener('componentchanged', this.onComponentChanged.bind(this));
    this.camera = null;
    console.log('vr-motion-gain component is removed.');
  }
});
