const M1 = [
    [1,0],
    [1,0]
];
const M2 = [
    [2,0],
    [1,0]
];

/** Константы и вспомогательные функции **/
const group1 = [1,4,6,9];
const group2 = [2,3,7,8];
const group3 = [5,0];

const table_of_weights = new Map()
.set( [1, 4].toString(), 0.5)
.set( [1, 6].toString(), 0.5)
.set( [1, 9].toString(), 1)
.set( [4, 6].toString(), 1)
.set( [4, 9].toString(), 0.5)
.set( [6, 9].toString(), 1.5)
.set( [2, 3].toString(), 0.5)
.set( [2, 7].toString(), 0.5)
.set( [2, 8].toString(), 1)
.set( [3, 7].toString(), 1)
.set( [3, 8].toString(), 0.5)
.set( [7, 8].toString(), 1.5)
.set( [0, 5].toString(), 0)
.set( [0, 0].toString(), 0)
.set( [1, 1].toString(), 0)
.set( [2, 2].toString(), 0)
.set( [3, 3].toString(), 0)
.set( [4, 4].toString(), 0)
.set( [5, 5].toString(), 1)
.set( [6, 6].toString(), 0)
.set( [7, 7].toString(), 0)
.set( [8, 8].toString(), 0)
.set( [9, 9].toString(), 0)

function dontEqZeroOrFive(num) {
    return num !== 5 && num !== 0;
}

function checkPairIfFromOneGroup(main, sec){
    //**Для третьего решения */
    const res = [];
    let secCopy = sec.slice();
    let mainCopy = main.slice();

    mainCopy.forEach((el) => {
        secCopy.forEach((secEl, idx) => {

            if (group1.includes(el) && group1.includes(secEl)) {
                res.push(true);
                return;
            }
            if (group2.includes(el) && group2.includes(secEl) ) {
                res.push(true);
                return;
            }
            if (group3.includes(el) && group3.includes(secEl)) {
                res.push(true);
                return;
            }
            res.push(false);
        })
    })

    if (res.every((el) => el === false)) return false;

    return res.every((el) => el === true) || res[0] === res[3] && res[1] === res[2];


}

function makePossiblePairs(arr, cond) {
    const res = [];
    const result = [];
    if (arr.length > 1) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0 + i; j <= arr.length; j++) {
                if (j + 1 < arr.length) res.push([arr[i], arr[j + 1]])
            }
        }
    }
    res.forEach((el) => {
      const digit = table_of_weights.get(el.toString()) ? table_of_weights.get(el.toString()) : table_of_weights.get(el.reverse().toString());
      result.push(digit);
    })

    return result.reduce((p,c) => p + c, 0 );
}

function makeObshetInTwoColums(arr) {
    const res = [[0,2],[0,3],[1,2],[1,3]];
    const result = [];
    
    res.forEach((el) => {
      const key = [arr[el[0]],arr[el[1]]].toString();
      const keyReversed = [arr[el[0]],arr[el[1]]].reverse().toString();
      const digit = table_of_weights.get(key) ? table_of_weights.get(key) : table_of_weights.get(keyReversed);
      result.push(digit);
    })

    return result.filter(el => isFinite(el)).reduce((p,c) => p + c, 0 );
}

function whichGroupesFrom(key) {

    const res = [];

    key.forEach(el => {
        if (group1.includes(el)) res.push(1);
        if (group2.includes(el)) res.push(2);
        if (group3.includes(el)) res.push(3);
    })

    return res.sort().toString();
}

