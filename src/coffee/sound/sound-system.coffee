###
## SoundSystem tries to abstract away different ways of playing sound,
## according to weird performance characteristics of each browser
## (and probably, OS). Cross-browser sound playing is really in a sorry
## state, we are trying to make do here.
###

class SoundSystem

  constructor: (
    @timeKeeper,
    @audioApi,
    @samplebank,
    @patternPlayer
  ) ->
    @timeKeeper.addListener('beat', (beat) => @playSounds(beat) )
    @playPatterns = []

  addToScope: (scope) ->
    scope.add('play', (soundName, pattern) => @play(soundName, pattern))
    scope.add('getFFT', (hola) => @getFFT())
    scope.add('getWaveForm', (hola) => @getWaveForm())
    scope.add('setSmoothingTimeConstant', (hola) => @setSmoothingTimeConstant(hola))
    scope.add('setNumVars', (value) => @setNumVars(value))
    scope.add('getFFTvalue', (value) => @getFFT()[0][value])#TODO this not working

  clearPatterns: ->
    @playPatterns = []

  playStartupSound: ->
    @audioApi.play('bing')

  # called from within patches
  play: (name, pattern) ->
    if (name && pattern)
      @playPatterns.push({
        name: name,
        pattern: pattern
      })
  	  
  	  
  getFFT: (value) ->
  	  @audioApi.getFFT()
 
  getWaveForm: (value) ->
  	  @audioApi.getWaveForm()
  	  
  setSmoothingTimeConstant: (value) ->
  	  @audioApi.setSmoothingTimeConstant value
  	  
  setNumVars: (value) ->
  	  @audioApi.setNumVars value

  playSounds: (beat) =>
    for p in @playPatterns
      if (@patternPlayer.runPattern(p.pattern, beat))
        @audioApi.play(p.name)
    @clearPatterns()

module.exports = SoundSystem

