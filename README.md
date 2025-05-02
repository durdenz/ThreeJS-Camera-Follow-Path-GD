# ThreeJS - Camera-Follow-Path
An example of having the camera in a ThreeJS scene follow a defined path using the mouse scrollwheel.

## Notes:
1. I used the reference video and code repository below and refactored it into a simple HTML+CSS+JS example that doesn't use npm, express, etc.
2. This example should be easier to work with on a realtime development basis using VS Code as the IDE with LiveServer.
3. This code should also be easier for someone to integrate into an existing website that doesn't use npm and express.
4. The GLTF/GLB file for your scene and the JSON file for your camera path are stored in ./models and referenced in ./js/main.js -- Make Sure the files match the references and update as needed.

## Original Author Notes:
ThreeJS camera follows along CatmullRomCurve3 path while scrolling

--------------------------------------------------------------------------------------------------------------
Purpose:
  
  This project is intended for demonstrating how to set up a perspective camera in ThreeJS, and have it move along a
  CatmullRomCurve3 while the scroll wheel is turned.
  A Blender Add-on is available for exporting NURBS paths to a compatible JSON file that can be useful for exporting 
  NURBS curves and paths in a way that ThreeJS can read.
  
  Blender Add-on: https://github.com/ClassOutside/Export_Vertices_To_JSON

--------------------------------------------------------------------------------------------------------------
How to move camera along curve while the mouse wheel scrolls:

1. In Blender convert a NURBS path or curve to a Mesh.
2. Export the created mesh to a JSON using the Add-on "Export Vertices to JSON".  
3. Add the JSON to the ./models/ folder.
4. Place the GLTF or GLB file for the scene in ./models as Scene.glb
- If you use a different filename/type then change the value of startingModelPath in ./js/main.js

_Required Files:_ ./js/curveTools/CurveMethods ./js/helpers/JSONHelper  ./js/PositionAlongPathTools/

5. Call loadCurveFromJSON from CurveMethods.js and pass the path to the JSON file.
   - This will load the JSON file. Then, convert it to a CatmullRomCurve3. It will also create a tube shaped mesh around the curve.
   - This method returns the curveAndMesh object.
     - The CatmullRomCurve3 is set to the returned object's .curve value.
     - The tube mesh is set to the returned object's .mesh value.
6. Create an object to track the state using PositionAlongPathState
   - In PositionAlongPathState.js
     - Adjust movementDuration for how many milliseconds you would like it to take for the object to move the desired distance.
     - Adjust lengthToScroll to how many "ticks" of the scroll wheel it should take to completely traverse the path.
7. When the mouse is scrolled, call handleScroll from PositionAlongPathMethods
   - Pass the scroll event and the positionAlongPathState
8. During each animation frame, call updatePosition from PositionAlongPathMethods
   - pass the curve and mesh object returned from loadCurveFromJSON
   - pass the camera, and the positionAlongPathState object

## Reference:
- https://www.youtube.com/watch?v=58k6PLYnOuI
- https://github.com/ClassOutside/ThreeJS_Camera_Follow_Path