/** Решение 1, 2 **/
function rOneAndTwoFunc(m) {
    const res = [];
    const arr = {
        gr1: [],
        gr2: [],
        gr3: [],
    };
    for(let item of m.flat() ) {
        if (group1.includes(item)) arr.gr1.push(item);
        if (group2.includes(item)) arr.gr2.push(item);
        if (group3.includes(item)) arr.gr3.push(item);
    }

    if (arr.gr1.length === 1 && dontEqZeroOrFive(arr.gr1[0])) res.push(0.125);
    if (arr.gr1.length === 1 && !dontEqZeroOrFive(arr.gr1[0])) res.push(0.25);

    
    if (arr.gr2.length === 1 && dontEqZeroOrFive(arr.gr2[0])) res.push(0.125);
    if (arr.gr2.length === 1 && !dontEqZeroOrFive(arr.gr2[0])) res.push(0.25);

    
    if (arr.gr3.length === 1 && dontEqZeroOrFive(arr.gr3[0])) res.push(0.125);
    if (arr.gr3.length === 1 && !dontEqZeroOrFive(arr.gr3[0])) res.push(0.25);


    let arr_help = [];
    if (arr.gr1.length > 1) {
        for(let i = 0; i < arr.gr1.length; i++) {
            for(let j = 0 + i; j <= arr.gr1.length; j++) {
                if(j + 1 < arr.gr1.length) arr_help.push([arr.gr1[i], arr.gr1[j + 1]])
            }
        }
    }
    if (arr.gr2.length > 1) {
        for(let i = 0; i < arr.gr2.length; i++) {
            for(let j = 0 + i; j <= arr.gr2.length; j++) {
                if(j + 1 < arr.gr2.length) arr_help.push([arr.gr2[i], arr.gr2[j + 1]])
            }
        }
    }
    if (arr.gr3.length > 1) {
        for(let i = 0; i < arr.gr3.length; i++) {
            for(let j = 0 + i; j <= arr.gr3.length; j++) {
                if(j + 1 < arr.gr3.length) arr_help.push([arr.gr3[i], arr.gr3[j + 1]])
            }
        }
    }

    arr_help.forEach((el) => {
        // if (el[0] === el[1]) {
        //     res.push(1)
        // } else {
          const digit = table_of_weights.get(el.toString()) ? table_of_weights.get(el.toString()) : table_of_weights.get(el.reverse().toString());
          res.push(digit);
        // }
    })

    return res.filter(el => el !== undefined).reduce((p,c) => p + c, 0 );

}

/** Решение 3 **/
function rThreeFunc(m) {
    const res = []
    let prom_table = {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': []
    };
    const mCopy = [m[0].slice(), m[1].slice()];

    for(let i = 0; i < mCopy[0].length; i++) {
        let iIsNew = {
            pushed: false,
            count: i
        };
        for(let j = 0; j < mCopy[0].length; j++) {
            if (i !== j && checkPairIfFromOneGroup([mCopy[0][i], mCopy[1][i]], [mCopy[0][j], mCopy[1][j]])) {
                prom_table[i.toString()].push([mCopy[0][j], mCopy[1][j]]);
                mCopy[0][j] = undefined;
                mCopy[1][j] = undefined;
                iIsNew.pushed = true;
            }
            if (iIsNew.count === i && iIsNew.pushed) {
                prom_table[i.toString()].unshift([mCopy[0][i], mCopy[1][i]]);
                iIsNew = -1;
            }
        }
    }

    for (let key in prom_table) {
        if(prom_table[key].length > 0) {
            const new_arr = []
            prom_table[key].forEach((el, i) => {
                prom_table[key].forEach((el, j) => {
                    if (i !== j && i < j) new_arr.push([i, j]);
                })
            })

            const possiblePairs = new_arr.map(el => {
                return makeObshetInTwoColums([prom_table[key][el[0]], prom_table[key][el[1]]].flat())
            }) ;
            res.push(...possiblePairs);
            
        }
    }

    return res.reduce((p,c) => p + c, 0 )
}

