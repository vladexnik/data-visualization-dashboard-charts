export const WIDTH = 1000;
export const HEIGHT = 400;
export const PAD = 80; // padding
export const DPI_WIDTH = WIDTH * 1;
export const DPI_HEIGHT = HEIGHT * 1;
export let ROWS_COUNT = 10;

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const randomColor = () => {
  return '#' + Math.random().toString(16).slice(2, 8);
};

// export function updateContent(userInput, postInput, updateBtn, resetBtn) {
//   updateBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     canvasPieChart.classList.remove('canvas__update');
//     userInput = userInputPie.value;
//     postInput = postInputPie.value;
//     createPieChart(posts, users, userInput, postInput);
//     canvasPieChart.classList.add('canvas__update');
//   });

//   resetBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     canvasPieChart.classList.remove('canvas__update');
//     userInputPie.value = '';
//     postInputPie.value = '';
//     createPieChart(posts, users, userInputPie.value, postInputPie.value);
//     canvasPieChart.classList.add('canvas__update');
//   });
// }
