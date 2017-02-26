(function() {
  let colorsUsed = {};
  function getNewRandomColor() {
    let newColor = '';
    do {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      newColor = `${r},${g},${b}`;
    } while (colorsUsed[newColor] == true);

    return newColor;
  }

  let body = document.getElementsByTagName('body')[0];
  function changeColor() {
    let newColor = getNewRandomColor();
    body.style.backgroundColor = `rgb(${newColor})`;
    colorsUsed[newColor] = true;

    if(Object.keys(colorsUsed).length < 10) {
      setTimeout(changeColor, 1000);
    }
  }
  changeColor();
})();
