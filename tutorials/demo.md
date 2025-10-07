### @hideIteration false
### @flyoutOnly true
### @explicitHints true

# EduTutorialTest: ほのおの矢をうってみよう！

## Step 1

`%seconds びょう くりかえす` ブロックで、3秒間だけ「go!」と言わせてみよう。

```template
```

```blocks
EduTutorialTest.repeatForSeconds(3, function () {
    player.say("go!")
})
```

## Step 2

`%projectile のところに %particle の パーティクルをだす` を使って、矢のところにほのおを出そう。

```template
```

```blocks
EduTutorialTest.emitParticleAtProjectiles(Particle.BasicFlameParticle, ProjectileEntity.Arrow)
```

## Step 3

`%item をつかって うちだしたとき` を使って、雪玉をなげたら「なげた！」と言うようにしよう。

```template
```

```blocks
EduTutorialTest.onProjectileItemUsed(ProjectileItem.Snowball, function () {
    player.say("なげた！")
})
```

## Step 4

ゆみで やを うったら 2びょうだけ やのばしょに ほのおを出そう。

```template
```

```blocks
EduTutorialTest.onProjectileItemUsed(ProjectileItem.Bow, function () {
    EduTutorialTest.repeatForSeconds(2, function () {
        EduTutorialTest.emitParticleAtProjectiles(Particle.BasicFlameParticle, ProjectileEntity.Arrow)
    })
})
```
