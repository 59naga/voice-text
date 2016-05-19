import Joi from 'joi';
import { format } from 'util';
import { stringify as queryStringify } from 'querystring';
import Promise, { promisify } from 'bluebird';
import { post as postRequest } from 'request';

const postRequestAsync = promisify(postRequest);

// @class VoiceText
export class VoiceText {
  // @see https://cloud.voicetext.jp/webapi/docs/api#section-4
  // @see https://github.com/hapijs/joi/blob/v8.0.5/API.md
  static validationSchema = Joi.object({
    text: Joi.string().min(1).max(200).required(),
    speaker: Joi.string().valid('hikari', 'haruka', 'takeru', 'santa', 'bear').default('hikari'),
    format: Joi.string().valid('wav', 'ogg', 'aac').default('ogg'),
    emotion: Joi.string().valid('happiness', 'anger', 'sadness'),
    emotion_level: Joi.number().min(1).max(4).when('emotion', { is: true, then: Joi.default(2) }),
    pitch: Joi.number().min(50).max(200).default(100),
    speed: Joi.number().min(50).max(400).default(100),
    volume: Joi.number().min(50).max(200).default(100),
  })
  .optionalKeys('emotion', 'emotion_level', 'pitch', 'speed', 'volume')
  .with('emotion_level', 'emotion')

  constructor(key = process.env.VOICETEXT_APIKEY) {
    this.key = key;
  }

  validate(data = {}) {
    return Joi.attempt(data, this.constructor.validationSchema);
  }
  getUri(key, data) {
    return format('https://%s:%s@api.voicetext.jp/v1/tts?%s', key, '', queryStringify(this.validate(data)));
  }

  stream(text = '', data = {}) {
    return postRequest(this.getUri(this.key, { text, ...data }), { encoding: null });
  }

  fetch(text = '', data = {}) {
    try {
      return postRequestAsync(this.getUri(this.key, { text, ...data }), { encoding: null });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  fetchBuffer(...args) {
    return this.fetch(...args).then((response) => response.body);
  }
}

export default new VoiceText;
