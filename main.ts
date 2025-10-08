// 投射物
declare const enum ProjectileItem {
    //% block="弓"
    Bow,
    //% block="クロスボウ"
    Crossbow,
    //% block="雪玉"
    Snowball,
    //% block="トライデント"
    Trident,
    //% block="ウィンドチャージ"
    WindCharge,
    //% block="卵"
    Egg,
    //% block="ポーション"
    Potion,
}

// itemId => enum
function getItemId(item: ProjectileItem): number {
    switch (item) {
        case ProjectileItem.Bow: return Item.Bow;
        case ProjectileItem.Crossbow: return 471;
        case ProjectileItem.Snowball: return Item.Snowball;
        case ProjectileItem.Trident: return Item.Trident;
        case ProjectileItem.WindCharge: return Item.WindCharge;
        case ProjectileItem.Egg: return Item.Egg;
        case ProjectileItem.Potion: return 373;
        default: throw `Unrecognized ProjectileItem enum value: ${item}`
    }
}

// 飛翔物
declare const enum ProjectileEntity {
    //% block="矢"
    Arrow,
    //% block="雪玉"
    Snowball,
    //% block="トライデント"
    Trident,
    //% block="ウィンドチャージ"
    WindCharge,
    //% block="卵"
    Egg,
    //% block="ポーション",
    Potion,
}

// entity => id
function getEntityId(entity: ProjectileEntity): number {
    switch (entity) {
        case ProjectileEntity.Arrow: return ProjectileMob.Arrow;
        case ProjectileEntity.Snowball: return ProjectileMob.Snowball;
        case ProjectileEntity.Trident: return 73;
        case ProjectileEntity.WindCharge: return 143;
        case ProjectileEntity.Egg: return ProjectileMob.Egg;
        case ProjectileEntity.Potion: return ProjectileMob.SplashPotion;
        default: throw `Unrecognized ProjectileEntity enum value: ${entity}`
    }
}

// パーティクル
declare const enum MainParticle {
    //% block="こうかつきの矢の もやもや"
    //% jres=Item.Arrow
    ArrowSpellEmitter,
    //% block="ふうせんの キラキラ"
    //% jres=Item.WhiteBalloon
    BalloonGasParticle,
    //% block="ひのこ"
    //% jres=Block.Campfire
    BasicFlameParticle,
    //% block="あおい ひのこ"
    //% jres=Block.SoulCampfire
    BlueFlameParticle,
    //% block="さくもつが そだつときの キラキラ"
    //% jres=Item.BoneMeal
    CropGrowthEmitter,
    //% block="ハート"
    //% jres=Effect.Regeneration
    HeartParticle,
}

// particle => id
function getParticleId(particle: MainParticle): string {
    switch (particle) {
        case MainParticle.ArrowSpellEmitter: return "minecraft:arrow_spell_emitter";
        case MainParticle.BalloonGasParticle: return "minecraft:balloon_gas_particle";
        case MainParticle.BasicFlameParticle: return "minecraft:basic_flame_particle";
        case MainParticle.BlueFlameParticle: return "minecraft:blue_flame_particle";
        case MainParticle.CropGrowthEmitter: return "minecraft:crop_growth_emitter";
        case MainParticle.HeartParticle: return "minecraft:heart_particle";
        default: throw `Unrecognized MainParticle enum value: ${particle}`
    }
}

//% color=#5B9BD5 icon="\uf06e" block="サンプル"
namespace EduTutorialTest {

    //% block="⏰ %seconds びょう くりかえす"
    //% jres=Item.Clock
    //% handlerStatement=1
    //% seconds.defl=3
    export function repeatForSeconds(seconds: number, handler: () => void) {
        const start = gameplay.timeQuery(GAME_TIME);
        const duration = Math.max(0, seconds * 20);
        while (gameplay.timeQuery(GAME_TIME) - start < duration) {
            handler();
            loops.pause(1);
        }
    }

    //% block="✨ %projectile のところに %particle の パーティクルをだす"]
    //% blockExternalInputs=true
    //% projectile.defl=ProjectileEntity.Arrow
    //% particle.defl=MainParticle.HeartParticle
    export function emitParticleAtProjectiles(projectile: ProjectileEntity, particle: MainParticle) {
        // それぞれのエンティティの足元でパーティクルを生成
        mobs.execute(
            mobs.entitiesByType(getEntityId(projectile)),
            pos(0, 0, 0),
            `particle ${getParticleId(particle)} ~ ~ ~`
        )
    }

    //% block="🏹 %item をつかって うちだしたとき"
    //% item.defl=ProjectileItem.Snowball
    export function onProjectileItemUsed(item: ProjectileItem, handler: () => void) {
        // MakeCodeの標準イベント：プレイヤーが指定アイテムを使用したとき
        player.onItemInteracted(getItemId(item), handler);
    }
}