/** Pf2e Inspire Courage
 * Author: GS
 */

import {registerSettings} from './module/settings.js';
import {prepTokenHUD} from './token-hud-controller';

Hooks.once('init', async function() {
	console.log('pf2e-inspire-courage | Initializing pf2e-inspire-courage');
	registerSettings();
});


Hooks.on('renderTokenHUD', (hud: TokenHUD, html: JQuery, token: Token) => prepTokenHUD(hud, html, token));