# VR dashboard client application

This client is used to view and organise Vr data from various Virtual Reality applications.<br>

The client application is written in Angular v16 using typescript.<br>

## First run on local machine

### Prerequisites

- Installed Node.js (minimal v18) and npm
  - How to install Node.js: [How to install Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).
  - npm is installed together with Node.js
  - Check if Node.js and npm is installed?
    - Run `node -v`
    - Run `npm -v`

### Run application

To run the application on the local machine for the first time, you need to do the following:

1. Run `npm install`
2. Run the application using `npm run dev`

After that, the application should be available at [http://localhost:4200](http://localhost:4200).<br> If you try opening the following address in a browser, you should see the application.


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. \
Open [http://localhost:4200](http://localhost:4200) in browser to open application.

### `npm run build`

Builds the app for production to the `/public` folder.

### `npm run check-translation`

Checks if all languages are complete and if any translation keywords are missing.

### `npm run generateApplicationSettingSchema`

Generates a JSON schema that is used to validate the definition of VR Application settings.
