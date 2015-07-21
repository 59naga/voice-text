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
