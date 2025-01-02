const tokenButtonHandler = async (event, actor, token) => {
   const btn = $(event.currentTarget);
   const inspireCourageItem = await getInspireCourageEffect();
   const inspireCourageEffects = getInspireCourageEffectsFromActor(actor);

   if (inspireCourageEffects.length) {
      btn.removeClass("active");
      actor.deleteEmbeddedDocuments(
         "Item",
         inspireCourageEffects.map((i) => i.id)
      );
   } else {
      btn.addClass("active");
      const effects = await actor.createEmbeddedDocuments("Item", [
         inspireCourageItem,
      ]);
      const inspireCourageEffect = effects.find(
         (e) => e.name === inspireCourageItem.name
      );
      const update = {
         _id: inspireCourageEffect._id,
         system: { expired: false, duration: { unit: "unlimited" } },
      };
      actor.updateEmbeddedDocuments("Item", [update]);
   }
};

const createButton = (actor) => {
   let btn = document.createElement("div");

   btn.classList.add("control-icon");
   getInspireCourageEffectsFromActor(actor).length
      ? btn.classList.add("active")
      : {};
   btn.innerHTML = `<i class="fas fa-music fa-fw"></i>`;
   btn.title = game.i18n.localize("pf2InspireCourage.ToolTipText");

   return btn;
};

export const prepTokenHUD = (hud, html, token) => {
   const actor = game.actors.get(token.actorId);
   const isCharacterToken = actor.type.toLowerCase() === "character";

   if (
      game.settings.get("pf2e-inspire-courage", "add-inspire-courage-button") &&
      isCharacterToken
   ) {
      const artButton = createButton(actor);

      $(artButton)
         .click((event) => tokenButtonHandler(event, actor, token))
         .contextmenu((event) => tokenButtonHandler(event, actor, token));

      html.find("div.right").append(artButton);
   }
};

const getInspireCourageEffect = async () => {
   const spellEffectPack = game.packs.get("pf2e.spell-effects");
   await spellEffectPack.getIndex(); // Have to force the compendium to load content
   const InspireCourageEntry = spellEffectPack.index.find((e) =>
      e.name.toLowerCase().includes("courageous anthem")
   );
   return await spellEffectPack.getDocument(InspireCourageEntry._id);
};

const getInspireCourageEffectsFromActor = (actor) => {
   return actor.items.filter(
      (i) =>
         i.name.toLowerCase().includes("courageous anthem") && i.type === "effect"
   );
};
