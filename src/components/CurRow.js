/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {letters.map((letter, idx) => {
                    const wordBoxId = rowIdx + '-' + idx;
                    return <div id={wordBoxId} key={wordBoxId} className='Row-wordbox filled'>{letter}</div>
                })}
                {[...Array(5 - letters.length)].map((_, idx) => {
                    const myIdx = idx + letters.length;
                    const wordBoxId = rowIdx + '-' + myIdx;
                    return <div id={wordBoxId} key={wordBoxId} className='Row-wordbox'></div>
                })}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
