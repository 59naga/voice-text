// dependencies
import 'babel-polyfill';
import assert from 'assert';
import { throws } from 'assert-exception';
import repeating from 'repeating';
import fileType from 'file-type';

// target
import voiceText from '../src';

// specs
describe('VoiceText', () => {
  it('fetch', async () => {
    const { body } = await voiceText.fetch('hello', { format: 'wav' });

    assert(Buffer.isBuffer(body));
    assert(fileType(body).mime === 'audio/x-wav');
  });

  it('fetchBuffer', async () => {
    const body = await voiceText.fetchBuffer('hello', { format: 'wav' });

    assert(Buffer.isBuffer(body));
    assert(fileType(body).mime === 'audio/x-wav');
  });

  it('stream', (done) => {
    let body = new Buffer('');
    voiceText.stream('hello', { format: 'wav' })
    .on('data', (chunk) => {
      body = Buffer.concat([body, new Buffer(chunk)]);
    })
    .on('end', () => {
      assert(Buffer.isBuffer(body));
      assert(fileType(body).mime === 'audio/x-wav');
      done();
    });
  });

  describe('.validate', () => {
    it('full paramaters', () => {
      assert.deepStrictEqual(
        voiceText.validate({
          text: repeating('あ', 200),
          speaker: 'bear',
          format: 'aac',
          emotion: 'sadness',
          emotion_level: '4',
          pitch: '200',
          speed: '50',
          volume: '200',
        }),
        {
          text: repeating('あ', 200),
          speaker: 'bear',
          format: 'aac',
          emotion: 'sadness',
          emotion_level: 4,
          pitch: 200,
          speed: 50,
          volume: 200,
        },
      );
    });

    it('validation erros', () => {
      assert(
        throws(() => voiceText.validate())
        .message.match('"text" is required')
      );
      assert(
        throws(() => voiceText.validate({ text: '' }))
        .message.match('"text" is not allowed to be empty')
      );
      assert(
        throws(() => voiceText.validate({ text: repeating('あ', 201) }))
        .message.match('"text" length must be less than or equal to 200 characters')
      );
      assert(
        throws(() => voiceText.validate({ text: '' }))
        .message.match('"text" is not allowed to be empty')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', invalidKey: 'foo' }))
        .message.match('"invalidKey" is not allowed')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', speaker: 'johndue' }))
        .message.match('"speaker" must be one of \\[hikari, haruka, takeru, santa, bear, show\\]')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', format: 'mp3' }))
        .message.match('"format" must be one of \\[wav, ogg, aac\\]')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', emotion: 'crazy' }))
        .message.match('"emotion" must be one of \\[happiness, anger, sadness\\]')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', emotion_level: 1 }))
        .message.match('"emotion_level" missing required peer "emotion"')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', pitch: 49 }))
        .message.match('"pitch" must be larger than or equal to 50')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', pitch: 201 }))
        .message.match('"pitch" must be less than or equal to 200')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', speed: 49 }))
        .message.match('"speed" must be larger than or equal to 50')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', speed: 401 }))
        .message.match('"speed" must be less than or equal to 400')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', volume: 49 }))
        .message.match('"volume" must be larger than or equal to 50')
      );
      assert(
        throws(() => voiceText.validate({ text: 'foo', volume: 201 }))
        .message.match('"volume" must be less than or equal to 200')
      );
    });
  });
});
