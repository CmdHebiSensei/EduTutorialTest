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
function getEntityId(entity: ProjectileEntity): string {
    switch (entity) {
        case ProjectileEntity.Arrow: return "minecraft:arrow";
        case ProjectileEntity.Snowball: return "minecraft:snowball";
        case ProjectileEntity.Trident: return "minecraft:thrown_trident";
        case ProjectileEntity.WindCharge: return "minecraft:wind_charge_projectile";
        case ProjectileEntity.Egg: return "minecraft:egg";
        case ProjectileEntity.Potion: return "minecraft:splash_potion";
        default: throw `Unrecognized ProjectileEntity enum value: ${entity}`
    }
}

// パーティクル
declare const enum MainParticle {
    //% block="こうかつきの矢の もやもや"
    ArrowSpellEmitter,
    //% block="ふうせんの キラキラ"
    BalloonGasParticle,
    //% block="ひのこ"
    BasicFlameParticle,
    //% block="あおい ひのこ"
    BlueFlameParticle,
    //% block="さくもつが そだつときの キラキラ"
    CropGrowthEmitter,
    //% block="ハート"
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
//% color=#5B9BD5 icon="\uf06e" block="EduTutorialTest"
namespace EduTutorialTest {

    //% block="%seconds びょう くりかえす"
    //% handlerStatement=1
    //% seconds.defl=3
    export function repeatForSeconds(seconds: number, handler: () => void) {
        // 1秒に20回で繰り返す
        const repeatCount = Math.max(0, seconds * 20);
        for (let i = 0; i < repeatCount; i++) {
            handler()
            loops.pause(50)
        }
    }

    //% block="%projectile のところに %particle の パーティクルをだす"
    //% projectile.defl=ProjectileEntity.Arrow
    //% particle.defl=MainParticle.HeartParticle
    export function emitParticleAtProjectiles(projectile: ProjectileEntity, particle: MainParticle) {
        // それぞれのエンティティの足元でパーティクルを生成
        player.runChatCommand(`execute at @e[type=${getEntityId(projectile)}] run particle ${getParticleId(particle)} ~ ~ ~`)
    }

    //% block="%item をつかって うちだしたとき"
    //% item.defl=ProjectileItem.Snowball
    export function onProjectileItemUsed(item: ProjectileItem, handler: () => void) {
        // MakeCodeの標準イベント：プレイヤーが指定アイテムを使用したとき
        player.onItemInteracted(getItemId(item), handler)
    }
}