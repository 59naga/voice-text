# Dependencies
VoiceText= (require '../src').VoiceText

# Environment
jasmine.DEFAULT_TIMEOUT_INTERVAL= 5000

# Specs
describe 'voiceText',->
  describe '.fetch / .fetchVoice',->
    it '非同期に音声データを取得し、BufferをPromiseで返す',(done)->

      voiceText= new VoiceText
      voiceText.fetch 'ゆっくりしていってね'
      .then (response)->
        expect(response.statusCode).toBe 200
        expect(response.headers['content-type']).toBe 'audio/aac'
        expect(response.body).toBeTruthy()

        done()

    it '音声データだけ取得する場合',(done)->
      voiceText= new VoiceText
      voiceText.fetchVoice 'ゆっくりしていってね'
      .then (voice)->
        expect(Buffer.isBuffer(voice)).toBe true

        done()

  describe '.set で 上記のPOSTリクエストの書き換えを行える。',->
    it '.setはバリデーションを行わない',->
      voiceText= new VoiceText

      expect(voiceText.set 'speaker','john due').toBe voiceText
      expect(voiceText.get 'speaker').toBe 'john due'

      expect(voiceText.set 'format','ogg').toBe voiceText
      expect(voiceText.get 'format').toBe 'ogg'

      expect(voiceText.set 'emotion','happiness').toBe voiceText
      expect(voiceText.get 'emotion').toBe 'happiness'
      
      expect(voiceText.set 'emotion_level','4').toBe voiceText
      expect(voiceText.get 'emotion_level').toBe '4'

      expect(voiceText.set 'pitch','99999').toBe voiceText
      expect(voiceText.get 'pitch').toBe '99999'

      expect(voiceText.set 'speed',1).toBe voiceText
      expect(voiceText.get 'speed').toBe 1

      expect(voiceText.set 'volume',.0).toBe voiceText
      expect(voiceText.get 'volume').toBe .0

    it '.getの初期値',->
      voiceText= new VoiceText

      expect(voiceText.get 'text').toBe ''
      expect(voiceText.get 'speaker').toBe 'hikari'
      expect(voiceText.get 'format').toBe 'aac'
      expect(voiceText.get 'emotion').toBe ''
      expect(voiceText.get 'emotion_level').toBe ''
      expect(voiceText.get 'pitch').toBe '100'
      expect(voiceText.get 'speed').toBe '100'
      expect(voiceText.get 'volume').toBe '100'

  describe '.fetch / fetchVoiceで使用するURIは .getUri から取得できる',->
    it '.getUri',->
      biginning= 'https://'+process.env.VOICETEXT_APIKEY+':@api.voicetext.jp/v1/tts?'

      voiceText= new VoiceText

      expect(voiceText.getUri().slice(0,biginning.length)).toBe biginning
