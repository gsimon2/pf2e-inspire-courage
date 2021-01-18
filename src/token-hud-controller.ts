const tokenButtonHandler = async (event, actor: Actor, token) => {
    const btn = $(event.currentTarget);
    const inspireCourageItem = await getInspireCourageItem();
    const activeToken = actor.getActiveTokens().find(t => t.data._id === token._id);
    const inspireCourageEffects = getInspireCourageEffects(actor);

    activeToken.toggleEffect('systems/pf2e/icons/spells/inspire-courage.jpg');

    if (inspireCourageEffects.length) {
        btn.removeClass('active');
        actor.deleteEmbeddedEntity('OwnedItem', inspireCourageEffects.map(i => i._id));
    } else {
        btn.addClass('active');
        actor.createOwnedItem(inspireCourageItem);
    }
};

const createButton = (actor: Actor) => {
    let btn = document.createElement('div');

    btn.classList.add('control-icon');
    getInspireCourageEffects(actor).length ? btn.classList.add('active') : {};
    btn.innerHTML = `<i class="fas fa-music fa-fw"></i>`
    btn.title = game.i18n.localize('pf2InspireCourage.ToolTipText');

    return btn;
};

export const prepTokenHUD = (hud: TokenHUD, html: JQuery, token: Token) => {
    const actor: Actor = game.actors.get(token.actorId);
    const isCharacterToken: boolean = actor.data.type.toLowerCase() === 'character';

    if (game.settings.get('pf2e-inspire-courage', 'add-inspire-courage-button') && isCharacterToken) {
        const artButton = createButton(actor);

        $(artButton)
            .click((event) =>
                tokenButtonHandler(event, actor, token)
            )
            .contextmenu((event) =>
                tokenButtonHandler(event, actor, token)
            );
    
        html.find('div.right').append(artButton);
    }
};

const getInspireCourageItem = async (): Promise<Item> => {
    const spellEffectPack: Compendium = game.packs.get('pf2e.spell-effects');
    await spellEffectPack.getIndex(); // Have to force the compendium to load content
    const InspireCourageEntry: any = spellEffectPack.index.find((e: any) => e.name.includes('Inspire Courage'));
    return await spellEffectPack.getEntity(InspireCourageEntry._id) as Item;
};

const getInspireCourageEffects = (actor: Actor) => {
    return (actor.data as any).items.filter(i => i.name.toLowerCase().includes('inspire courage') && i.type === 'effect');
};
