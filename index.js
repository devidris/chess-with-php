class InternationalChess {
  // Select main html element
  main = document.querySelector('main');
  outsideElement = [
    11, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89,
  ];
  kingPosition = {
    white: 15,
    black: 85,
  };

  move = 'white';
  activePiece = undefined;

  constructor() {
    this.setTiles();

    // Adding eventlisteners to all chess pieces and also check for capture
    document.querySelectorAll('.piece').forEach((piece) => {
      piece.addEventListener('click', (e) => {
        // Check for capture
        if (this.activePiece) {
          this.checkIfPieceOnCheckmateCapture(piece);
        }
        this.activePiece = piece.dataset.unique;

        // Remove any piece that has background color
        document.querySelectorAll('.piece').forEach((piece) => {
          piece.style.backgroundColor = '';
        });
        // Check for capture
        if (this.activePiece) {
          this.checkIfPieceOnCheckmateCapture(piece);
        }
        this.activePiece = piece.dataset.unique;

        // Remove any piece that has background color
        document.querySelectorAll('.piece').forEach((piece) => {
          piece.style.backgroundColor = '';
        });

        if (piece.dataset.color === this.move) {
          // Add background color to active piece
          piece.style.backgroundColor = 'green';
        }
      });
    });

    // Adding eventlisteners to chess tiles for piece movement
    document.querySelectorAll('.background').forEach((tile) => {
      tile.addEventListener('click', (e) => {
        this.checkIfPieceOnCheckmateMovement(tile);
      });
    });
  }

  // Seting tiles, thier position and background color
  setTiles() {
    let tiles = '';
    let tileColorController = false;
    let tileCoordinate = [1, 1];

    // Color of chess tiles
    const chessTilesColor = ['#BAA379', '#60543C'];

    for (let i = 1; i < 65; i++) {
      tileColorController = !tileColorController;
      tiles += tileColorController
        ? `<div class="background" data-position="${tileCoordinate.join(
            ''
          )}" style=background-color:${chessTilesColor[0]};grid-area:${
            'p' + tileCoordinate.join('')
          };></div>`
        : `<div class="background" data-position="${tileCoordinate.join(
            ''
          )}" style=background-color:${chessTilesColor[1]};grid-area:${
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

  // Display default postion of chess pieces
  initialPieciesPosition() {
    // Pawn piecies color
    const pieceColor = ['#fff', '#000'];

    // Arrange first set of pawn
    let pawnSide1 = '';
    for (let i = 1; i < 9; i++) {
      pawnSide1 += `
      <div class="pawn piece" data-firstMove="true" data-piece="pawn" data-unique="pawn2${i}" data-position="2${i}" data-color="white" style="grid-area:p2${i};z-index:10;">
      <?xml version="1.0" encoding="iso-8859-1"?>
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 297 297" style="fill:${pieceColor[0]};"  xml:space="preserve">
      
      <path stroke="blue" d="M223.333,247h-5.926c2.607-3.811,10.798-18.024-0.727-32.248c-13.334-16.46-39.863-65.748-27.324-98.752h0.977
      c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-1.225c10.917-10.466,17.725-25.184,17.725-41.5
      c0-31.756-25.744-57.5-57.5-57.5s-57.5,25.744-57.5,57.5c0,16.316,6.808,31.034,17.725,41.5h-2.225c-4.418,0-8.333,3.582-8.333,8v1
      c0,4.418,3.915,8,8.333,8h1.979c12.539,33.004-13.99,82.292-27.324,98.752c-11.524,14.224-3.334,28.437-0.727,32.248h-6.928
      c-4.418,0-8.333,3.582-8.333,8v18c0,4.418,3.915,8,8.333,8H75v16h148v-16c5,0,8-3.582,8-8v-18C231,250.582,227.751,247,223.333,247
      z"/>
      </svg>
      </div>
      `;
    }
    this.main.innerHTML += pawnSide1;

    // Arrange second set of pawn
    let pawnSide2 = '';
    for (let i = 1; i < 9; i++) {
      pawnSide2 += `
      <div class="pawn piece" data-firstMove="true" data-piece="pawn" data-unique="pawn7${i}"  data-position="7${i}" data-color="black" style="grid-area:p7${i};z-index:10;">
      <?xml version="1.0" encoding="iso-8859-1"?>
     <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" data-piece="pawn" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	  viewBox="0 0 297 297" style="fill:${pieceColor[1]};"  xml:space="preserve">
  
	  <path stroke="blue" d="M223.333,247h-5.926c2.607-3.811,10.798-18.024-0.727-32.248c-13.334-16.46-39.863-65.748-27.324-98.752h0.977
		c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-1.225c10.917-10.466,17.725-25.184,17.725-41.5
		c0-31.756-25.744-57.5-57.5-57.5s-57.5,25.744-57.5,57.5c0,16.316,6.808,31.034,17.725,41.5h-2.225c-4.418,0-8.333,3.582-8.333,8v1
		c0,4.418,3.915,8,8.333,8h1.979c12.539,33.004-13.99,82.292-27.324,98.752c-11.524,14.224-3.334,28.437-0.727,32.248h-6.928
		c-4.418,0-8.333,3.582-8.333,8v18c0,4.418,3.915,8,8.333,8H75v16h148v-16c5,0,8-3.582,8-8v-18C231,250.582,227.751,247,223.333,247
		z"/>
  </svg>
  </div>
    `;
    }
    this.main.innerHTML += pawnSide2;

    // Arrange rooks
    let rooks = '';
    // Top left rook
    rooks += `
    <div class="rook piece" data-piece="rook" data-unique="rook11"  data-position="11" data-color="white" 
    style="grid-area:p11;z-index:10;">
  
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" data-piece="rook" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 298 298" style="fill:${pieceColor[0]};"xml:space="preserve">
    
      <path d="M216.923,246.538c3.457-6.556,9.963-22.777-1.666-39.137C200.508,186.65,179.942,125,193.61,83H207V0h-16v17h-16V0h-18v17
        h-16V0h-17v17h-16V0H91v83h14.057c13.668,42-6.98,103.65-21.73,124.401c-11.629,16.359-5.373,32.706-1.916,39.262
        C77.347,247.044,74,250.337,74,254.5v18c0,4.418,3.915,8.5,8.333,8.5H83v17h132v-17h1.333c4.418,0,7.667-4.082,7.667-8.5v-18
        C224,250.338,220.986,246.92,216.923,246.538z"/>
    
    </svg>
    </div>
    `;
    // Top right rook
    rooks += `
    <div class="rook piece" data-piece="rook" data-unique="rook18"  data-position="18" data-color="white" 
    style="grid-area:p18;z-index:10;">
   
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" data-piece="rook" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 298 298" style="fill:${pieceColor[0]};"xml:space="preserve">
    
      <path d="M216.923,246.538c3.457-6.556,9.963-22.777-1.666-39.137C200.508,186.65,179.942,125,193.61,83H207V0h-16v17h-16V0h-18v17
        h-16V0h-17v17h-16V0H91v83h14.057c13.668,42-6.98,103.65-21.73,124.401c-11.629,16.359-5.373,32.706-1.916,39.262
        C77.347,247.044,74,250.337,74,254.5v18c0,4.418,3.915,8.5,8.333,8.5H83v17h132v-17h1.333c4.418,0,7.667-4.082,7.667-8.5v-18
        C224,250.338,220.986,246.92,216.923,246.538z"/>
    
    </svg>
    </div>
    `;
    // Bottom right rook
    rooks += `
    <div class="rook piece" data-piece="rook" data-unique="rook81"  data-position="81" data-color="black" 
    style="grid-area:p81;z-index:10;">
  
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  data-piece="rook" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 298 298" style="fill:${pieceColor[1]};"xml:space="preserve">
    
      <path d="M216.923,246.538c3.457-6.556,9.963-22.777-1.666-39.137C200.508,186.65,179.942,125,193.61,83H207V0h-16v17h-16V0h-18v17
        h-16V0h-17v17h-16V0H91v83h14.057c13.668,42-6.98,103.65-21.73,124.401c-11.629,16.359-5.373,32.706-1.916,39.262
        C77.347,247.044,74,250.337,74,254.5v18c0,4.418,3.915,8.5,8.333,8.5H83v17h132v-17h1.333c4.418,0,7.667-4.082,7.667-8.5v-18
        C224,250.338,220.986,246.92,216.923,246.538z"/>
    
    </svg>
    </div>
    `;
    // Bottom right rook
    rooks += `
    <div class="rook piece" data-piece="rook" data-unique="rook88"  data-position="88" data-color="black" 
    style="grid-area:p88;z-index:10;">
  
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  data-piece="rook" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 298 298" style="fill:${pieceColor[1]};"xml:space="preserve">
    
      <path d="M216.923,246.538c3.457-6.556,9.963-22.777-1.666-39.137C200.508,186.65,179.942,125,193.61,83H207V0h-16v17h-16V0h-18v17
        h-16V0h-17v17h-16V0H91v83h14.057c13.668,42-6.98,103.65-21.73,124.401c-11.629,16.359-5.373,32.706-1.916,39.262
        C77.347,247.044,74,250.337,74,254.5v18c0,4.418,3.915,8.5,8.333,8.5H83v17h132v-17h1.333c4.418,0,7.667-4.082,7.667-8.5v-18
        C224,250.338,220.986,246.92,216.923,246.538z"/>
    
    </svg>
    </div>
    `;
    this.main.innerHTML += rooks;

    // Arrange knights
    let knights = '';
    // Top left knight
    knights += `<div class="knight piece" data-piece="knight" data-unique="knight12"  data-position="12" data-color="white" 
    style="grid-area:p12;z-index:10;">
 
    
  <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="fill:${pieceColor[0]}" xml:space="preserve">
  <g>
    <path d="M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2
      c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4
      l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z"/>
    <path d="M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z"/>
  </g>
  </svg>
  </div>
  `;
    // Top rigth knight
    knights += `
    <div class="knight piece" data-piece="knight" data-unique="knight17"  data-position="17" data-color="white" 
    style="grid-area:p17;z-index:10;">
    <?xml version="1.0" encoding="utf-8"?>
  <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="fill:${pieceColor[0]}" xml:space="preserve">
  <g>
    <path d="M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2
      c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4
      l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z"/>
    <path d="M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z"/>
  </g>
  </svg>
  </div>
  `;
    // Bottom left knight
    knights += `
    <div class="knight piece" data-piece="knight" data-unique="knight82"  data-position="82" data-color="black" 
    style="grid-area:p82;z-index:10;">
    <?xml version="1.0" encoding="utf-8"?>

  <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="fill:${pieceColor[1]}" xml:space="preserve">
  <g>
    <path d="M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2
      c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4
      l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z"/>
    <path d="M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z"/>
  </g>
  </svg>
  </div>
  `;

    // Top left knight
    knights += `
    <div class="knight piece" data-piece="knight" data-unique="knight87"  data-position="87" data-color="black" 
    style="grid-area:p87;z-index:10;"> 
    <?xml version="1.0" encoding="utf-8"?>

  <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="fill:${pieceColor[1]}" xml:space="preserve">
  <g>
    <path d="M7.2,16l1.1-0.2c1.6-0.3,3.3-0.5,5-0.7c-2.4,2.3-3.9,5.3-4.7,7.9h14.7c0.4-1.5,1.1-3,2.3-4.1l0.2-0.2
      c0.2-0.2,0.3-0.4,0.3-0.6C26.6,13,24.2,8,19.8,5.3c-0.8-1.4-2-2.4-3.6-2.9l-0.9-0.3C15,2,14.7,2,14.4,2.2C14.2,2.4,14,2.7,14,3v2.4
      l-1.4,0.7C12.2,6.3,12,6.6,12,7v0.5l-4.7,3.1C6.5,11.1,6,12.1,6,13.1V15c0,0.3,0.1,0.6,0.4,0.8C6.6,16,6.9,16,7.2,16z"/>
    <path d="M6.8,25C6.3,25.5,6,26.2,6,27v2c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-2c0-0.8-0.3-1.5-0.8-2H6.8z"/>
  </g>
  </svg>
  </div>
  `;
    this.main.innerHTML += knights;

    // Arrange Bishops
    let bishops = '';
    // Top left bishop
    bishops += `
    <div class="bishop piece" data-piece="bishop" data-unique="bishop13"  data-position="13" data-color="white" 
    style="grid-area:p13;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 297.08 297.08" style="fill:${pieceColor[0]}"  xml:space="preserve">
      <path d="M206.873,255.08h-3.41c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.137-39.546-24.448-64.4h3.57
        c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-4.333v-4.285c13-8.971,20.511-23.502,20.511-39.914
        c0-10.332-7.011-26.11-15.819-41.721l-18.553,18.595c-3.111,3.111-8.182,3.111-11.294,0.001l-0.921-0.933
        c-3.111-3.11-3.106-8.202,0.005-11.313l21.676-21.674c-4.444-7.069-8.869-13.678-12.703-19.224
        c2.881-2.93,4.663-6.944,4.663-11.379C165.106,7.268,157.841,0,148.874,0c-8.967,0-16.234,7.268-16.234,16.233
        c0,4.434,1.781,8.448,4.662,11.379c-14.585,21.101-37.94,57.587-37.94,76.269c0,16.853,8.178,31.724,21.178,40.625v3.574h-4.667
        c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h3.571c0.689,24.855-15.547,53.495-24.448,64.4
        c-9.031,11.064-2.926,22.263-0.712,25.6h-3.411c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118v-17.069
        c4-0.493,7-3.853,7-7.931v-9C214.54,258.662,211.291,255.08,206.873,255.08z"/>
    </svg>
    </div>
    `;
    // Top right bishop
    bishops += `
    <div class="bishop piece" data-piece="bishop" data-unique="bishop16"  data-position="16" data-color="white" 
    style="grid-area:p16;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 297.08 297.08" style="fill:${pieceColor[0]}"  xml:space="preserve">
      <path d="M206.873,255.08h-3.41c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.137-39.546-24.448-64.4h3.57
        c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-4.333v-4.285c13-8.971,20.511-23.502,20.511-39.914
        c0-10.332-7.011-26.11-15.819-41.721l-18.553,18.595c-3.111,3.111-8.182,3.111-11.294,0.001l-0.921-0.933
        c-3.111-3.11-3.106-8.202,0.005-11.313l21.676-21.674c-4.444-7.069-8.869-13.678-12.703-19.224
        c2.881-2.93,4.663-6.944,4.663-11.379C165.106,7.268,157.841,0,148.874,0c-8.967,0-16.234,7.268-16.234,16.233
        c0,4.434,1.781,8.448,4.662,11.379c-14.585,21.101-37.94,57.587-37.94,76.269c0,16.853,8.178,31.724,21.178,40.625v3.574h-4.667
        c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h3.571c0.689,24.855-15.547,53.495-24.448,64.4
        c-9.031,11.064-2.926,22.263-0.712,25.6h-3.411c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118v-17.069
        c4-0.493,7-3.853,7-7.931v-9C214.54,258.662,211.291,255.08,206.873,255.08z"/>
    </svg>
    </div>
    `;
    // Bottom left bishop
    bishops += `
    <div class="bishop piece" data-piece="bishop" data-unique="bishop83"  data-position="83" data-color="black" 
    style="grid-area:p83;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 297.08 297.08" style="fill:${pieceColor[1]}"  xml:space="preserve">
      <path d="M206.873,255.08h-3.41c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.137-39.546-24.448-64.4h3.57
        c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-4.333v-4.285c13-8.971,20.511-23.502,20.511-39.914
        c0-10.332-7.011-26.11-15.819-41.721l-18.553,18.595c-3.111,3.111-8.182,3.111-11.294,0.001l-0.921-0.933
        c-3.111-3.11-3.106-8.202,0.005-11.313l21.676-21.674c-4.444-7.069-8.869-13.678-12.703-19.224
        c2.881-2.93,4.663-6.944,4.663-11.379C165.106,7.268,157.841,0,148.874,0c-8.967,0-16.234,7.268-16.234,16.233
        c0,4.434,1.781,8.448,4.662,11.379c-14.585,21.101-37.94,57.587-37.94,76.269c0,16.853,8.178,31.724,21.178,40.625v3.574h-4.667
        c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h3.571c0.689,24.855-15.547,53.495-24.448,64.4
        c-9.031,11.064-2.926,22.263-0.712,25.6h-3.411c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118v-17.069
        c4-0.493,7-3.853,7-7.931v-9C214.54,258.662,211.291,255.08,206.873,255.08z"/>
    </svg>
    </div>
    `;
    // Buttom right bishop
    bishops += `
    <div class="bishop piece" data-piece="bishop" data-unique="bishop86"  data-position="86" data-color="black" 
    style="grid-area:p86;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 297.08 297.08" style="fill:${pieceColor[1]}"  xml:space="preserve">
      <path d="M206.873,255.08h-3.41c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.137-39.546-24.448-64.4h3.57
        c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.249-8-7.667-8h-4.333v-4.285c13-8.971,20.511-23.502,20.511-39.914
        c0-10.332-7.011-26.11-15.819-41.721l-18.553,18.595c-3.111,3.111-8.182,3.111-11.294,0.001l-0.921-0.933
        c-3.111-3.11-3.106-8.202,0.005-11.313l21.676-21.674c-4.444-7.069-8.869-13.678-12.703-19.224
        c2.881-2.93,4.663-6.944,4.663-11.379C165.106,7.268,157.841,0,148.874,0c-8.967,0-16.234,7.268-16.234,16.233
        c0,4.434,1.781,8.448,4.662,11.379c-14.585,21.101-37.94,57.587-37.94,76.269c0,16.853,8.178,31.724,21.178,40.625v3.574h-4.667
        c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h3.571c0.689,24.855-15.547,53.495-24.448,64.4
        c-9.031,11.064-2.926,22.263-0.712,25.6h-3.411c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118v-17.069
        c4-0.493,7-3.853,7-7.931v-9C214.54,258.662,211.291,255.08,206.873,255.08z"/>
    </svg>
    </div>
    `;
    this.main.innerHTML += bishops;

    // Arrange queens
    let queens = `
    <div class="queen piece" data-piece="queen" data-unique="queen14"  data-position="14" data-color="white" 
    style="grid-area:p14;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 297.77 297.77"style="fill:${pieceColor[0]}"  xml:space="preserve">
	<path d="M207.218,255.77h-3.369c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.129-39.546-24.438-64.4h3.519
		c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.582-8-8-8c4.418,0,8-3.582,8-8v-1c0-4.418-3.249-8-7.667-8h-4.626
		c-2.064-21.741,1.078-43.054,5.959-54.666c1.86-4.425,4.118-7.79,6.296-10.334h1.371c4.418,0,7.667-3.582,7.667-8v-1
		c0-4.418-3.249-8-7.667-8h-9.8c-1.803-10.896-8.998-19.966-18.755-24.383c1.783-2.607,2.829-5.757,2.829-9.154
		C165.492,7.267,158.227,0,149.26,0s-16.234,7.267-16.234,16.232c0,3.385,1.037,6.525,2.809,9.127
		c-9.788,4.406-17.01,13.49-18.816,24.41h-10.8c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h2.371
		c2.178,2.544,4.436,5.909,6.296,10.334c4.881,11.612,8.023,32.925,5.959,54.666h-4.626c-4.418,0-8.333,3.582-8.333,8v1
		c0,4.418,3.582,8,8,8c-4.418,0-8,3.582-8,8v1c0,4.418,3.915,8,8.333,8h3.602c0.692,24.854-15.536,53.495-24.438,64.4
		c-9.031,11.063-2.926,22.263-0.712,25.6h-3.452c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118V280.7
		c4-0.493,7-3.853,7-7.931v-9C214.885,259.352,211.636,255.77,207.218,255.77z"/>

</svg>
</div>
<div class="queen piece" data-piece="queen" data-unique="queen84"  data-position="84" data-color="black" 
    style="grid-area:p84;z-index:10;">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 297.77 297.77"style="fill:${pieceColor[1]}"  xml:space="preserve">
	<path d="M207.218,255.77h-3.369c2.214-3.337,8.32-14.536-0.712-25.6c-8.9-10.905-25.129-39.546-24.438-64.4h3.519
		c4.418,0,7.667-3.582,7.667-8v-1c0-4.418-3.582-8-8-8c4.418,0,8-3.582,8-8v-1c0-4.418-3.249-8-7.667-8h-4.626
		c-2.064-21.741,1.078-43.054,5.959-54.666c1.86-4.425,4.118-7.79,6.296-10.334h1.371c4.418,0,7.667-3.582,7.667-8v-1
		c0-4.418-3.249-8-7.667-8h-9.8c-1.803-10.896-8.998-19.966-18.755-24.383c1.783-2.607,2.829-5.757,2.829-9.154
		C165.492,7.267,158.227,0,149.26,0s-16.234,7.267-16.234,16.232c0,3.385,1.037,6.525,2.809,9.127
		c-9.788,4.406-17.01,13.49-18.816,24.41h-10.8c-4.418,0-8.333,3.582-8.333,8v1c0,4.418,3.915,8,8.333,8h2.371
		c2.178,2.544,4.436,5.909,6.296,10.334c4.881,11.612,8.023,32.925,5.959,54.666h-4.626c-4.418,0-8.333,3.582-8.333,8v1
		c0,4.418,3.582,8,8,8c-4.418,0-8,3.582-8,8v1c0,4.418,3.915,8,8.333,8h3.602c0.692,24.854-15.536,53.495-24.438,64.4
		c-9.031,11.063-2.926,22.263-0.712,25.6h-3.452c-4.418,0-8.333,3.582-8.333,8v9c0,4.078,3,7.438,7,7.931v17.069h118V280.7
		c4-0.493,7-3.853,7-7.931v-9C214.885,259.352,211.636,255.77,207.218,255.77z"/>

</svg>
</div>

    `;
    this.main.innerHTML += queens;

    // Arrange kings
    let kings = `
    <div class="king piece" data-piece="king" data-unique="king15"  data-position="15" data-color="white" 
    style="grid-area:p15;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 41.325 41.325" 
       xml:space="preserve" style="fill:${pieceColor[0]}" >
    
      <path d="M27.615,40.452c0.106,0.283,0.143,0.873,0.143,0.873H13.571c0,0,0.002-0.595,0.127-0.896
        c0.125-0.299,0.498-0.576,0.498-0.576h0.05c0.02-0.063,0.039-0.133,0.056-0.203H14.28c-0.591-0.772-0.947-1.92-0.862-3.104
        s0.949-2.379,1.532-3.299l0.023-0.09c-0.021-0.068,0.006-0.052-0.005-0.123c-0.169-0.043-0.484-0.32-0.394-0.66
        c0.113-0.461,0.526-0.562,0.672-0.562h0.073l0.026-0.092l-0.005-0.093c1.442-3.293,2.606-5.104,2.997-11.321
        c-0.042-0.074-0.084-0.148-0.122-0.222c-0.752,0-1.372,0-1.401-0.002c-0.098-0.011-0.801-0.418-0.739-1.068
        c0.072-0.812,0.799-1.105,0.893-1.105c0.022,0,0.276,0,0.64,0l0.209-3.7c0,0-2.284-3.409-2.638-3.979
        c-0.254-0.413-0.486-0.945-0.486-1.472c0-1.196,0.951-2.17,2.123-2.17c0.339,0,0.866,0.001,1.205,0.001c0,0,0-0.386,0-0.531
        c0-0.345,0.272-0.622,0.609-0.622c0.658,0,3.525,0,4.07,0c0.335,0,0.606,0.277,0.606,0.622c0,0.146,0,0.531,0,0.531
        c0.34,0,0.865-0.001,1.204-0.001c1.173,0,2.123,0.973,2.123,2.17c0,0.525-0.229,1.059-0.486,1.472
        c-0.354,0.57-2.608,3.889-2.608,3.889l0.181,3.792c0.377,0,0.634,0,0.655,0c0.094,0,0.781,0.349,0.854,1.163
        c0.062,0.648-0.601,1.001-0.698,1.012c-0.027,0.002-0.645,0.002-1.406,0.002c-0.011,0.155-0.047,0.325-0.114,0.511
        c0.415,5.979,1.771,7.791,3.188,11.032l0.003,0.064l-0.002,0.116c0.066,0,0.108,0,0.12,0c0.146,0,0.56,0.103,0.672,0.562
        c0.098,0.369-0.277,0.664-0.433,0.67l-0.078,0.076c0.008,0.072,0.062,0.08,0.058,0.17c0.663,1.006,1.297,2.301,1.372,3.486
        c0.066,1.104-0.239,1.998-0.773,2.746c0.02,0.129,0.025,0.248,0.021,0.354C27.24,39.95,27.522,40.212,27.615,40.452z M18.824,3.601
        c0.546-0.559,1.191-0.803,1.445-0.546c0.25,0.26,0.012,0.921-0.534,1.477c-0.084,0.086-0.173,0.165-0.259,0.233
        c0.378,0.237,0.825,0.372,1.298,0.372c0.47-0.001,0.909-0.133,1.285-0.358c-0.095-0.074-0.188-0.155-0.275-0.248
        c-0.546-0.559-0.785-1.217-0.534-1.476c0.251-0.258,0.898-0.013,1.444,0.546c0.09,0.091,0.17,0.185,0.242,0.28
        c0.224-0.385,0.352-0.833,0.352-1.312c0-0.484-0.131-0.938-0.361-1.325c-0.062,0.081-0.135,0.165-0.214,0.243
        c-0.546,0.56-1.192,0.803-1.443,0.545c-0.251-0.256-0.014-0.917,0.532-1.476c0.075-0.076,0.151-0.146,0.229-0.21
        C21.66,0.125,21.231,0,20.773,0c-0.457,0-0.886,0.127-1.256,0.346c0.089,0.069,0.178,0.15,0.261,0.236
        c0.545,0.56,0.785,1.22,0.533,1.477c-0.251,0.256-0.897,0.013-1.443-0.544c-0.089-0.093-0.17-0.186-0.242-0.279
        c-0.23,0.388-0.364,0.845-0.364,1.335c0,0.466,0.123,0.907,0.336,1.285C18.668,3.77,18.741,3.683,18.824,3.601z"/>
    
    </svg>
</div><div class="king piece" data-piece="king" data-unique="king85"  data-position="85" data-color="black" 
style="grid-area:p85;z-index:10;">
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 41.325 41.325" 
       xml:space="preserve" style="fill:${pieceColor[1]}" >
    
      <path d="M27.615,40.452c0.106,0.283,0.143,0.873,0.143,0.873H13.571c0,0,0.002-0.595,0.127-0.896
        c0.125-0.299,0.498-0.576,0.498-0.576h0.05c0.02-0.063,0.039-0.133,0.056-0.203H14.28c-0.591-0.772-0.947-1.92-0.862-3.104
        s0.949-2.379,1.532-3.299l0.023-0.09c-0.021-0.068,0.006-0.052-0.005-0.123c-0.169-0.043-0.484-0.32-0.394-0.66
        c0.113-0.461,0.526-0.562,0.672-0.562h0.073l0.026-0.092l-0.005-0.093c1.442-3.293,2.606-5.104,2.997-11.321
        c-0.042-0.074-0.084-0.148-0.122-0.222c-0.752,0-1.372,0-1.401-0.002c-0.098-0.011-0.801-0.418-0.739-1.068
        c0.072-0.812,0.799-1.105,0.893-1.105c0.022,0,0.276,0,0.64,0l0.209-3.7c0,0-2.284-3.409-2.638-3.979
        c-0.254-0.413-0.486-0.945-0.486-1.472c0-1.196,0.951-2.17,2.123-2.17c0.339,0,0.866,0.001,1.205,0.001c0,0,0-0.386,0-0.531
        c0-0.345,0.272-0.622,0.609-0.622c0.658,0,3.525,0,4.07,0c0.335,0,0.606,0.277,0.606,0.622c0,0.146,0,0.531,0,0.531
        c0.34,0,0.865-0.001,1.204-0.001c1.173,0,2.123,0.973,2.123,2.17c0,0.525-0.229,1.059-0.486,1.472
        c-0.354,0.57-2.608,3.889-2.608,3.889l0.181,3.792c0.377,0,0.634,0,0.655,0c0.094,0,0.781,0.349,0.854,1.163
        c0.062,0.648-0.601,1.001-0.698,1.012c-0.027,0.002-0.645,0.002-1.406,0.002c-0.011,0.155-0.047,0.325-0.114,0.511
        c0.415,5.979,1.771,7.791,3.188,11.032l0.003,0.064l-0.002,0.116c0.066,0,0.108,0,0.12,0c0.146,0,0.56,0.103,0.672,0.562
        c0.098,0.369-0.277,0.664-0.433,0.67l-0.078,0.076c0.008,0.072,0.062,0.08,0.058,0.17c0.663,1.006,1.297,2.301,1.372,3.486
        c0.066,1.104-0.239,1.998-0.773,2.746c0.02,0.129,0.025,0.248,0.021,0.354C27.24,39.95,27.522,40.212,27.615,40.452z M18.824,3.601
        c0.546-0.559,1.191-0.803,1.445-0.546c0.25,0.26,0.012,0.921-0.534,1.477c-0.084,0.086-0.173,0.165-0.259,0.233
        c0.378,0.237,0.825,0.372,1.298,0.372c0.47-0.001,0.909-0.133,1.285-0.358c-0.095-0.074-0.188-0.155-0.275-0.248
        c-0.546-0.559-0.785-1.217-0.534-1.476c0.251-0.258,0.898-0.013,1.444,0.546c0.09,0.091,0.17,0.185,0.242,0.28
        c0.224-0.385,0.352-0.833,0.352-1.312c0-0.484-0.131-0.938-0.361-1.325c-0.062,0.081-0.135,0.165-0.214,0.243
        c-0.546,0.56-1.192,0.803-1.443,0.545c-0.251-0.256-0.014-0.917,0.532-1.476c0.075-0.076,0.151-0.146,0.229-0.21
        C21.66,0.125,21.231,0,20.773,0c-0.457,0-0.886,0.127-1.256,0.346c0.089,0.069,0.178,0.15,0.261,0.236
        c0.545,0.56,0.785,1.22,0.533,1.477c-0.251,0.256-0.897,0.013-1.443-0.544c-0.089-0.093-0.17-0.186-0.242-0.279
        c-0.23,0.388-0.364,0.845-0.364,1.335c0,0.466,0.123,0.907,0.336,1.285C18.668,3.77,18.741,3.683,18.824,3.601z"/>
    
    </svg>
    </div>
    `;
    this.main.innerHTML += kings;
  }

  //Calculate pawn movement
  calculatePossiblePawnMovement(piece) {
    const possiblePawnMovements =
      piece.dataset.color === 'black' ? [-10, -20] : [10, 20];
    const occupiedPawnMovements = [];
    const allowablePieceMovement = [];
    const pieceCoordinate = piece.dataset.position * 1;

    if (
      piece.dataset.piece === 'pawn' &&
      piece.dataset.unique === this.activePiece
    ) {
      // Check if it is first movement
      if (
        possiblePawnMovements.length > 1 &&
        piece.dataset.firstmove === 'false'
      ) {
        possiblePawnMovements.pop();
      }
      // Upade possible pawn movement
      possiblePawnMovements.forEach((movement) => {
        possiblePawnMovements[possiblePawnMovements.indexOf(movement)] =
          piece.dataset.position * 1 + movement;
      });

      // Check which position has been occupuied
      possiblePawnMovements.forEach((movement) => {
        document.querySelectorAll('.piece').forEach((piece1) => {
          if (
            movement == piece1.dataset.position &&
            piece.dataset.color == piece1.dataset.color
          ) {
            occupiedPawnMovements.push(movement);
          }
        });
      });

      // Update which position Pawncan move
      possiblePawnMovements.forEach((movement) => {
        if (!occupiedPawnMovements.includes(movement)) {
          allowablePieceMovement.push(movement);
        }
      });
    }

    return allowablePieceMovement;
  }

  // Pawn movement
  //TODO: pawn turn to queen,rook or bishop after reaching other end
  pawnMovement(piece, tile) {
    if (
      piece.dataset.piece === 'pawn' &&
      piece.dataset.unique === this.activePiece
    ) {
      let wrongInput = true;
      const tileCoordinate = tile.dataset.position * 1;
      let allowablePieceMovement = this.calculatePossiblePawnMovement(piece);
      if (allowablePieceMovement.length > 0) {
        allowablePieceMovement.forEach((movement) => {
          if (tile.dataset.position == movement) {
            wrongInput = false;
            const tileCoordinate = tile.dataset.position;
            piece.style.gridArea = 'p' + tileCoordinate;
            piece.dataset.position = tile.dataset.position;
            piece.style.backgroundColor = '';
            this.activePiece = undefined;
            if (piece.dataset.firstmove === 'true') {
              piece.dataset.firstmove = false;
            }
            this.move === 'white'
              ? (this.move = 'black')
              : (this.move = 'white');
          }
        });
      }
      if (wrongInput) {
        this.wrongInput(piece);
      }
    }
  }

  calculatePossiblePawnCapture(piece) {
    const possiblePawnCapture =
      piece.dataset.color === 'black' ? [-11, -9] : [11, 9];

    const updatedPossiblePawnCapture = [];

    const pieceCoordinate = piece.dataset.position * 1;

    if (piece.dataset.piece === 'pawn') {
      possiblePawnCapture.forEach((movement) => {
        if (
          `${pieceCoordinate + movement}`[1] != 0 &&
          `${pieceCoordinate + movement}`[1] != 9
        ) {
          updatedPossiblePawnCapture.push(pieceCoordinate + movement);
        }
      });
    }
    return updatedPossiblePawnCapture;
  }
  // Pawn capture
  pawnCapture(oldpiece, piece) {
    if (oldpiece.dataset.piece === 'pawn') {
      // let wrongInput = true;
      const oldpieceCoordinate = oldpiece.dataset.position * 1;
      const pieceCoordinate = piece.dataset.position * 1;
      const allowablePieceMovement =
        this.calculatePossiblePawnCapture(oldpiece);
      allowablePieceMovement.forEach((movement) => {
        if (movement == pieceCoordinate) {
          // wrongInput = false;
          oldpiece.dataset.position = piece.dataset.position;
          oldpiece.style.gridArea = 'p' + piece.dataset.position;
          piece.remove();
          this.activePiece = undefined;
          this.move === 'white' ? (this.move = 'black') : (this.move = 'white');
        }
      });
      // if (wrongInput) {
      //   this.wrongInput(piece);
      // }
    }
  }

  //Calculate knight movement
  calculatePossibleKnightMovement(piece) {
    let possibleKnightMovements = [-21, -19, -12, -8, 8, 12, 19, 21];
    const updatedPossibleKnightMovement = [];
    const pieceCoordinate = piece.dataset.position * 1; // Update which position Pawncan move
    if (piece.dataset.piece === 'knight') {
      // Upade possible knight movement
      possibleKnightMovements.forEach((movement) => {
        if (
          piece.dataset.position * 1 + movement > 10 &&
          piece.dataset.position * 1 + movement < 89 &&
          `${pieceCoordinate + movement}`[1] != 0 &&
          `${pieceCoordinate + movement}`[1] != 9
        ) {
          updatedPossibleKnightMovement.push(
            piece.dataset.position * 1 + movement
          );
        }
      });

      document.querySelectorAll('.piece').forEach((piece1) => {
        const position = piece1.dataset.position * 1;
        if (updatedPossibleKnightMovement.includes(position)) {
          if (piece1.dataset.color === piece.dataset.color) {
            updatedPossibleKnightMovement.splice(
              updatedPossibleKnightMovement.indexOf(position),
              1
            );
          }
        }
      });
    }
    return updatedPossibleKnightMovement;
  }
  // Knight movement
  knightMovement(piece, tile) {
    if (
      piece.dataset.piece === 'knight' &&
      piece.dataset.unique === this.activePiece
    ) {
      let wrongInput = true;
      const tileCoordinate = tile.dataset.position * 1;
      let allowablePieceMovement = this.calculatePossibleKnightMovement(piece);
      if (allowablePieceMovement.length > 0) {
        allowablePieceMovement.forEach((movement) => {
          if (tile.dataset.position == movement) {
            wrongInput = false;
            const tileCoordinate = tile.dataset.position;
            piece.style.gridArea = 'p' + tileCoordinate;
            piece.dataset.position = tile.dataset.position;
            piece.style.backgroundColor = '';
            this.activePiece = undefined;
            this.move === 'white'
              ? (this.move = 'black')
              : (this.move = 'white');
          }
        });
      }
      if (wrongInput) {
        this.wrongInput(piece);
      }
    }
  }
  // Knight capture
  knightCapture(oldpiece, piece) {
    if (oldpiece.dataset.piece === 'knight') {
      // let wrongInput = true;
      const oldpieceCoordinate = oldpiece.dataset.position * 1;
      const pieceCoordinate = piece.dataset.position * 1;

      const allowablePieceMovement =
        this.calculatePossibleKnightMovement(oldpiece);
      allowablePieceMovement.forEach((movement) => {
        if (movement == pieceCoordinate) {
          // wrongInput = false;
          oldpiece.dataset.position = piece.dataset.position;
          oldpiece.style.gridArea = 'p' + piece.dataset.position;
          piece.remove();
          this.activePiece = undefined;
          this.move === 'white' ? (this.move = 'black') : (this.move = 'white');
        }
      });
    }
    // if (wrongInput) {
    //   this.wrongInput(piece);
    // }
  }

  // Rook movement
  rookMovement(piece, tile) {
    if (
      piece.dataset.piece === 'rook' &&
      piece.dataset.unique === this.activePiece
    ) {
      let wrongInput = true;
      const tileCoordinate = tile.dataset.position * 1;
      let allowablePieceMovement = this.calculatePossibleRookMovement(piece);
      if (allowablePieceMovement.length > 0) {
        allowablePieceMovement.forEach((movement) => {
          if (tile.dataset.position == movement) {
            wrongInput = false;
            const tileCoordinate = tile.dataset.position;
            piece.style.gridArea = 'p' + tileCoordinate;
            piece.dataset.position = tile.dataset.position;
            piece.style.backgroundColor = '';
            this.activePiece = undefined;
            this.move === 'white'
              ? (this.move = 'black')
              : (this.move = 'white');
          }
        });
      }
      if (wrongInput) {
        this.wrongInput(piece);
      }
    }
  }

  // Calculate all the movement a rook can go
  calculatePossibleRookMovement(piece) {
    const allMovement = [];
    let pieces = [];
    document.querySelectorAll('.piece').forEach((piece1) => {
      pieces.push(piece1);
    });
    if (piece.dataset.piece == 'rook' || piece.dataset.piece == 'queen') {
      pieces.sort((a, b) => b.dataset.position * 1 - a.dataset.position * 1);
      let shouldYpositiveBreak = false;
      for (let i = 1; i < 9; i++) {
        if (piece.dataset.position * 1 - i * 10 < 11) break;
        for (let j = 0; j < pieces.length; j++) {
          if (
            piece.dataset.position * 1 - i * 10 ==
            pieces[j].dataset.position
          ) {
            shouldYpositiveBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 - i * 10);
              break;
            }
          }
        }
        if (shouldYpositiveBreak) break;
        allMovement.push(piece.dataset.position * 1 - i * 10);
      }

      let shouldXpositiveBreak = false;
      for (let i = 1; i < 9; i++) {
        if (this.outsideElement.includes(piece.dataset.position * 1 + i)) break;
        for (let j = 0; j < pieces.length; j++) {
          if (piece.dataset.position * 1 + i == pieces[j].dataset.position) {
            shouldXpositiveBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 + i);
              break;
            }
          }
        }
        if (shouldXpositiveBreak) break;
        allMovement.push(piece.dataset.position * 1 + i);
      }
      pieces = pieces.reverse();
      let shouldYnegativeBreak = false;
      for (let i = 1; i < 9; i++) {
        if (piece.dataset.position * 1 + i * 10 > 88) break;
        for (let j = 0; j < pieces.length; j++) {
          if (
            piece.dataset.position * 1 + i * 10 ==
            pieces[j].dataset.position
          ) {
            shouldYnegativeBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 + i * 10);
              break;
            }
          }
        }
        if (shouldYnegativeBreak) break;
        allMovement.push(piece.dataset.position * 1 + i * 10);
      }
      let shouldXnegativeBreak = false;
      for (let i = 1; i < 9; i++) {
        if (this.outsideElement.includes(piece.dataset.position * 1 - i)) break;
        for (let j = 0; j < pieces.length; j++) {
          if (piece.dataset.position * 1 - i == pieces[j].dataset.position) {
            shouldXnegativeBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 - i);
              break;
            }
          }
        }
        if (shouldXnegativeBreak) break;
        allMovement.push(piece.dataset.position * 1 - i);
      }
    }
    return allMovement;
  }

  // Rook capture
  rookCapture(oldpiece, piece) {
    if (oldpiece.dataset.piece === 'rook') {
      // let wrongInput = true;
      const oldpieceCoordinate = oldpiece.dataset.position * 1;
      const pieceCoordinate = piece.dataset.position * 1;

      const allowablePieceMovement =
        this.calculatePossibleRookMovement(oldpiece);
      allowablePieceMovement.forEach((movement) => {
        // wrongInput = false;
        if (movement == pieceCoordinate) {
          oldpiece.dataset.position = piece.dataset.position;
          oldpiece.style.gridArea = 'p' + piece.dataset.position;
          piece.remove();
          this.activePiece = undefined;
          this.move === 'white' ? (this.move = 'black') : (this.move = 'white');
        }
      });
    }
    // if (wrongInput) {
    //   this.wrongInput(piece);
    // }
  }

  // Calculate all the movement a bishop can go
  calculatePossibleBishopMovement(piece) {
    const allMovement = [];
    let pieces = [];
    document.querySelectorAll('.piece').forEach((piece1) => {
      pieces.push(piece1);
    });
    if (piece.dataset.piece == 'bishop' || piece.dataset.piece == 'queen') {
      pieces.sort((a, b) => b.dataset.position * 1 - a.dataset.position * 1);
      let shouldYpositiveBreak = false;
      for (let i = 1; i < 9; i++) {
        if (
          piece.dataset.position * 1 - i * 11 < 11 ||
          this.outsideElement.includes(piece.dataset.position * 1 - i * 11)
        )
          break;
        for (let j = 0; j < pieces.length; j++) {
          if (
            piece.dataset.position * 1 - i * 11 ==
            pieces[j].dataset.position
          ) {
            shouldYpositiveBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 - i * 11);
              break;
            }
          }
        }
        if (shouldYpositiveBreak) break;
        allMovement.push(piece.dataset.position * 1 - i * 11);
      }

      let shouldXpositiveBreak = false;
      for (let i = 1; i < 9; i++) {
        if (
          piece.dataset.position * 1 - i * 9 < 11 ||
          this.outsideElement.includes(piece.dataset.position * 1 - i * 9)
        )
          break;
        for (let j = 0; j < pieces.length; j++) {
          if (
            piece.dataset.position * 1 - i * 9 ==
            pieces[j].dataset.position
          ) {
            shouldXpositiveBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 - i * 9);
              break;
            }
          }
        }
        if (shouldXpositiveBreak) break;
        allMovement.push(piece.dataset.position * 1 - i * 9);
      }

      pieces = pieces.reverse();

      let shouldYnegativeBreak = false;
      for (let i = 1; i < 9; i++) {
        if (
          piece.dataset.position * 1 + i * 11 > 88 ||
          this.outsideElement.includes(piece.dataset.position * 1 + i * 11)
        )
          break;
        for (let j = 0; j < pieces.length; j++) {
          if (
            piece.dataset.position * 1 + i * 11 ==
            pieces[j].dataset.position
          ) {
            shouldYnegativeBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 + i * 11);
              break;
            }
          }
        }
        if (shouldYnegativeBreak) break;
        allMovement.push(piece.dataset.position * 1 + i * 11);
      }

      let shouldXnegativeBreak = false;
      for (let i = 1; i < 9; i++) {
        if (
          piece.dataset.position * 1 + i * 9 > 88 ||
          this.outsideElement.includes(piece.dataset.position * 1 + i * 9)
        )
          break;
        for (let j = 0; j < pieces.length; j++) {
          if (
            piece.dataset.position * 1 + i * 9 ==
            pieces[j].dataset.position
          ) {
            shouldXnegativeBreak = true;
            if (pieces[j].dataset.color == piece.dataset.color) break;
            if (pieces[j].dataset.color != piece.dataset.color) {
              allMovement.push(piece.dataset.position * 1 + i * 9);
              break;
            }
          }
        }
        if (shouldXnegativeBreak) break;
        allMovement.push(piece.dataset.position * 1 + i * 9);
      }
    }
    return allMovement;
  }

  // Bishop movement
  // Added queen since it have similar movement
  bishopMovement(piece, tile) {
    if (
      piece.dataset.piece === 'bishop' &&
      piece.dataset.unique === this.activePiece
    ) {
      let wrongInput = true;
      const tileCoordinate = tile.dataset.position * 1;
      let allowablePieceMovement = this.calculatePossibleBishopMovement(piece);
      if (allowablePieceMovement.length > 0) {
        allowablePieceMovement.forEach((movement) => {
          if (tile.dataset.position == movement) {
            wrongInput = false;
            const tileCoordinate = tile.dataset.position;
            piece.style.gridArea = 'p' + tileCoordinate;
            piece.dataset.position = tile.dataset.position;
            piece.style.backgroundColor = '';
            this.activePiece = undefined;
            this.move === 'white'
              ? (this.move = 'black')
              : (this.move = 'white');
          }
        });
      }
      if (wrongInput) {
        this.wrongInput(piece);
      }
    }
  }

  // Bishop Capture
  bishopCapture(oldpiece, piece) {
    if (oldpiece.dataset.piece === 'bishop') {
      // let wrongInput = true;
      const oldpieceCoordinate = oldpiece.dataset.position * 1;
      const pieceCoordinate = piece.dataset.position * 1;

      const allowablePieceMovement =
        this.calculatePossibleBishopMovement(oldpiece);
      allowablePieceMovement.forEach((movement) => {
        if (movement == pieceCoordinate) {
          // wrongInput = false;
          oldpiece.dataset.position = piece.dataset.position;
          oldpiece.style.gridArea = 'p' + piece.dataset.position;
          piece.remove();
          this.activePiece = undefined;
          this.move === 'white' ? (this.move = 'black') : (this.move = 'white');
        }
      });
    }
    // if (wrongInput) {
    //   this.wrongInput(piece);
    // }
  }

  // Queen movement
  queenMovement(piece, tile) {
    if (
      piece.dataset.piece === 'queen' &&
      piece.dataset.unique === this.activePiece
    ) {
      let wrongInput = true;
      const tileCoordinate = tile.dataset.position * 1;
      let allowablePieceMovement = [
        ...this.calculatePossibleBishopMovement(piece),
        ...this.calculatePossibleRookMovement(piece),
      ];
      if (allowablePieceMovement.length > 0) {
        allowablePieceMovement.forEach((movement) => {
          if (tile.dataset.position == movement) {
            wrongInput = false;
            const tileCoordinate = tile.dataset.position;
            piece.style.gridArea = 'p' + tileCoordinate;
            piece.dataset.position = tile.dataset.position;
            piece.style.backgroundColor = '';
            this.activePiece = undefined;
            this.move === 'white'
              ? (this.move = 'black')
              : (this.move = 'white');
          }
        });
      }
      if (wrongInput) {
        this.wrongInput(piece);
      }
    }
  }
  // Queen Capture
  queenCapture(oldpiece, piece) {
    if (oldpiece.dataset.piece === 'queen') {
      // let wrongInput = true;
      const oldpieceCoordinate = oldpiece.dataset.position * 1;
      const pieceCoordinate = piece.dataset.position * 1;

      const allowablePieceMovement = [
        ...this.calculatePossibleRookMovement(oldpiece),
        ...this.calculatePossibleBishopMovement(oldpiece),
      ];

      allowablePieceMovement.forEach((movement) => {
        if (movement == pieceCoordinate) {
          // wrongInput = false;
          oldpiece.dataset.position = piece.dataset.position;
          oldpiece.style.gridArea = 'p' + piece.dataset.position;
          piece.remove();
          this.activePiece = undefined;
          this.move === 'white' ? (this.move = 'black') : (this.move = 'white');
        }
      });
    }
    // if (wrongInput) {
    //   this.wrongInput(piece);
    // }
  }

  // King Movement
  kingMovement(piece, tile) {
    if (
      piece.dataset.piece === 'king' &&
      piece.dataset.unique === this.activePiece
    ) {
      let wrongInput = true;
      const tileCoordinate = tile.dataset.position * 1;
      let allowablePieceMovement = this.calculatePossibleKingMovement(piece);
      if (allowablePieceMovement.length > 0) {
        allowablePieceMovement.forEach((movement) => {
          if (tile.dataset.position == movement) {
            wrongInput = false;
            const tileCoordinate = tile.dataset.position;
            piece.style.gridArea = 'p' + tileCoordinate;
            piece.dataset.position = tile.dataset.position;
            piece.style.backgroundColor = '';
            this.activePiece = undefined;
            this.kingPosition[piece.dataset.color] = tile.dataset.position * 1;
            this.move === 'white'
              ? (this.move = 'black')
              : (this.move = 'white');
          }
        });
      }
      if (wrongInput) {
        this.wrongInput(piece);
      }
    }
  }

  // Calculate king movement
  calculatePossibleKingMovement(piece) {
    const possibleKingMovements = [-9, -10, -11, -1, 1, 9, 10, 11];
    const occupiedKingMovements = [];
    let i = 0;
    const pieceCoordinate = piece.dataset.position * 1;
    let allowablePieceMovement = [];
    if (piece.dataset.piece === 'king') {
      // Update King movement
      possibleKingMovements.forEach((movement) => {
        possibleKingMovements[i] = movement + pieceCoordinate;
        i++;
      });
      // Check which position has been occupuied
      possibleKingMovements.forEach((movement) => {
        document.querySelectorAll('.piece').forEach((piece1) => {
          if (
            movement == piece1.dataset.position &&
            piece.dataset.color == piece1.dataset.color
          ) {
            occupiedKingMovements.push(movement);
          }
        });
      });

      // Update which position king can move
      possibleKingMovements.forEach((movement) => {
        if (
          !occupiedKingMovements.includes(movement) &&
          movement > 10 &&
          movement < 89 &&
          `${movement}`[1] != 0 &&
          `${movement}`[1] != 9
        ) {
          allowablePieceMovement.push(movement);
        }
      });
    }
    return allowablePieceMovement;
  }

  // King capture
  // TODO: checkmake
  // TODO: stalemake
  kingCapture(oldpiece, piece) {
    if (oldpiece.dataset.piece === 'king') {
      // let wrongInput = true;
      const oldpieceCoordinate = oldpiece.dataset.position * 1;
      const pieceCoordinate = piece.dataset.position * 1;

      const allowablePieceMovement =
        this.calculatePossibleBishopMovement(oldpiece);
      allowablePieceMovement.forEach((movement) => {
        if (movement == pieceCoordinate) {
          // wrongInput = false;
          oldpiece.dataset.position = piece.dataset.position;
          oldpiece.style.gridArea = 'p' + piece.dataset.position;
          piece.remove();
          this.activePiece = undefined;
          this.kingPosition[piece.dataset.color] = tile.dataset.position * 1;
          this.move === 'white' ? (this.move = 'black') : (this.move = 'white');
        }
      });
    }
    // if (wrongInput) {
    //   this.wrongInput(piece);
    // }
  }

  calculateSpecificMovement(color) {
    let allOpponetMovement = [];
    document.querySelectorAll('.piece').forEach((piece) => {
      if (piece.dataset.color !== data.dataset.color) {
        allOpponetMovement = [
          ...allOpponetMovement,
          ...this.calculatePossiblePawnCapture(piece),
          ...this.calculatePossibleRookMovement(piece),
          ...this.calculatePossibleKnightMovement(piece),
          // ...this.calculatePossibleBishopMovement(piece),
          ...this.calculatePossibleKingMovement(piece),
        ];
      }
    });
    return allOpponetMovement;
  }
  calculateAllMovement(color) {
    let allOpponetMovement = [];
    document.querySelectorAll('.piece').forEach((piece) => {
      if (piece.dataset.color === color) {
        allOpponetMovement = [
          ...allOpponetMovement,
          ...this.calculatePossiblePawnCapture(piece),
          ...this.calculatePossibleRookMovement(piece),
          ...this.calculatePossibleKnightMovement(piece),
          // ...this.calculatePossibleBishopMovement(piece),
          ...this.calculatePossibleKingMovement(piece),
        ];
      }
    });
    return allOpponetMovement;
  }
  wrongInput(piece) {
    piece.classList.add('wrong-input');
    setTimeout(() => {
      piece.classList.remove('wrong-input');
    }, 600);
  }
  checkIfPieceOnCheckmateMovement(tile) {
    // Check if piece king is on check
    document.querySelectorAll('.piece').forEach((piece) => {
      if (piece.dataset.unique === this.activePiece) {
        const opponentColor =
          piece.dataset.color === 'black' ? 'white' : 'black';
        const allOpponetMovement = this.calculateAllMovement(opponentColor);
        if (
          allOpponetMovement.includes(this.kingPosition[piece.dataset.color])
        ) {
          const pieceOriginalPosition = piece.dataset.position;
          piece.dataset.position = tile.dataset.position;
          const newMovement = this.calculateAllMovement(opponentColor);

          if (!newMovement.includes(this.kingPosition[piece.dataset.color])) {
            piece.dataset.position = pieceOriginalPosition;
          } else {
            piece.dataset.position = pieceOriginalPosition;
            this.wrongInput(piece);
            return;
          }
        }
      }
      if (piece.dataset.color === this.move) {
        this.pawnMovement(piece, tile);
        this.knightMovement(piece, tile);
        this.rookMovement(piece, tile);
        this.bishopMovement(piece, tile);
        this.queenMovement(piece, tile);
        this.kingMovement(piece, tile);
      }

      const opponentColor = piece.dataset.color === 'black' ? 'white' : 'black';
      const allMyMovement = this.calculateAllMovement(piece.dataset.color);
      if (allMyMovement.includes(this.kingPosition[opponentColor])) {
        document.querySelectorAll('.piece').forEach((piece2) => {
          if (piece2.dataset.position == this.kingPosition[opponentColor]) {
            piece2.classList.add('check');
          }
        });
      } else {
        document.querySelectorAll('.piece').forEach((piece2) => {
          if (piece2.dataset.position == this.kingPosition[opponentColor]) {
            piece2.classList.remove('check');
          }
        });
      }
    });
  }
  checkIfPieceOnCheckmateCapture(piece) {
    // Check if piece king is on check
    document.querySelectorAll('.piece').forEach((oldpiece) => {
      if (
        oldpiece.dataset.unique === this.activePiece &&
        oldpiece.dataset.color !== piece.dataset.color
      ) {
        const opponentColor =
          oldpiece.dataset.color === 'black' ? 'white' : 'black';
        const allOpponetMovement = this.calculateAllMovement(opponentColor);
        if (
          allOpponetMovement.includes(this.kingPosition[oldpiece.dataset.color])
        ) {
          const oldpieceOriginalPosition = oldpiece.dataset.position;
          oldpiece.dataset.position = piece.dataset.position;
          const newpieceOriginalPosition = piece.dataset.position;
          piece.dataset.position = 'nothing';

          const newMovement = this.calculateAllMovement(opponentColor);
          if (
            !newMovement.includes(this.kingPosition[oldpiece.dataset.color])
          ) {
            oldpiece.dataset.position = oldpieceOriginalPosition;
            piece.dataset.position = newpieceOriginalPosition;
          } else {
            oldpiece.dataset.position = oldpieceOriginalPosition;
            piece.dataset.position = newpieceOriginalPosition;
            this.wrongInput(oldpiece);
            return;
          }
        }

        this.pawnCapture(oldpiece, piece);
        this.knightCapture(oldpiece, piece);
        this.rookCapture(oldpiece, piece);
        this.queenCapture(oldpiece, piece);
        this.kingCapture(oldpiece, piece);

        const allMyMovement = this.calculateAllMovement(oldpiece.dataset.color);
        if (allMyMovement.includes(this.kingPosition[opponentColor])) {
          document.querySelectorAll('.piece').forEach((piece2) => {
            if (piece2.dataset.position == this.kingPosition[opponentColor]) {
              piece2.classList.add('check');
            }
          });
        } else {
          document.querySelectorAll('.piece').forEach((piece2) => {
            if (piece2.dataset.position == this.kingPosition[opponentColor]) {
              piece2.classList.remove('check');
            }
          });
        }
      }
    });
  }

  removePiece(arr, num) {
    const allowed = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == num) break;
      allowed.push(arr[i]);
    }
    return allowed;
  }

  removeOpponentPiece(arr, num) {
    const allowed = [];
    for (let i = 0; i < arr.length; i++) {
      allowed.push(arr[i]);
      if (arr[i] == num) break;
    }
    return allowed;
  }
}

const chess = new InternationalChess();

//TODO; Add shake to wrong capture
//TODO: Vibrate device on wrong input
