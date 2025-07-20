/**
 * Функция для анализа матрицы 3x4 по описанному правилу
 * @param {number[][]} matrix - матрица 3x4
 * @returns {number[]} - аккумулятор с подходящими результатами
 */
function collectSpecialSumsAndDiffs(matrix) {
  const acc = [];
  // Преобразуем матрицу в плоский массив
  const flat = matrix.flat();
  for (let i = 0; i < flat.length; i++) {
    for (let j = 0; j < flat.length; j++) {
      if (i === j) continue;
      const sum = Math.abs(flat[i] + flat[j]);
      const diff = Math.abs(flat[i] - flat[j]);
      // Проверяем сумму
      if (sum % 10 === 0 || sum % 10 === 5) {
        acc.push(sum);
      }
      // Проверяем разность
      if (diff % 10 === 0 || diff === 5) {
        acc.push(diff);
      }
    }
  }
  return acc.reduce((ac, c) => ac + c, 0) / 20;
}

/**
 * Функция для анализа строк 1-3 и 2-4 матрицы 4x3 по описанному правилу
 * @param {number[][]} matrix - матрица 4x3
 * @returns {number} - количество подходящих случаев
 */
function countSpecialPairsInRows_4x3(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4 || matrix.some(row => row.length !== 3)) {
    throw new Error('Ожидается матрица 4x3');
  }
  let count = 0;
  let acc = [];
  // 1-я и 3-я строки (индексы 0 и 2)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[0][i] === matrix[2][j]) continue;
      const sum = matrix[0][i] + matrix[2][j];
      const diff = matrix[0][i] - matrix[2][j];
      if (Math.abs(sum) % 10 === 0 || Math.abs(sum) % 10 === 5) {
        count++;
        continue;
      }
      if (Math.abs(diff) % 10 === 0 || Math.abs(diff) % 10 === 5) {
        count++;
      }
    }
  }
  // 2-я и 4-я строки (индексы 1 и 3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[1][i] === matrix[3][j]) continue;
      const sum = matrix[1][i] + matrix[3][j];
      const diff = matrix[1][i] - matrix[3][j];
      if (Math.abs(sum) % 10 === 0 || Math.abs(sum) % 10 === 5) {
        count++, (acc[count] = [matrix[1][i], matrix[3][j]]);
        continue;
      }
      if (Math.abs(diff) % 10 === 0 || Math.abs(diff) % 10 === 5) {
        count++, (acc[count] = [matrix[1][i], matrix[3][j]]);
      }
    }
  }
  return count;
}

function calculate() {
  const cells = document.querySelectorAll('td > input');
  M = [
    [+cells[0]?.value ?? 0, +cells[1]?.value ?? 0, +cells[2]?.value ?? 0],
    [+cells[3]?.value ?? 0, +cells[4]?.value ?? 0, +cells[5]?.value ?? 0],
    [+cells[6]?.value ?? 0, +cells[7]?.value ?? 0, +cells[8]?.value ?? 0],
    [+cells[9]?.value ?? 0, +cells[10]?.value ?? 0, +cells[11]?.value ?? 0]
  ];

  const res = [collectSpecialSumsAndDiffs(M), countSpecialPairsInRows_4x3(M)];
  document.querySelector('#r1').value = res[0];
  document.querySelector('#r2').value = res[1];
}

function clear() {
  const cells = document.querySelectorAll('td > input');
  cells.forEach(el => (el.value = ''));
}

const btn = document.getElementsByTagName('button');
btn[0].onclick = calculate;
btn[1].onclick = clear;
