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
    Potion
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
enum ProjectileEntity {
    //% block="矢"
    Arrow = "minecraft:arrow",
    //% block="雪玉"
    Snowball = "minecraft:snowball",
    //% block="トライデント"
    Trident = "minecraft:thrown_trident",
    //% block="ウィンドチャージ"
    WindCharge = "minecraft:wind_charge",
    //% block="卵"
    Egg = "minecraft:egg",
    //% block="ポーション",
    Potion = "minecraft:potion"
}

// パーティクル
declare const enum MainParticle {
    //% block="こうかつきの矢の もやもや"
    ArrowSpellEmitter = "minecraft:arrow_spell_emitter",
    //% block="ふうせんの キラキラ"
    BalloonGasParticle = "minecraft:balloon_gas_particle",
    //% block="ひのこ"
    BasicFlameParticle = "minecraft:basic_flame_particle",
    //% block="あおい ひのこ"
    BlueFlameParticle = "minecraft:blue_flame_particle",
    //% block="さくもつが そだつときの キラキラ"
    CropGrowthEmitter = "minecraft:crop_growth_emitter",
    //% block="ハート"
    HeartParticle = "minecraft:heart_particle"
}

//% color=#5B9BD5 icon="\uf06e" block="EduTutorialTest"
namespace EduTutorialTest {

    //% block="%seconds びょう くりかえす"
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
    //% particle.defl=Particle.HeartParticle
    //% projectile.defl=ProjectileEntity.Arrow
    export function emitParticleAtProjectiles(particle: MainParticle, projectile: ProjectileEntity) {
        // それぞれのエンティティの足元でパーティクルを生成
        player.runChatCommand(`execute at @e[type=${projectile}] run particle ${particle} ~ ~ ~`)
    }

    //% block="%item をつかって うちだしたとき"
    //% item.defl=ProjectileItem.Snowball
    export function onProjectileItemUsed(item: ProjectileItem, handler: () => void) {
        const itemEnum = getItemId(item)
        // MakeCodeの標準イベント：プレイヤーが指定アイテムを使用したとき
        if (itemEnum >= 0) player.onItemInteracted(itemEnum, handler)
    }
}