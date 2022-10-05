class InternationalChess {
  // Select main html element
  main = document.querySelector('main');

  constructor() {
    this.setTiles();
  }

  setTiles() {
    // Seting tiles, thier position and background color
    let tiles = '';
    let tileColorController = false;
    let tileCoordinate = [1, 1];

    // Color of chess tiles
    const chessTilesColor = ['black', 'white'];

    for (let i = 1; i < 65; i++) {
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
    this.main.innerHTML = tiles;

    this.initialPieciesPosition();
  }

  initialPieciesPosition() {
    // Pawn piecies color
    const pieceColor = ['purple', 'green'];

    // Arrange first set of pawn
    let pawnSide1 = '';
    for (let i = 1; i < 9; i++) {
      pawnSide1 += `
      <?xml version="1.0" encoding="iso-8859-1"?>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 297 297" style="grid-area:p2${i};z-index:10;fill:${pieceColor[0]};"  xml:space="preserve">
      
      <path stroke="blue" d="M223.333,247h-5.926c2.607-3.811,10.798-18.024-0.727-32.248c-13.334-16.46-39.863-65.748-27.324-98.752h0.977
      c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-1.225c10.917-10.466,17.725-25.184,17.725-41.5
      c0-31.756-25.744-57.5-57.5-57.5s-57.5,25.744-57.5,57.5c0,16.316,6.808,31.034,17.725,41.5h-2.225c-4.418,0-8.333,3.582-8.333,8v1
      c0,4.418,3.915,8,8.333,8h1.979c12.539,33.004-13.99,82.292-27.324,98.752c-11.524,14.224-3.334,28.437-0.727,32.248h-6.928
      c-4.418,0-8.333,3.582-8.333,8v18c0,4.418,3.915,8,8.333,8H75v16h148v-16c5,0,8-3.582,8-8v-18C231,250.582,227.751,247,223.333,247
      z"/>
      </svg>
      `;
    }
    this.main.innerHTML += pawnSide1;

    // Arrange second set of pawn
    let pawnSide2 = '';
    for (let i = 1; i < 9; i++) {
      pawnSide2 += `
      <?xml version="1.0" encoding="iso-8859-1"?>
     <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	  viewBox="0 0 297 297" style="grid-area:p7${i};z-index:10;fill:${pieceColor[1]};"  xml:space="preserve">
  
	  <path stroke="blue" d="M223.333,247h-5.926c2.607-3.811,10.798-18.024-0.727-32.248c-13.334-16.46-39.863-65.748-27.324-98.752h0.977
		c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-1.225c10.917-10.466,17.725-25.184,17.725-41.5
		c0-31.756-25.744-57.5-57.5-57.5s-57.5,25.744-57.5,57.5c0,16.316,6.808,31.034,17.725,41.5h-2.225c-4.418,0-8.333,3.582-8.333,8v1
		c0,4.418,3.915,8,8.333,8h1.979c12.539,33.004-13.99,82.292-27.324,98.752c-11.524,14.224-3.334,28.437-0.727,32.248h-6.928
		c-4.418,0-8.333,3.582-8.333,8v18c0,4.418,3.915,8,8.333,8H75v16h148v-16c5,0,8-3.582,8-8v-18C231,250.582,227.751,247,223.333,247
		z"/>
  </svg>
    `;
    }
    this.main.innerHTML += pawnSide2;
  }
}

const chess = new InternationalChess();
