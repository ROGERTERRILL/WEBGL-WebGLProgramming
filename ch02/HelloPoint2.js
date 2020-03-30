// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
let VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec3 a_VertexColor;\n' +
    'varying vec3 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' + // Set the vertex coordinates of the point
    '  gl_PointSize = 10.0;\n' +                    // Set the point size
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

    // Get the storage location of attribute variable, gl.shaderProgram comes from cuon-utils #17
    let a_Position = gl.getAttribLocation(gl.shaderProgram, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0);

    // Get the storage location of attribute variable, gl.shaderProgram comes from cuon-utils #17
    let a_VertexColor = gl.getAttribLocation(gl.shaderProgram, 'a_VertexColor');
    if (a_VertexColor < 0) {
        console.log('Failed to get the storage location of a_VertexColor');
        return;
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_VertexColor, 0.0, 1.0, 0.0);

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw a point, type, start, number of vertices
    gl.drawArrays(gl.POINTS, 0, 1);
}
