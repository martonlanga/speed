'use strict'

function functionCode(speed) {
  if (typeof speed === 'number') {
    return (
      '(' +
      function(speed) {
        if (
          document.getElementsByTagName('video').length &&
          document.getElementsByTagName('video')[0].playbackRate > 0.25
        ) {
          document.getElementsByTagName('video')[0].playbackRate += speed
          return (
            'Change speed to: ' +
            document.getElementsByTagName('video')[0].playbackRate
          )
        }
        return 'No video found'
      } +
      ')(' +
      JSON.stringify(speed) +
      ');'
    )
  } else {
    return (
      '(' +
      function(speed) {
        if (document.getElementsByTagName('video').length) {
          if (document.getElementsByTagName('video')[0].paused) {
            document.getElementsByTagName('video')[0].play()
            return 'Play video'
          } else {
            document.getElementsByTagName('video')[0].pause()
            return 'Pause video'
          }
        }
        return 'No video found'
      } +
      ')(' +
      JSON.stringify(0.25) +
      ');'
    )
  }
}

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command)

  switch (command) {
    case 'increment-speed':
      chrome.tabs.executeScript(
        {
          code: functionCode(0.25)
        },
        function(results) {
          console.log(results[0])
        }
      )
      break
    case 'decrement-speed':
      chrome.tabs.executeScript(
        {
          code: functionCode(-0.25)
        },
        function(results) {
          console.log(results[0])
        }
      )
      break
    case 'pause-play':
      chrome.tabs.executeScript(
        {
          code: functionCode()
        },
        function(results) {
          console.log(results[0])
        }
      )
      break
    default:
      console.log('Invalid Command:', command)
      break
  }
})
