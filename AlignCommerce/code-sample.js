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

  /*
   * @param {number} frequency: frequency of color change (in milliseconds)
   * @param {number} cycles: total number of times that the color should change 
   */
  function changeColor(frequency, cycles) {
    // Default to 1s frequency and 10 cycles
    frequency = frequency || 1000;
    cycles = cycles || 10;
    
    // Change background color
    let newColor = getNewRandomColor();
    body.style.backgroundColor = `rgb(${newColor})`;
    colorsUsed[newColor] = true;

    if(Object.keys(colorsUsed).length < 10) {
      setTimeout(() => {
        changeColor(frequency, cycles);
      }, 1000);
    }
  }
  changeColor();
  // changeColor(500);
  // changeColor(1000, 25);
})();
