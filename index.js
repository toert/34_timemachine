var TIMEOUT_IN_SECS = 5 * 60
var TEMPLATE = '<p><span id="timer-minutes">00</span><span id="timer-seconds">00</span></p>'

// adds HTML tag to current page
var timerContainer = document.createElement('div')
timerContainer.style.height = "30px"
timerContainer.style.position = "fixed"
timerContainer.style.backgroundColor = "#F0F0F0"
timerContainer.style.color = "#000000"
timerContainer.style.fontSize = "13pt"

timerContainer.style.width = "100%"
timerContainer.style.top = 0
timerContainer.style.zIndex = 9000

var bodyTag = document.body
bodyTag.insertBefore(timerContainer, bodyTag.firstChild)
bodyTag.style.marginTop = "30px"
timerContainer.innerHTML = TEMPLATE

function getTimestampInSecs(){
  var timestampInMilliseconds = new Date().getTime()
  return Math.round(timestampInMilliseconds/1000)
}

function padZero(number){
  return ("00" + String(number)).slice(-2);
}

var timestampOnStart = getTimestampInSecs()
var lastAlertTime = getTimestampInSecs()

function displayTimer(){
  var currentTimestamp = getTimestampInSecs()
  var secsGone = currentTimestamp - timestampOnStart
  var secsLeft = Math.max(TIMEOUT_IN_SECS - secsGone, 0)

  var minutes = Math.floor(secsLeft / 60);
  var seconds = secsLeft - minutes * 60;
  if (secsLeft === 0) {
    if (lastAlertTime + 30 < getTimestampInSecs()) {
      alert("Не забывай о своем явном предначертании")
      lastAlertTime = getTimestampInSecs()
      document.getElementById('timer-minutes').innerHTML = ""
      document.getElementById('timer-seconds').innerHTML = "Time's up"
    }
  }
  else {
    document.getElementById('timer-minutes').innerHTML = padZero(minutes)
    document.getElementById('timer-seconds').innerHTML = ":" + padZero(seconds)
}
}

setInterval(displayTimer, 300)
