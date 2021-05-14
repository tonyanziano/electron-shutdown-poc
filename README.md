# electron-shutdown-poc
A working POC of a mechanism that synchronously cleans up ElectronJS app tasks before quitting.

# How to Run:

1. `yarn install` or `npm i`
2. `yarn build` or `npm build`
3. `yarn start` or `npm start`

# Testing the mechanism

1. Click either of the "Start long task __" buttons in any order
2. Close the app by clicking the "X" button on the application window
3. Observe tasks gracefully shutting down before the app quits
