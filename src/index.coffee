# Dependencies
Promise= require 'bluebird'
request= require 'request'

util= require 'util'
querystring= require 'querystring'

# Private
url= 'https://%s:%s@api.voicetext.jp/v1/tts?%s'

# Public
class VoiceText
  constructor: (@key= process.env.VOICETEXT_APIKEY)->
    @params=
      text: ''
      speaker: 'hikari'
      format: 'aac'
      emotion: ''
      emotion_level: ''
      pitch: '100'
      speed: '100'
      volume: '100'

  fetchVoice: (text)->
    @fetch text
    .then (response)->
      response.body

  fetch: (text)->
    @params.text= text if text?

    new Promise (resolve,reject)=>
      uri= @getUri()
      encoding= null

      request.post {
        uri
        encoding
      },(error,response)->
        unless error
          resolve response
        else
          reject error

  set: (name,value)->
    @params[name]= value
    this

  get: (name)->
    @params[name]

  getUri: ->
    util.format url,@key,'',querystring.stringify @params

module.exports= new VoiceText
module.exports.VoiceText= VoiceText
