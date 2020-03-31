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
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' + // Set the point color
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
    let a_Position = gl.getAttribLocation(gl.shaderProgram, 'a_Position'); //Get access to a_Position in vertexShader
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0); // Set value to the a_Position variable in vertex shader

    // Get the storage location of u_FragColor variable
    let u_FragColor = gl.getUniformLocation(gl.shaderProgram, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get u_FragColor variable');
        return;
    }

    // Register function event handler to be called on a mouse press
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };

    let g_points = [];
    let g_colors = [];

    function click(ev, gl, canvas, a_Position, u_FragColor) {
        let x = ev.clientX;
        let y = ev.clientY;
        let rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

        g_points.push([x,y]);

        // Store the colors to g_colors array
        if(x >= 0.0 && y >= 0.0) {
            g_colors.push([1.0, 0.0, 0.0, 1.0]); // Red
        } else if(x < 0.0 && y < 0.0) {
            g_colors.push([0.0, 1.0, 0.0, 1.0]); // Green
        } else {
            g_colors.push([1.0, 1.0, 1.0, 1.0]); // White
        }

        // Specify the color for clearing <canvas>
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (let i = 0; i < g_points.length; i++) {
            let xy = g_points[i];
            let rgba = g_colors[i];

            // Position of the point
            gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

            // Color of the point
            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

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
