window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    var box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);
    box.position = new BABYLON.Vector3(0, 0, 0);


    /*
    //FOR PC WEB ONLY
    // Event listener for key presses (arrow keys)
    window.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            box.position.x -= 0.1; // Move the box to the left
        } else if (event.key === 'ArrowRight') {
            box.position.x += 0.1; // Move the box to the right
        }
    });
    */

    // Function to handle gamepad input (physical joystick)
    function handleGamepadInput(gamepad) {
        // Access gamepad axes
        var axes = gamepad.axes;
        var leftStickX = axes[0];

        var movementSpeed = 0.05; 

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
        //Find and loop gamepads functions here
        var gamepads = navigator.getGamepads();
        if (gamepads[0]) {
            handleGamepadInput(gamepads[0]);
        }

        scene.render();
    });
});
