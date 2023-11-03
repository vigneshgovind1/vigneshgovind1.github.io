window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    var box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);
    box.position = new BABYLON.Vector3(0, 0, 0);

    // Variable to track the color state
    var isRed = false;

    // Function to handle gamepad input (physical joystick)
    function handleGamepadInput(gamepad) {
        // Access gamepad axes
        var axes = gamepad.axes;
        var leftStickX = axes[0];

        var movementSpeed = 0.05; 

        // Listen for gamepad index trigger click
        if (gamepad.buttons[0].pressed) {
            // Toggle the box color between red and white
            isRed = !isRed;
            if (isRed) {
                box.material = new BABYLON.StandardMaterial("redMaterial", scene);
                box.material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
            } else {
                box.material = new BABYLON.StandardMaterial("whiteMaterial", scene);
                box.material.diffuseColor = new BABYLON.Color3(1, 1, 1); // White color
            }
        }

        // Check if the left stick is pushed to the left
        if (leftStickX < -0.2) {
            box.position.x -= movementSpeed;
        }
        // Check if the left stick is pushed to the right
        else if (leftStickX > 0.2) {
            box.position.x += movementSpeed;
        }
    }

    // Event listener for gamepad connection
    window.addEventListener('gamepadconnected', function (event) {
        var gamepad = event.gamepad;

        handleGamepadInput(gamepad);
    });

    engine.runRenderLoop(function () {
        // Find and loop gamepads functions here
        var gamepads = navigator.getGamepads();
        if (gamepads[0]) {
            handleGamepadInput(gamepads[0]);
        }

        scene.render();
    });
});
