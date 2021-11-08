# Webfocus Tray

This is a WebfocusComponent implementation with access to the system tray.

After registering this component has the following properties to change the tray behavior: (See [ctray](https://www.npmjs.com/package/ctray) for more information)
 
 - `menu: MenuItem[]`
 - `setIcon: string`
 - `setTitle: string`
 - `showTray: () => void`
 - `closeTray: () => void`
 - `updateTray: () => void`
 - `addAction: (name: string, cb: () => void)`

For each action added the component creates a new MenuItem.
Menu can also be changed directly throught `component.menu`.
After showTray, if no error occured this component is hidden from the webfocusApplication.

## Use case example

```javascript
let settings = require("@webfocus/tray");
webfocusApp.registerComponent(settings);

let server = webfocusApp.start();
settings.setIcon('path/to/favicon.ico');
settings.setTitle(webfocusApp.configuration.name);
settings.addAction("Open Application", () => open(`http://localhost:${server.address().port}/`));
settings.addAction("Close Tray", () => settings.closeTray());
```

Its calls transport.sendMail with the message argument. (See [nodemailer message](https://nodemailer.com/message/)
