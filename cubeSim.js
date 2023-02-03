
// This code creates a 3D cube that rotates around its own center.

// Create the canvas and set its width and height
var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// Get the drawing context
var ctx = canvas.getContext('2d');

// Create the cube
var cube = {
    x: 0,
    y: 0,
    z: 0,
    size: 100,
    angle: 0
};

// Define the cube edges
var edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
];

// Define the cube vertices
var vertices = [
    { x: cube.x - cube.size / 2, y: cube.y - cube.size / 2, z: cube.z + cube.size / 2 },
    { x: cube.x + cube.size / 2, y: cube.y - cube.size / 2, z: cube.z + cube.size / 2 },
    { x: cube.x + cube.size / 2, y: cube.y + cube.size / 2, z: cube.z + cube.size / 2 },
    { x: cube.x - cube.size / 2, y: cube.y + cube.size / 2, z: cube.z + cube.size / 2 },
    { x: cube.x - cube.size / 2, y: cube.y - cube.size / 2, z: cube.z - cube.size / 2 },
    { x: cube.x + cube.size / 2, y: cube.y - cube.size / 2, z: cube.z - cube.size / 2 },
    { x: cube.x + cube.size / 2, y: cube.y + cube.size / 2, z: cube.z - cube.size / 2 },
    { x: cube.x - cube.size / 2, y: cube.y + cube.size / 2, z: cube.z - cube.size / 2 }
];

// Rotate the cube
function rotateCube() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rotate the cube
    cube.angle += 0.01;

    // Rotate the vertices around the center
    for (var i = 0; i < vertices.length; i++) {
        var vertex = vertices[i];
        var x = vertex.x - cube.x;
        var y = vertex.y - cube.y;

        vertex.x = x * Math.cos(cube.angle) - y * Math.sin(cube.angle) + cube.x;
        vertex.y = x * Math.sin(cube.angle) + y * Math.cos(cube.angle) + cube.y;
    }

    // Draw the cube
    ctx.beginPath();
    for (var i = 0; i < edges.length; i++) {
        var e = edges[i];
        ctx.moveTo(vertices[e[0]].x, vertices[e[0]].y);
        ctx.lineTo(vertices[e[1]].x, vertices[e[1]].y);
    }
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    requestAnimationFrame(rotateCube);
}

rotateCube();
console.log(1);