VoiceText
---

<p align="right">
  <a href="https://npmjs.org/package/voice-text">
    <img src="https://img.shields.io/npm/v/voice-text.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/voice-text">
    <img src="http://img.shields.io/travis/59naga/voice-text.svg?style=flat-square">
  </a>
  <a href="https://ci.appveyor.com/project/59naga/voice-text">
    <img src="https://img.shields.io/appveyor/ci/59naga/voice-text.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/voice-text/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/voice-text.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/voice-text">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/voice-text.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/voice-text">
    <img src="https://img.shields.io/gemnasium/59naga/voice-text.svg?style=flat-square">
  </a>
</p>

Installation
---
```bash
npm install voice-text --save
```

Usage
---

## `fetchBuffer(text, params = {})` -> `Promise(buffer)`

[VoiceText Web API](https://cloud.voicetext.jp/webapi/docs/api) から `text` の変換結果を `Promise` で取得します。

事前に、`YOUR_API_KEY`を[API無料利用登録](https://cloud.voicetext.jp/webapi/api_keys/new)で取得している必要があります。

```js
import { VoiceText } from 'voice-text';
import { writeFileSync } from 'fs';

const voiceText = new VoiceText('YOUR_API_KEY');
voiceText.fetchBuffer('ゆっくりしていってね', { format: 'ogg' })
.then((buffer) => {
  writeFileSync('voice.ogg', buffer);
});
```

## `stream(text, params = {})` -> `readableStream`

[VoiceText Web API](https://cloud.voicetext.jp/webapi/docs/api) から `text` の変換結果を `readableStream` で取得します。

`fetchBuffer`より高速、軽量な動作を期待できます。

```js
import { VoiceText } from 'voice-text';
import { createWriteStream } from 'fs';

const voiceText = new VoiceText('YOUR_API_KEY');
voiceText
.stream('ゆっくりしていってね', { format: 'ogg' })
.pipe(createWriteStream('voice.ogg'));
```

Development
---
Requirement global
* NodeJS v5.11.0
* Npm v3.8.3

```bash
git clone https://github.com/59naga/voice-text
cd voice-text
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
