# myFlix-client
Using React, build the client-side for an app called myFlix based on its
existing server-side code (REST API and database)

STEPS INVOLVED:
•	Create a new repository in GitHub , (separate from the backend) and initialize package.json.
•	Install package.json to install the right dependencies. (after installation , remove "main": "index.js")
•	Also, create a .gitignore file and include 
node_modules
.cache
.parcel-cache
•	Then, npm install -g parcel( It is however suggested to install it locally. This is because other users might   
have a newer or older version of Parcel that’s incompatible with the app’s build when trying to 
run it or test it.
Therefore, you can alternatively install Parcel as a local developer dependency. This will force anyone accessing the app to use the same version of Parcel, since     the version will be locked into the “package.json” and “package-lock.json” files in the project directory.
•	npm install –save react react-dom

•	Three new files to be created in src folder inside the project folder to include the following three files:
index.jsx   (This file contains the code needed to create a small, working React app)
index.scss
index.html   (This file represents the entry point of your app. Parcel will begin gathering dependencies from here and bundling them. Notice there’s no SCSS included; it should, instead, be imported from the “index.jsx” file. Rather than the classic “index.html” → “index.css” structure, here you have “index.html” → “index.jsx” → “index.scss.”)

•	Instruct Parcel to build your project
Run parcel src/index.html (the path to follow) in the terminal.

TROUBLESHOOTING:
NOTE!
For some computers, Parcel v2 doesn't work when you run parcel src/index.html, instead returning Error - module not found @parcel\fs-search\fs-search.win32-x64-msvc.node.
The package is failing due to a missing library on the computer. Fs-search requires Microsoft Visual C++ 2015 Redistributable (x64).
You can install Microsoft Visual C++ 2015 Redistributable x64
NOTE!
You might get an error stating @parcel/core: Failed to resolve 'process'. If this is the case, go ahead and install it globally by running npm install -g process then try to run your app again.