/** Решение 4 **/
function rFourFunc(m) {

    let mCopy = m.slice();
    let prom_obj = {};

    mCopy = [
       ...m[0].map((el, index) => [mCopy[0][index], mCopy[1][index]])
    ].flat()

    for (let i = 0; i < mCopy.length; i++) {
        for (let j = 0 + i; j < mCopy.length; j++) {
            const numOfGroup = group1.includes(mCopy[i]) ? 1 : group2.includes(mCopy[i]) ? 2 : group3.includes(mCopy[i]) ? 3 : null;
            if (numOfGroup === 1 && group1.includes(mCopy[j + 1])) {
                if (!prom_obj[i.toString()]) prom_obj[i.toString()] = [mCopy[i]];
                if (j + 1 === i + 1 && ((j + 1) % 2) !== 0) continue;
                prom_obj[i.toString()] = [...prom_obj[i.toString()], mCopy[j + 1]];
            }
            if (numOfGroup === 2 && group2.includes(mCopy[j + 1])) {
                if (!prom_obj[i.toString()]) prom_obj[i.toString()] = [mCopy[i]];
                if (j + 1 === i + 1 && ((j + 1) % 2) !== 0) continue;
                prom_obj[i.toString()] = [...prom_obj[i.toString()], mCopy[j + 1]];
            }
            if (numOfGroup === 3 && group3.includes(mCopy[j + 1])) {
                if (!prom_obj[i.toString()]) prom_obj[i.toString()] = [mCopy[i]];
                if (j + 1 === i + 1 && ((j + 1) % 2) !== 0) continue;
                prom_obj[i.toString()] = [...prom_obj[i.toString()], mCopy[j + 1]];
            }
        }
    }

    let arr_help = [];
    for (key in prom_obj) {
        const new_arr = [];
        prom_obj[key].forEach((el, i) => {
            if (i !==0 && i < prom_obj[key].length) new_arr.push([0, i]);
        })

        new_arr.forEach(el => arr_help.push(makePossiblePairs([prom_obj[key][[el[0]]], prom_obj[key][[el[1]]]])));

    }

    return arr_help.filter(isFinite).reduce((a,b) => a + b, 0);

} 

/** Решение 5 **/
function rFiveFunc(m) {

    let mCopy = m.slice();
    let prom_arr = mCopy[0].map((el, idx) => [mCopy[0][idx], mCopy[1][idx]]);

    let arr_help = [];

    for(let el of prom_arr) {
        arr_help.push(makePossiblePairs(el));
    }

    const res3 = rThreeFunc(m);

    const prom_res = arr_help.filter(v => isFinite(v) && v !== 0).reduce((p,c) => p + c, 0);

    return prom_res;
    // return (prom_res + res3) / 2;
}

/** Решение 6 **/
function rSixFunc(m) {
    let r1 = 0;
    let r2 = 0;

    let arr_of_indexes_r1 = m.flat().map((el, i) => [i, i + 1]);
    const elements = m[0].length === 6 ? '9,10' : '10,11';
    
    arr_of_indexes_r1.pop();
    arr_of_indexes_r1 = arr_of_indexes_r1.filter(el => el.toString() !== [m[0].length - 1, m[0].length].toString());
    arr_of_indexes_r1 = arr_of_indexes_r1.filter(el => el.toString() !== '3,4' && el.toString() !== elements);

    const arr_help_for_r1 = {};
    const mCopy = m.slice().flat();

    arr_of_indexes_r1.forEach((el, i) => {
        const elements = m[0].length === 6 ? '9,10' : '10,11';
        const newArrWithoutCurr = arr_of_indexes_r1.filter(el => el.toString() !== '3,4' && el.toString() !== elements);
        
        newArrWithoutCurr.forEach((elFromNewArr) => {

            const m_group = [mCopy[el[0]], mCopy[el[1]]];
            const m_elFromNewArr = [mCopy[elFromNewArr[0]], mCopy[elFromNewArr[1]]];

            if (checkPairIfFromOneGroup(m_group, m_elFromNewArr) && el[0] !== elFromNewArr[0]) {
                const key = whichGroupesFrom(m_group);
                if (arr_help_for_r1[key]) {
                    arr_help_for_r1[key][i] = [m_group];
                } else {
                    arr_help_for_r1[key] = [];
                    arr_help_for_r1[key][i] = [m_group];
                }
            }
        });
        
    })

    const res = [];

    for (let key in arr_help_for_r1) {
        const arr = arr_help_for_r1[key].filter(el => !!el).flat();

        if(arr.length > 0) {
            const new_arr = []
            arr.forEach((el, i) => {
                arr.forEach((el, j) => {
                    if (i !== j && i < j) new_arr.push([i, j]);
                })
            })

            const possiblePairs = new_arr.map(el => {
                return makeObshetInTwoColums([arr[el[0]], arr[el[1]]].flat())
            }) ;
            res.push(...possiblePairs);
        }
    }

    r1 = res.filter(isFinite).reduce((a,b) => a + b, 0);

    let arr_of_indexes_r2 = m.flat().map((el, i) => [i, i + 1]);
    arr_of_indexes_r2.pop();
    arr_of_indexes_r2 = arr_of_indexes_r2.filter(el => el.toString() !== [m[0].length - 1, m[0].length].toString());
    const key2 = m[0].length === 6 ? '9,10' : '10,11';
    arr_of_indexes_r2 = arr_of_indexes_r2.filter(el => el.toString() !== '3,4' && el.toString() !== key2);

    arr_of_indexes_r2 = arr_of_indexes_r2.map((el) => {
        const key = [m.flat()[el[0]],m.flat()[el[1]]].toString();
        const keyReverse = [m.flat()[el[0]],m.flat()[el[1]]].reverse().toString();
        return table_of_weights.get(key) ? table_of_weights.get(key) : table_of_weights.get(keyReverse);
    })

    r2 = arr_of_indexes_r2.filter(isFinite).reduce((a,b) => a + b, 0);
       
    return [r1, r2]
    
} 

