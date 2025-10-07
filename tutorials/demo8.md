### @hideIteration false
### @flyoutOnly false
### @explicitHints true

# EduTutorialTest

## Step 1

3秒間だけ「go!」と言わせてみよう。

```block
EduTutorialTest.repeatForSeconds(3, function () {
    player.say("go!")
})
```

## Step 2

矢のところにほのおを出そう。

```block
EduTutorialTest.emitParticleAtProjectiles(ProjectileEntity.Arrow, MainParticle.BasicFlameParticle)
```

## Step 3

雪玉をなげたら「なげた！」と言うようにしよう。

```block
EduTutorialTest.onProjectileItemUsed(ProjectileItem.Snowball, function () {
    player.say("なげた！")
})
```

## Step 4

ゆみで やを うったら 2びょうだけ やのばしょに ほのおを出そう。

```block
EduTutorialTest.onProjectileItemUsed(ProjectileItem.Bow, function () {
    EduTutorialTest.repeatForSeconds(2, function () {
        EduTutorialTest.emitParticleAtProjectiles(ProjectileEntity.Arrow, MainParticle.BasicFlameParticle)
    })
})
```
