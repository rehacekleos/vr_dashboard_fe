# VR dashboard client application

This client is used to view and organise Vr data from various Virtual Reality applications.<br>
It is communicating with [VR dashboard server](https://github.com/rehacekleos/vr_dashboard_be).

The client application is written in Angular v16 using typescript.<br>

## Application Structure

- `/Prompts` Custom CLI scripts
- `/src` Project source folder
  - `/app` Application logic
    - `/auth` Logic and pages for login and registration
    - `/components` Directory of components
    - `/containers` Default application layout
    - `/guards` Router guards
    - `/interceptors` HTTP interceptors
    - `/models` Models of entities
    - `/pages` Directory of pages
    - `/shared` Base services, translate logic and utils
  - `/assets` Defining different types of server
    - `/i18n` Location of language translations
    - `/monaco-editor` Location of the validation schema for monaco editor
  - `/environments` Defining individual variables for environments
  - `/scss` Definition of global css styles

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
