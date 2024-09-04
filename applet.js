const Applet = imports.ui.applet;
const Main = imports.ui.main;
const Lang = imports.lang;
const St = imports.gi.St;
const Mainloop = imports.mainloop;
const Settings = imports.ui.settings;
const Util = imports.misc.util;
const PopupMenu = imports.ui.popupMenu;

const UUID = "ryzenadj@gomesar9";

class RyzenAdjApplet extends Applet.TextApplet {
  constructor(metadata, orientation, panel_height, instance_id) {
    super(orientation, panel_height, instance_id);

    try {
      global.log("[%s] Starting applet".format(UUID));
      this.settings = new Settings.AppletSettings(this, UUID, instance_id);

      this.settings.bind(
        "refresh-interval",
        "refresh_interval",
        this.on_settings_changed,
      );
      this.settings.bind(
        "decimal-places",
        "decimal_places",
        this.on_settings_changed,
      );
      this.settings.bind("font-size", "font_size", this.update_font_size);

      this.set_applet_tooltip("Click for more details");

      const menu_manager = new PopupMenu.PopupMenuManager(this);
      this.menu = new Applet.AppletPopupMenu(this, orientation);
      menu_manager.addMenu(this.menu);

      this.info_menu_item = new PopupMenu.PopupMenuItem("Collecting data...", {
        reactive: false,
      });
      this.menu.addMenuItem(this.info_menu_item);
      this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
      // TODO
      // Documentacao quase inexistente, todos os exemplos sao antigos
      // ou desenvolvem sliders do zero, nao vou aprender js pra isso
      // nao podemos nos render assim. Esta e minha ultima mensagem.

      this.set_applet_label("RyzenAdj");
    } catch (e) {
      global.logError(e);
    }
  }
}

function main(metadata, orientation, panel_height, instance_id) {
  return new RyzenAdjApplet(metadata, orientation, panel_height, instance_id);
}
