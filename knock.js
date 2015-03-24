"use strict";

var debounceTimeout = 80,
    doubleKnockTimeout = 2000,
    singleKnock, doubleKnock, debounced;

var resetState = function () {
  if( !doubleKnock ) {
    document.bgColor = "black";
  }

  singleKnock = false;
  doubleKnock = false;
  debounced = false;
};

$(function(){
  var outputEl = document.getElementById( "output" );
  document.body.style.color = "white";
  document.bgColor = "black";
  resetState();

  window.addEventListener( "devicemotion", function(e) {
    var x = e.accelerationIncludingGravity.x,
        y = e.accelerationIncludingGravity.y,
        z = e.accelerationIncludingGravity.z;


    var g = Math.sqrt( x*x + y*y + z*z );
    g -= 11.20; // Subtract gravity...and then some. Sensitivity adjustment?
    outputEl.innerHTML = g;

    if( g > 0 ) {
      if( singleKnock && debounced ) {
        doubleKnock = true;
        document.bgColor = "green";
        setTimeout( function () { document.bgColor = "black"; }, 1000);
      } else {
        singleKnock = true;
        document.bgColor = "red";
        setTimeout( function () {
          debounced = true;
          document.bgColor = "blue";
          setTimeout( resetState, doubleKnockTimeout );
        }, debounceTimeout );
      }
    } else {
    }

  });
});
