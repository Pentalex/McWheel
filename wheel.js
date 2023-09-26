function checkItem(item){
  label = null
  if(item.label){
    label = item.label.toLowerCase()
  }
  if(!item || !label || label.includes("egg") || label.includes("bedrock") || label.includes("head") ||
     label.includes("chainmail") || label.includes("end")){
    return false
  }
  return true
}

async function initWheel() {
  URL = "/minecraft-block-and-entity.json"
  var blockList = await fetch(URL, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': 'http://www.gamergeeks.net'
    }
  })
    .then(response => response.json())
    .then(data => { return data })
  var counter = 0
  randomItems = []
  const shuffled = blockList.sort(() => 0.5 - Math.random());
  while(randomItems.length < 100){
    nextItem = shuffled[counter]
    if(checkItem(nextItem)){
      randomItems.push(nextItem)
    }
    counter += 1
  }
  var $wheel = $('.roulette-wrapper .wheel'),
    row = "";

  row += "<div class='row'>";
  for (i = 0; i < randomItems.length; i++) {
    row += `<div class='icon-minecraft ${randomItems[i]['css']}'></div>`
  }
  row += "<\/div>";

  for (var x = 0; x < 5; x++) {
    $wheel.append(row);
  }
}

function initTimer(result){
  currentTimer = new easytimer.Timer();
  $('.timer-wrapper').show()
  currentTimer.start();
  currentTimer.addEventListener('secondsUpdated', function (e) {
    $('#timerdiv').html(currentTimer.getTimeValues().toString());
  });
  $('#item').html(result.label)
  $('.getting').append(`<div class='icon-minecraft ${result['css']}' style="transform: scale(1); margin-left: 0; margin-right: 0; margin-top: 0;"></div>`)
}

function endTime(){

}

function endingWheel(result) {
  console.log(result)
  $('#resultHeader').show()
  $('#result').html(result.label)
  $('.wheel-wrap').hide()
  initTimer(result)
}

function spinWheel(roll, result) {
  var $wheel = $('.roulette-wrapper .wheel')
  roll += 1
  //determine position where to land
  var rows = 2,
    card = 64,
    landingPosition = 50 * card + (roll * card);

  var randomize = Math.floor(Math.random() * 16) - (32 / 2);

  landingPosition = landingPosition + randomize;

  var object = {
    x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100
  };

  $wheel.css({
    'transition-timing-function': 'cubic-bezier(0,' + object.x + ',' + object.y + ',1)',
    'transition-duration': '6s',
    'transform': 'translate3d(-' + landingPosition + 'px, 0px, 0px)'
  });

  setTimeout(function () {
    $wheel.css({
      'transition-timing-function': '',
      'transition-duration': '',
    });

    endingWheel(result)

    var resetTo = -(roll * card + randomize);
    console.log(resetTo)
    // $wheel.css('transform', 'translate3d(' + resetTo + 'px, 0px, 0px)');
  }, 7 * 1000);
}