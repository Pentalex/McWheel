function checkItem(item){
  label = null
  if(item.label){
    label = item.label.toLowerCase()
  }
  if(!item || !label || label.includes("egg") || label.includes("bedrock") || label.includes("head") ||
     label.includes("chainmail") || label.includes("end") || label.includes("portal") || label.includes("command block") ||
     label.includes("barrier") || label.includes("air") || label.includes("tall grass") || label.includes("fire") ||
     label.includes("moving piston")){
    return false
  }
  return true
}

function getJSON(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
        } else {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
    };
    xhr.onerror = function () {
        reject({
            status: this.status,
            statusText: xhr.statusText
        });
    };
    xhr.send();
})};
async function findItem(item){
  item = item.toLowerCase()
  console.log(item)
  var foundItem;
  URL = "https://raw.githubusercontent.com/Pentalex/McWheel/main/minecraft-block-and-entity.json"
  blockList = JSON.parse((await getJSON(URL)))
  console.log(blockList)
  foundItem = blockList.find(block_item => block_item.label.toLowerCase() === item);

  console.log(foundItem)
  if (foundItem) {
    console.log(foundItem)
    return foundItem
  } else {
    return null
  }
}

async function initWheel() {
  URL = "https://raw.githubusercontent.com/Pentalex/McWheel/main/minecraft-block-and-entity.json"

  URL = "https://raw.githubusercontent.com/Pentalex/McWheel/main/minecraft-block-and-entity.json"
  blockList = JSON.parse((await getJSON(URL)))
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

function parseArguments(argumentString) {
  const pattern = /(.+?)(?:\s+(\d+))?$/;
  const match = argumentString.match(pattern);

  if (match) {
    const itemName = match[1].trim();
    const timeCount = match[2] ? parseInt(match[2], 10) : 0;
    return { itemName, timeCount };
  } else {
    return null;
  }
}



function initTimer(result, startTime=0){
  $('.wheel-wrap').hide()
  currentTimer = new easytimer.Timer({startValues: {seconds: startTime}});
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