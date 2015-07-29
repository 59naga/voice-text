# VoiceText [![NPM version][npm-image]][npm] [![Build Status][travis-image]][travis] [![Coverage Status][coveralls-image]][coveralls]

> [VoiceText Web API](https://cloud.voicetext.jp/webapi/docs/api) のクライアントライブラリ

## Installation

```bash
$ npm install voice-text --save
```

# API

## fetchVoice(text) -> Promise(buffer)

VoiceText Web API から text の変換結果を Promise で取得します。

```js
var VoiceText= require('voice-text').VoiceText;
var voiceText= new VoiceText('YOUR_API_KEY');

var fs= require('fs');

voiceText.fetchVoice('ゆっくりしていってね')
.then(function(buffer){
  fs.writeFileSync('voice.m4a',buffer);
});
```

## set(apiParamater,value) -> this
## get(apiParamater) -> value
## getUri() -> uri

VoiceText Web API へ POSTする 設定値を変更します。参照：[APIパラメータ](https://cloud.voicetext.jp/webapi/docs/api#section-3)

```js
voiceText
.set('text','ほげほげ')
.set('speaker','bear')
.set('format','ogg')
.set('emotion','happiness')
.set('emotion_level','2')
.set('pitch','200')
.set('speed','200')
.set('volume','200')
.getUri()
// https://YOUR_API_KEY:@api.voicetext.jp/v1/tts?text=%E3%81%BB%E3%81%92%E3%81%BB%E3%81%92&speaker=bear&format=ogg&emotion=happiness&emotion_level=2&pitch=200&speed=200&volume=200

voiceText.get('speaker'); // bear

// 設定値で音声データを作成
voiceText.fetchVoice()
.then(function(buffer){
  fs.writeFileSync('voice.ogg',buffer);
});
```

# テスト／プルリクエスト

* このページ右上の`Fork`から、このレポジトリをForkします
* Forkした、自身がオーナーのレポジトリをcloneします

```bash
$ git clone https://github.com/your-name/voice-text.git
$ cd voice-text
```

* `npm install`で依存モジュールを解消します
* 環境変数`VOICETEXT_APIKEY`に、自分のAPIキーを設定します
* `npm test`コマンドでテストが通ることを確認します

```bash
$ npm install

$ export VOICETEXT_APIKEY=YOUR_API_KEY

$ npm test
# 5 specs, 0 failures
# ...
```

`src`を変更して、改善案や機能の追加を行います。メソッドを追加した場合は、対応するテストを`test`内に追加してください。
変更点は[ATOM/Git Commit Messages](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages)に準拠して記入します。

```bash
$ npm commit -am ':art: 追加：.hogeMethod'
```

`git commit`で`npm test`が通ることを確認します（[ghooks](https://github.com/gtramontina/ghooks)経由）。

> テストには[jasminetea](https://github.com/59naga/jasminetea)を使用します。

```bash
# > jasminetea --lint --cover --report
# 5 specs, 0 failures
# ...
```

さいごに、変更内容をpushしたあと、[プルリクエストを作成します](https://github.com/59naga/voice-text/pulls)。

License
---
[MIT][License]

[License]: http://59naga.mit-license.org/

[sauce-image]: http://soysauce.berabou.me/u/59798/voice-text.svg
[sauce]: https://saucelabs.com/u/59798
[npm-image]:https://img.shields.io/npm/v/voice-text.svg?style=flat-square
[npm]: https://npmjs.org/package/voice-text
[travis-image]: http://img.shields.io/travis/59naga/voice-text.svg?style=flat-square
[travis]: https://travis-ci.org/59naga/voice-text
[coveralls-image]: http://img.shields.io/coveralls/59naga/voice-text.svg?style=flat-square
[coveralls]: https://coveralls.io/r/59naga/voice-text?branch=master