/** Решение 7 **/
function rSevenFunc(m) {
    const mCopy = m.slice().flat().filter(el => el >= 5 || el === 0);
    const prom_obj = {
        '6,9': [],
        '7,8': []
    };
    mCopy.forEach(el => {
        for(let key in prom_obj) {
            if (key.includes(el)) prom_obj[key].push(el);
        }
    });


    const glob_res = [];

    for(let key in prom_obj) {
        const res = [
            [],
            []
        ];
        let shouldDelete = key.split(',').map(el => +el).every(el => prom_obj[key].includes(el));
        if (!shouldDelete) {
            prom_obj[key] = [];
        } else {
            prom_obj[key].forEach(el => +key.split(',')[0] === el ? res[0].push(el) : res[1].push(el));
            glob_res.push(res[0].length * res[1].length);
        }
    }

    return glob_res.length ? glob_res.reduce((a,b) => a + b) : 0;
}


/** Решение 8 **/
function rEightFunc(m) {
    let r1 = 0;
    let r2 = 0;

    let arr_of_indexes_r1 = m.flat().map((el, i) => [i, i + 1]);
    const elements = m[0].length === 6 ? '9,10' : '10,11';
    
    arr_of_indexes_r1.pop();
    arr_of_indexes_r1 = arr_of_indexes_r1.filter(el => el.toString() !== [m[0].length - 1, m[0].length].toString());
    arr_of_indexes_r1 = arr_of_indexes_r1.filter(el => el.toString() !== '3,4' && el.toString() !== elements);

    const arr_help_for_r1 = {};
    const mCopy = m.slice().flat();

    arr_of_indexes_r1.forEach((el, i) => {
        const elements = m[0].length === 6 ? '9,10' : '10,11';
        const newArrWithoutCurr = arr_of_indexes_r1.filter(el => el.toString() !== '3,4' && el.toString() !== elements);
        
        newArrWithoutCurr.forEach((elFromNewArr) => {

            const m_group = [mCopy[el[0]], mCopy[el[1]]];
            const m_elFromNewArr = [mCopy[elFromNewArr[0]], mCopy[elFromNewArr[1]]];

            if (checkPairIfFromOneGroup(m_group, m_elFromNewArr) && el[0] !== elFromNewArr[0]) {
                const key = whichGroupesFrom(m_group);
                if (arr_help_for_r1[key]) {
                    arr_help_for_r1[key][i] = [m_group];
                } else {
                    arr_help_for_r1[key] = [];
                    arr_help_for_r1[key][i] = [m_group];
                }
            }
        });
        
    })

    const res = [];

    for (let key in arr_help_for_r1) {
        const arr = arr_help_for_r1[key].filter(el => !!el).flat();
        const check_arr1 = [5,6,7,8,9,0];
        const checkMap = new Map()
            .set(5, 0)
            .set(6, 9)
            .set(7, 8)
            .set(8, 7)
            .set(9, 6)
        
        arr.forEach(el => {
            const pair = checkMap.get(el[0]);
            if (pair) {
                
            }
        })

    }

} 

