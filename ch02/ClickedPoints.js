// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
let VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec3 a_VertexColor;\n' +
    'attribute float a_PointSize;\n' +
    'varying vec3 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
    '  gl_PointSize = a_PointSize;\n' +                    // Set the point size
    '  v_Color = a_VertexColor;\n' +                    // Set the point size
    '}\n';

// Fragment shader program
let FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec3 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = vec4(v_Color, 1.0);\n' + // Set the point color
    '}\n';

function main() {
    // Retrieve <canvas> element
    let canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    let gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    // ==============POSITION OF POINT======================
    // Get the storage location of attribute variable, gl.shaderProgram comes from cuon-utils #17
    let a_Position = gl.getAttribLocation(gl.shaderProgram, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0);


    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position);
    };

    let g_points = [];

    function click(ev, gl, canvas, a_Position) {
        let x = ev.clientX;
        let y = ev.clientY;
        let rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

        g_points.push(x);
        g_points.push(y);

        // Specify the color for clearing <canvas>
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (let i = 0; i < g_points.length; i += 2) {
            gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);

            // Draw a point, type, start, number of vertices
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }

    // =================COLOR OF POINT======================
    // Get the storage location of attribute variable, gl.shaderProgram comes from cuon-utils #17
    let a_VertexColor = gl.getAttribLocation(gl.shaderProgram, 'a_VertexColor');
    if (a_VertexColor < 0) {
        console.log('Failed to get the storage location of a_VertexColor');
        return;
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_VertexColor, 0.0, 1.0, 0.0);

    // =====================SIZE OF POINT==========================
    // Get the storage location of attribute variable, gl.shaderProgram comes from cuon-utils #17
    let a_PointSize = gl.getAttribLocation(gl.shaderProgram, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log('Failed to get the storage location of a_PointSize');
        return;
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib1f(a_PointSize, 20.0);



}
