export const registerSettings = () => {
	// Register any custom module settings here
	game.settings.register('pf2e-inspire-courage', 'add-inspire-courage-button', {
        name: 'Add inspire courage button',
        hint: 'This adds a button to the token HUD, allowing for inspire courage to easily be toggled on or off',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
};
