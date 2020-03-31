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
    let n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
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

    gl.drawArrays(gl.POINTS, 0, n);

    function initVertexBuffers(gl) {
        let vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
        let n = 3;

        // Create a buffer object
        let vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object ');
            return -1;
        }

        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        // Write data into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Get the storage location of attribute variable, gl.shaderProgram comes from cuon-utils #17
        let a_Position = gl.getAttribLocation(gl.shaderProgram, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return;
        }

        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(a_Position);

        return n;
    }


}
