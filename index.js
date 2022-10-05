// Select main html element
const main = document.querySelector('main');
// Color of chess tiles
const chessTilesColor = ['black', 'white'];

// Seting tiles, thier position and background color
let tiles = '';
let tileColorController = false;
let tileCoordinate = [1, 1];

for (let i = 1; i <= 65; i++) {
  tileColorController = !tileColorController;
  tiles += tileColorController
    ? `<div style=background-color:${chessTilesColor[0]};grid-area:${
        'p' + tileCoordinate.join('')
      };></div>`
    : `<div style=background-color:${chessTilesColor[1]};grid-area:${
        'p' + tileCoordinate.join('')
      };></div>`;
  tileCoordinate[1] += 1;
  if (i % 8 === 0) {
    tileColorController = !tileColorController;
    tileCoordinate[0] += 1;
    tileCoordinate[1] = 1;
  }
}
main.innerHTML = tiles;
