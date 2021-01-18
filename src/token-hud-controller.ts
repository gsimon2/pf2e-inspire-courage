import CustomActor from './models/custom-actor';

const tokenButtonHandler = async (event, actor: CustomActor, token) => {
    const btn = $(event.currentTarget);
    const newInspireCourageState = !actor._isInspiringCourage
    const inspireCourageItem = await getInspireCourageItem();
    const activeToken = actor.getActiveTokens().find(t => t.data._id === token._id);

    actor._isInspiringCourage = newInspireCourageState;
    activeToken.toggleEffect("systems/pf2e/icons/spells/inspire-courage.jpg");

    if (newInspireCourageState) {
        btn.addClass("active");
        actor.createOwnedItem(inspireCourageItem);
    } else {
        btn.removeClass("active");
        const items = (actor.data as any).items.filter(i => i.name.toLowerCase().includes('inspire courage') && i.type === 'effect');
        actor.deleteEmbeddedEntity('OwnedItem', items.map(i => i._id));
    }
};

const createButton = (actor: CustomActor) => {
    let button = document.createElement("div");

    button.classList.add("control-icon");
    actor._isInspiringCourage && button.classList.add("active");
    button.innerHTML = `<i class="fas fa-music fa-fw"></i>`
    button.title = game.i18n.localize("pf2InspireCourage.ToolTipText");

    return button;
};

export const prepTokenHUD = (hud: TokenHUD, html: JQuery, token) => {
    const actor: CustomActor = game.actors.get(token.actorId);

    if (true) { //Add game settings here
        const artButton = createButton(actor);

        $(artButton)
            .click((event) =>
                tokenButtonHandler(event, actor, token)
            )
            .contextmenu((event) =>
                tokenButtonHandler(event, actor, token)
            );
    
        html.find("div.right").append(artButton);
    }
};

const getInspireCourageItem = async (): Promise<Item> => {
    const spellEffectPack: Compendium = game.packs.get("pf2e.spell-effects");
    await spellEffectPack.getIndex(); // Have to force the compendium to load content
    const InspireCourageEntry: any = spellEffectPack.index.find((e: any) => e.name.includes('Inspire Courage'));
    return await spellEffectPack.getEntity(InspireCourageEntry._id) as Item;
};