const {join} = require("path")
const component = module.exports = require('@webfocus/component')("System Actions","");
let _tray = {};
let _icon = join(__dirname, 'favicon.ico');

try{
    let Tray = require("ctray");
    _tray = new Tray(_icon);
}
catch(e){
    component.warn("tray not available %o", e);
}

_tray.menu = [ { text: component.name, disabled: true } ]

component.setIcon = path => _tray.icon = path;
component.setTitle = name => {
    _tray.tooltip = name;
    _tray.menu[0].text = name;
}

component.closeTray = _ => _tray ? _tray.close() : null;
component.addAction = (name, cb) => {
    component.debug("Adding action %s", name);
    let path = name.replace(/\s+/g, '-').toLowerCase();
    component.app.post(`/${path}`, (req, res) => {
        component.debug("Webaction callback %s", name);
        cb();
        res.redirect(req.headers.referer);
    });
    _tray.menu = Object.values(_tray.menu).concat({
        text: name,
        callback: cb
    });
}
