/** Pf2e Inspire Courage
 * Author: GS
 */

import { registerSettings } from "./settings.js";
import { prepTokenHUD } from "./token-hud-controller.js";

Hooks.once("init", async function () {
   console.log("pf2e-inspire-courage | Initializing pf2e-inspire-courage");
   registerSettings();
});

Hooks.on("renderTokenHUD", (hud, html, token) =>
   prepTokenHUD(hud, html, token)
);
