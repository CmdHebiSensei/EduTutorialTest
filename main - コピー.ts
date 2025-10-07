// 投射物
enum ProjectileItem {
    //% block="弓"
    Bow = "minecraft:bow",
    //% block="クロスボウ"
    Crossbow = "minecraft:crossbow",
    //% block="雪玉"
    Snowball = "minecraft:snowball",
    //% block="トライデント"
    Trident = "minecraft:trident",
    //% block="ウィンドチャージ"
    WindCharge = "minecraft:wind_charge",
    //% block="卵"
    Egg = "minecraft:egg",
    //% block="ポーション"
    Potion = "minecraft:potion"
}

// itemId => enum
function getItemEnumFromId(id: string): number {
    const map: Record<string, number> = {
        "minecraft:bow": BOW,
        "minecraft:crossbow": CROSSBOW,
        "minecraft:snowball": SNOWBALL,
        "minecraft:trident": TRIDENT,
        "minecraft:wind_charge": WIND_CHARGE,
        "minecraft:egg": EGG,
        "minecraft:potion": POTION
    }
    return map[id] ?? -1
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
enum Particle {
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

    /**
     * x秒間、handlerを繰り返し実行します。
     * 1ループにつき50msだけ待機します。
     * @param seconds 実行時間（秒）
     */
    //% blockId=ett_repeat_for_seconds
    //% block="%seconds びょう くりかえす"
    //% seconds.defl=3
    //% handlerStatement=1
    //% weight=90
    export function repeatForSeconds(seconds: number, handler: () => void) {
        const end = control.millis() + Math.max(0, seconds) * 1000
        while (control.millis() < end) {
            handler()
            loops.pause(50)
        }
    }

    /**
     * 指定タイプのすべてのエンティティの位置にパーティクルを出します。
     */
    //% blockId=ett_emit_particle_at_projectiles
    //% block="%projectile のところに %particle の パーティクルをだす"
    //% particle.defl=Particle.HeartParticle
    //% projectile.defl=ProjectileEntity.Arrow
    //% weight=80
    export function emitParticleAtProjectiles(particle: Particle, projectile: ProjectileEntity) {
        // それぞれのエンティティの足元でパーティクルを生成
        commands.run(`execute at @e[type=${projectile}] run particle ${particle} ~ ~ ~`)
    }

    /**
     * 指定した「投射物を発射するアイテム」を使ったときに発火します。
     */
    //% blockId=ett_on_projectile_item_used
    //% block="%item をつかって うちだしたとき"
    //% item.defl=ProjectileItem.Snowball
    //% draggableParameters=reporter
    //% weight=85
    export function onProjectileItemUsed(item: ProjectileItem, handler: () => void) {
        const itemEnum = getItemEnumFromId(item)
        // MakeCodeの標準イベント：プレイヤーが指定アイテムを使用したとき
        if (itemEnum >= 0) player.onItemInteracted(itemEnum, handler)
    }
}