let M = [
    [
        [1,5,0,0,2,0],  //  13.1 - 1.13 - 12 - 23.5 - 8        11 - 6 - 2,5 - 0 - 2,5 - 0
        [1,3,0,0,1,0]
    ],
    [
        [6,3,5,9,7,6,3], // 8,5 - 9.125 - 11 - 24.5 - 8 -
        [6,8,0,0,8,2,8]
    ],
    [
        [6,8,4,3,8,1,6], // 8,25 - 3.25 - 6 - 24 - 4.5        11,3 - 0 - 0 - 0 - 0 - 0
        [6,6,2,0,8,0,4]
    ],
    [
        [6,6,5,7,8,0,1], // 6,75 - 3,5 - 6,5 - 23 - 4,5       8,25 - 6 - 2,75 - 1 - 1 - 0,5
        [7,1,2,3,8,1,5]
    ],
    [
        [3,5,0,6,4,1], // 6.5 - 0.875 - 8 - 16 - 4.5          4,5  - 2
        [3,1,6,7,3,5]
    ],

]
const numOfEx = 0;



const res = [
    rOneAndTwoFunc([...M[numOfEx][0].slice(0, 4), ...M[numOfEx][1].slice(0, 4)]),
    rOneAndTwoFunc([...M[numOfEx][0].slice(4), ...M[numOfEx][1].slice(4)]),
    rThreeFunc(M[numOfEx]),
    rFourFunc(M[numOfEx]),
    rFiveFunc(M[numOfEx]),
    rSixFunc(M[numOfEx]),
    rSevenFunc(M[numOfEx]),
];


function calculate() {

  const cells = document.querySelectorAll(".matrix-cell > input");
  const numOfEx = 0;

  if (cells[6]?.value === "" && cells[13]?.value === "" ) {
    M = [
      [
        [+cells[0]?.value ?? 0,+cells[1]?.value ?? 0,+cells[2]?.value ?? 0,+cells[3]?.value ?? 0,+cells[4]?.value ?? 0,+cells[5]?.value ?? 0],
        [+cells[7]?.value ?? 0,+cells[8]?.value ?? 0,+cells[9]?.value ?? 0,+cells[10]?.value ?? 0,+cells[11]?.value ?? 0,+cells[12]?.value ?? 0],
      ]
    ]
  } else {
    M = [
      [
        [+cells[0]?.value ?? 0,+cells[1]?.value ?? 0,+cells[2]?.value ?? 0,+cells[3]?.value ?? 0,+cells[4]?.value ?? 0,+cells[5]?.value ?? 0, +cells[6]?.value ?? 0],
        [+cells[7]?.value ?? 0,+cells[8]?.value ?? 0,+cells[9]?.value ?? 0,+cells[10]?.value ?? 0,+cells[11]?.value ?? 0,+cells[12]?.value ?? 0, +cells[13]?.value ?? 0],
      ]
    ]
  }

  const res = [
    rOneAndTwoFunc([...M[numOfEx][0].slice(0, 4), ...M[numOfEx][1].slice(0, 4)]),
    rOneAndTwoFunc([...M[numOfEx][0].slice(4), ...M[numOfEx][1].slice(4)]),
    rThreeFunc(M[numOfEx]),
    rFourFunc(M[numOfEx]),
    rFiveFunc(M[numOfEx]),
    rSixFunc(M[numOfEx]),
    rSevenFunc(M[numOfEx]),
  ];

  document.querySelector("#r1").value = res[0];
  document.querySelector("#r2").value = res[1];
  document.querySelector("#r3").value = res[2];
  document.querySelector("#r4").value = res[3];
  document.querySelector("#r5").value = res[4];
  document.querySelector("#r6").value = res[6];
  document.querySelector("#r7").value = res[5][0];
  document.querySelector("#r8").value = res[5][1];
    
}

const btn = document.getElementsByTagName("button");
btn[0].onclick = calculate;
