/*
  Main
 */

function startConcoct() {
  var canvasList = document.querySelectorAll('canvas');

  
  for (var i = 0; i < canvasList.length; i++) {
    if (canvasList[i].getAttribute("concoct")) {
      new Concoct(canvasList[i]);
    }
  }
}

