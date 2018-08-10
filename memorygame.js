//Initialize variables

var score = 0;

//Get best score if there is one and write it in

var bestscore = localStorage.getItem('bestscore') || Infinity;
if (bestscore < Infinity) {
  var bestscorecontent = document.querySelector('.highscore');
  bestscorecontent.innerText = 'Best Score: ' + bestscore;
}

//Randomize and assign backface images to the cards

var c1 = 'gtr.png';
var c2 = 'p1.jpg';
var c3 = '918.jpg';
var c4 = 'laferrari.jpg';
var c5 = 'veyron.jpeg';
var c6 = 'zonda.jpg';
var c7 = 'agera.jpg';
var c8 = 'lambo.jpg';
var cararr = [c1, c1, c2, c2, c3, c3, c4, c4, c5, c5, c6, c6, c7, c7, c8, c8];
var cararr = shuffle(cararr);
var cararrflip = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

//Shuffle the array randomly

function shuffle(arr) {
  var i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

//Add images to each card

for (var i = 0; i < cararr.length; i++) {
  var img = document.createElement('img');
  img.setAttribute('src', cararr[i]);
  var card = document
    .getElementById(i.toString())
    .querySelector('.cardfaceback');
  card.appendChild(img);
}

//Game Logic

var card1,
  card2,
  state = 0,
  trancomp = false;
var card = document.querySelectorAll('.card');
for (var i = 0; i < card.length; i++) {
  card[i].addEventListener('click', function(event) {
    if (
      state === 0 &&
      cararrflip[
        event.target.parentElement.parentElement.parentElement.getAttribute(
          'id'
        )
      ] !== true
    ) {
      card1 = event.target.parentElement.parentElement.parentElement.getAttribute(
        'id'
      );
      event.target.parentElement.parentElement.classList.toggle('is-flipped');
      cararrflip[card1] =
        document.getElementById(card1.toString()).querySelector('.card')
          .classList[1] === 'is-flipped';
      score += 1;
      var s = document.querySelector('.score');
      s.innerText = 'Current score: ' + score.toString();
      state = 1;
    } else if (
      state === 1 &&
      cararrflip[
        event.target.parentElement.parentElement.parentElement.getAttribute(
          'id'
        )
      ] !== true
    ) {
      card2 = event.target.parentElement.parentElement.parentElement.getAttribute(
        'id'
      );
      event.target.parentElement.parentElement.classList.toggle('is-flipped');
      cararrflip[card2] =
        document.getElementById(card2.toString()).querySelector('.card')
          .classList[1] === 'is-flipped';
      score += 1;
      //Popup Modal for when a player wins the game
      if (cararrflip.every(x => x === true)) {
        setTimeout(function() {
          if (score < bestscore) {
            localStorage.setItem('bestscore', score);
          }
          var modal = document.querySelector('.modalbox');
          var scoreinfo = document.querySelector('.scoreinfo');
          modal.style.display = 'flex';
          scoreinfo.innerText =
            'Congrats! You scored ' +
            score.toString() +
            '! Click to begin a new game:';
        }, 500);
      }

      state = 2;
      trancomp = false;
      var s = document.querySelector('.score');
      s.innerText = 'Current score: ' + score.toString();
      var card1src = document
        .getElementById(card1.toString())
        .querySelector('.cardfaceback img')
        .getAttribute('src');
      var card2src = document
        .getElementById(card2.toString())
        .querySelector('.cardfaceback img')
        .getAttribute('src');
      if (card1src !== card2src) {
        setTimeout(function() {
          document
            .getElementById(card2.toString())
            .querySelector('.card')
            .classList.toggle('is-flipped');
          document
            .getElementById(card1.toString())
            .querySelector('.card')
            .classList.toggle('is-flipped');
          cararrflip[card1] =
            document.getElementById(card1.toString()).querySelector('.card')
              .classList[1] === 'is-flipped';
          cararrflip[card2] =
            document.getElementById(card2.toString()).querySelector('.card')
              .classList[1] === 'is-flipped';
          trancomp = true;
        }, 1000);
      } else {
        trancomp = true;
      }
    } else if (
      cararrflip[
        event.target.parentElement.parentElement.parentElement.getAttribute(
          'id'
        )
      ] !== true &&
      trancomp
    ) {
      card1 = event.target.parentElement.parentElement.parentElement.getAttribute(
        'id'
      );
      event.target.parentElement.parentElement.classList.toggle('is-flipped');
      cararrflip[card1] =
        document.getElementById(card1.toString()).querySelector('.card')
          .classList[1] === 'is-flipped';
      state = 1;
      score += 1;
      var s = document.querySelector('.score');
      s.innerText = 'Current score: ' + score.toString();
    }
  });
}

//Allow the new game button to reset the game

var resetbut = document.querySelectorAll('.reset');
for (var i = 0; i < resetbut.length; i++) {
  resetbut[i].addEventListener('click', function() {
    document.location.reload(true);
  });
}
