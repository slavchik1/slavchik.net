window.onload = function() {
  var audio = document.getElementById("myAudio")
  var image = document.getElementById("myImage")

  function playAudio() {
    audio.play()
  }

  image.addEventListener("click", playAudio)
};