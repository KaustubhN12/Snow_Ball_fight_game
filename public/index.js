const mapImage = new Image();
mapImage.src = "./snowy-sheet.png";
const canvasEl = document.getElementById("canvas");
canvasEl.width = window.innerWidth;
canvasEl.heigth = window.innerHeight;
const canvas = canvasEl.getContext("2d");
const socket = io(`ws://localhost:8080`);

let map = [[]];

const TILE_SIZE = 16;

socket.on("connect", () => {
  console.log("connected");
});

socket.on("map", (lodedMap) => {
  map = lodedMap;
});

function loop() {
  canvas.clearRect(0, 0, canvas.width, canvas.heigth);

  const TILES_IN_ROW = 8;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      const { id } = map[row][col];
      const imageRow = parseInt(id / TILES_IN_ROW);
      const imageCol = id % TILES_IN_ROW;
      canvas.drawImage(
        mapImage,
        imageCol * TILE_SIZE,
        imageRow * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE,
        col * TILE_SIZE,
        row * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }

  canvas.fillStyle = "#ff0000";
  canvas.fillRect(0, 0, 10, 10);
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
