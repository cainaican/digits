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

/**
 * Функция для подсчета суммы чисел 1 и 3 строк и 2 и 4 строк матрицы 4x3
 * @param {number[][]} matrix - матрица 4x3
 * @returns {[number, number]} - [сумма 1 и 3 строк, сумма 2 и 4 строк]
 */
function sumRows_4x3(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4 || matrix.some(row => row.length !== 3)) {
    throw new Error('Ожидается матрица 4x3');
  }
  const sum13 = matrix[0].reduce((a, b) => a + b, 0) + matrix[2].reduce((a, b) => a + b, 0);
  const sum24 = matrix[1].reduce((a, b) => a + b, 0) + matrix[3].reduce((a, b) => a + b, 0);
  return [sum13, sum24];
}

/**
 * Функция для поиска строк с 0 или числом, кратным 5, и подсчета комбинаций по описанному алгоритму
 * Если в строке несколько таких чисел, расчёты делаются для каждого
 * @param {number[][]} matrix - матрица 4x3
 * @returns {number} - сумма подходящих комбинаций
 */
function specialCombinations_4x3(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4 || matrix.some(row => row.length !== 3)) {
    throw new Error('Ожидается матрица 4x3');
  }
  let totalCount = 0;
  // Для каждой строки ищем все 0 или кратные 5
  for (let i = 0; i < 4; i++) {
    const row = matrix[i];
    // Индексы всех чисел 0 или кратных 5
    const foundIdxs = row.map((x, idx) => (x === 0 || x % 5 === 0 ? idx : -1)).filter(idx => idx !== -1);
    if (foundIdxs.length === 0) continue;
    for (const foundIdx of foundIdxs) {
      // 1. Берем найденную строку (без этого числа) и строку через одну
      const filteredRow = row.filter((x, idx) => idx !== foundIdx);
      const throughIdx = (i + 2) % 4;
      const throughRow = matrix[throughIdx];
      totalCount += countPairsEndsWith5or0(filteredRow, throughRow);
      // 2. Берем соседнюю строку и ту же строку через одну
      const neighborIdx = i % 2 === 0 ? i + 1 : i - 1;

      if (neighborIdx < 0 || neighborIdx > 3) continue;
      const neighborRow = matrix[neighborIdx];
      totalCount += countPairsEndsWith5or0(neighborRow, throughRow);
    }
  }
  return totalCount;
}

/**
 * Вспомогательная функция для подсчета количества пар, сумма или разность которых оканчивается на 5 или 0
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number}
 */
function countPairsEndsWith5or0(arr1, arr2) {
  let count = 0;
  for (let a of arr1) {
    for (let b of arr2) {
      const sum = a + b;
      const diff = a - b;

      if (sum !== 0 && Math.abs(sum) % 5 === 0) count++;
      else if (diff !== 0 && Math.abs(diff) % 5 === 0) count++;
    }
  }
  return count;
}

/**
 * Функция для поиска во 2-й и 3-й строке строки, все числа которой принадлежат одной из трех групп,
 * делит матрицу на 2 группы, и считает количество комбинаций, где сумма или разность чисел из разных групп кратна 5
 * @param {number[][]} matrix - матрица 4x3
 * @returns {number} - количество подходящих комбинаций
 */
function groupCombinations_4x3(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4 || matrix.some(row => row.length !== 3)) {
    throw new Error('Ожидается матрица 4x3');
  }
  // Проверяем 2-ю и 3-ю строки по новому правилу
  for (let rowIdx of [1, 2]) {
    const row = matrix[rowIdx];
    let allPairsOk = true;
    for (let i = 0; i < row.length; i++) {
      for (let j = 0; j < row.length; j++) {
        if (i === j) continue;
        const sum = row[i] + row[j];
        const diff = Math.abs(row[i] - row[j]);
        if (!(sum % 5 === 0 || diff % 5 === 0)) {
          allPairsOk = false;
          break;
        }
      }
      if (!allPairsOk) break;
    }
    if (allPairsOk) {
      let group1 = [],
        group2 = [];
      if (rowIdx === 1) {
        group1 = matrix[0];
        group2 = matrix[2].concat(matrix[3]);
      } else if (rowIdx === 2) {
        group1 = matrix[0].concat(matrix[1]);
        group2 = matrix[3];
      }
      // Считаем комбинации
      let count = 0;
      for (let a of group1) {
        for (let b of group2) {
          const sum = a + b;
          const diff = Math.abs(a - b);
          if (sum > 0 && sum % 5 === 0) count++, console.log(a, b);
          else if (diff > 0 && diff % 5 === 0) count++, console.log(a, b);
        }
      }
      return count;
    }
  }
  return 0;
}

/**
 * Функция для поиска во 2-й и 3-й строке всех чисел 0 или 5, делит матрицу на 2 группы,
 * и считает количество комбинаций, где сумма или разность чисел из разных групп кратна 5.
 * Для каждого найденного 0 или 5 расчет производится отдельно, результат суммируется.
 * @param {number[][]} matrix - матрица 4x3
 * @returns {number} - количество подходящих комбинаций
 */
function zeroFiveCombinations_4x3(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== 4 || matrix.some(row => row.length !== 3)) {
    throw new Error('Ожидается матрица 4x3');
  }
  let total = 0;
  for (let rowIdx of [1, 2]) {
    const row = matrix[rowIdx];
    // Индексы всех 0 или 5
    const foundIdxs = row.map((x, idx) => (x === 0 || x % 5 === 0 ? idx : -1)).filter(idx => idx !== -1);
    for (const foundIdx of foundIdxs) {
      let group1 = [],
        group2 = [];
      if (rowIdx === 1) {
        group1 = matrix[0];
        group2 = matrix[2].concat(matrix[3]);
      } else if (rowIdx === 2) {
        group1 = matrix[0].concat(matrix[1]);
        group2 = matrix[3];
      }
      // Считаем комбинации
      for (let a of group1) {
        for (let b of group2) {
          const sum = a + b;
          const diff = Math.abs(a - b);
          if (sum > 0 && sum % 5 === 0) total++;
          else if (diff > 0 && diff % 5 === 0) total++;
        }
      }
    }
  }
  return total;
}

function calculate() {
  const cells = document.querySelectorAll('td.matrix-cell > input');
  M = [
    [+cells[0]?.value ?? 0, +cells[1]?.value ?? 0, +cells[2]?.value ?? 0],
    [+cells[3]?.value ?? 0, +cells[4]?.value ?? 0, +cells[5]?.value ?? 0],
    [+cells[6]?.value ?? 0, +cells[7]?.value ?? 0, +cells[8]?.value ?? 0],
    [+cells[9]?.value ?? 0, +cells[10]?.value ?? 0, +cells[11]?.value ?? 0]
  ];

  const res = [
    collectSpecialSumsAndDiffs(M),
    countSpecialPairsInRows_4x3(M),
    specialCombinations_4x3(M),
    groupCombinations_4x3(M) + zeroFiveCombinations_4x3(M)
  ];
  const sum = sumRows_4x3(M);
  document.querySelector('.sum-1').value = sum[0];
  document.querySelector('.sum-2').value = sum[1];

  document.querySelector('#r1').value = res[0];
  document.querySelector('#r2').value = res[1];
  document.querySelector('#r3').value = res[2];
  document.querySelector('#r4').value = res[3];
}

function clear() {
  const cells = document.querySelectorAll('td > input');
  cells.forEach(el => (el.value = ''));
}
const btn = document.getElementsByTagName('button');
btn[0].onclick = calculate;
btn[1].onclick = clear;
