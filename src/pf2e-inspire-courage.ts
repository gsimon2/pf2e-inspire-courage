/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module
 */

// Import TypeScript modules
import {registerSettings} from './module/settings.js';
import {prepTokenHUD} from './token-hud-controller';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async function() {
	console.log('pf2e-inspire-courage | Initializing pf2e-inspire-courage');

	// Register custom module settings
	registerSettings();
});

// Add any additional hooks if necessary
Hooks.on("renderTokenHUD", (hud: TokenHUD, html: JQuery, token: Token) => prepTokenHUD(hud, html, token));