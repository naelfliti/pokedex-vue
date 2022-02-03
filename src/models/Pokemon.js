export default class Pokemon {
    id;
    name;
    // chemin vers les sprites
    spriteBack;
    spriteFront;
    spriteShinyBack;
    spriteShinyFront;
    animatedSpriteBackDefault;
    animatedSpriteFrontDefault;
    animatedSpriteBackShiny;
    animatedSpriteFrontShiny;
    // tableau de types
    types;
    // cris des pokemons
    sound;
    constructor(id, name, sprite){
        this.id = id;
        this.name = name;
        this.sprite = sprite;
        this.types= []
    }
}