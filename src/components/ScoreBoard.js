import React from 'react'

const ScoreBoard = ({ score }) => {
    return (
        <div className="score-board">
            <h1>SCORE RESULT</h1>
            <h1>{score}</h1>
        </div>
    )
}

export default ScoreBoard
