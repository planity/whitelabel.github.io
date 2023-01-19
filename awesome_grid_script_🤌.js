const wrapper = document.getElementById("background");

let columns = 0;
let rows = 0;

const createTile = (index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    const x = (index % columns)
    const y =  Math.floor(index / columns)
    const delay = (x+y) * 50 + 0;
    tile.style.setProperty("--delay", `${delay}ms`)
    return tile;
};

const createTiles = quantity => {
    Array.from(Array(quantity)).forEach((_, index) => {
        wrapper.appendChild(createTile(index));
    });
};

const createGrid = () => {
    wrapper.innerHTML = "";

    const size = 50;

    columns = Math.floor(document.body.clientWidth / size);
    rows = Math.floor(document.body.clientHeight / size);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
};

createGrid();

let timeout;
window.onresize = function() {
    clearTimeout(timeout);
    timeout = setTimeout(createGrid, 100);
};
