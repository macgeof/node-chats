// function diagonalDifference(arr) {
//     let count = arr.length;
//     let forwardDiagonalSum = 0;
//     let reverseDiagonalSum = 0;
//     for (let rowIndex = 0; rowIndex < count; rowIndex++)
//     {
//         let row = arr[rowIndex];
//         console.log(row);
//         let reverseIndex = count - rowIndex - 1;
//         forwardDiagonalSum += row[rowIndex];
//         reverseDiagonalSum += row[reverseIndex];
//     }
//     console.log(forwardDiagonalSum, reverseDiagonalSum);
//     return Math.abs(forwardDiagonalSum - reverseDiagonalSum);
// }
//
// let data = [[11,2,4],[4,5,6],[10,8,-12]];
// console.log(diagonalDifference(data));


// function plusMinus(arr) {
//   let count = arr.length;
//   let source = arr;
//   let positives = 0, negatives = 0, zeroes = 0;
//   for (let index = 0; index < count; index++) {
//     let value = source[index];
//     if (value == 0) {
//       zeroes++;
//     }
//     else if (value > 0) {
//       positives++;
//     }
//     else {
//       negatives++;
//     }
//   }
//   return [positives/count, negatives/count, zeroes/count];
// }
//
// let data = [-4,3,-9,0,4,1];
// console.log(plusMinus(data));


function staircase(n) {
  n = Math.min(++n, 100);
  for (let i = 0; i < n; i++) {
    let arr = [' ',' ',' ',' ',' ',' '];
    for (let j = n - i; j <= n; j++) {
      arr[j - 1] = '#';
    }
    console.log(arr.join(''));
  }
}

staircase(0);
