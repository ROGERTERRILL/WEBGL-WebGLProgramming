// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshaderSource a vertex shader program (string)
 * @param fshaderSource a fragment shader program (string)
 * @return true, if the program object was created and successfully made current 
 */
function initShaders(gl, vshaderSource, fshaderSource) {
  let shaderProgram = createProgram(gl, vshaderSource, fshaderSource);
  if (!shaderProgram) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(shaderProgram);
  gl.shaderProgram = shaderProgram;

  return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshaderSource a vertex shader program (string)
 * @param fshaderSource a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshaderSource, fshaderSource) {
  // Create shader object
  let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshaderSource);
  let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  let shaderProgram = gl.createProgram();
  if (!shaderProgram) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  // Link the program object
  gl.linkProgram(shaderProgram);

  // Check the result of linking
  let linked = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
  if (!linked) {
    let error = gl.getProgramInfoLog(shaderProgram);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(shaderProgram);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return shaderProgram;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
  // Create shader object
  let shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    let error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/** 
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
  // Get the rendering context for WebGL
  let gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;

  // if opt_debug is explicitly false, create the context for debugging
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }

  return gl;
}
