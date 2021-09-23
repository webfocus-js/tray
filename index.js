const {join} = require("path")
const component = module.exports = require('@webfocus/component')("System Actions","");
let _icon = join(__dirname, 'favicon.ico');
let _tray = null;

component.menu = [ { text: component.name, disabled: true } ];

component.setIcon = path => _icon = path;
component.setTitle = name => component.menu[0].text = name;
component.showTray = _ => {
    if( !_tray ){
        try{
            component.debug("Starting Ctray");
            _tray = new (require("ctray"))(_icon, component.menu);
            _tray.start();
            component.hidden = true;
        }
        catch(e){
            component.debug("CTray failed to start %O", e)
            component.hidden = false;
        }
    }
}
component.closeTray = _ => _tray ? _tray.stop() : null;
component.updateTray = _ => _tray ? _tray.update() : null;
component.addAction = (name, cb) => {
    component.debug("Adding action %s", name);
    let path = name.replace(/\s+/g, '-').toLowerCase();
    component.app.post(`/${path}`, (req, res) => {
        component.debug("Webaction callback %s", name);
        cb();
        res.redirect(req.headers.referer);
    });
    component.menu.push({
        path: path,
        text: name, 
        callback : () => {
            _tray.update();
            component.debug("Ctray callback %s", name);
            try{
                cb();
            }
            catch(e){
                component.debug(e);
            }
        }
    })
}
