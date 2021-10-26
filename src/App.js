import React from "react";
import blueCandy from "./images/blue-candy.png"
import greenCandy from "./images/green-candy.png"
import orangeCandy from "./images/orange-candy.png"
import purpleCandy from "./images/purple-candy.png"
import redCandy from "./images/red-candy.png"
import yellowCandy from "./images/yellow-candy.png"
import blankCandy from "./images/blank.png"
import ScoreBoard from "./components/ScoreBoard";


const width = 8;

const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];

const App = () => {
const [currentColorArrangement, setCurrentColorArrangement] = React.useState([])
const [squareBeingDragged, setSquareBeingDragged] = React.useState(null)
const [squareBeingReplaced, setSquareBeingReplaced] = React.useState(null)
const [scoreView, setScoreView] = React.useState(0)

const checkColumnOfFour = () => {
  for (let i = 0; i <= 39; i++) {
    const coloumnOfFour = [i, i +width, i + width * 2, i + width * 3]
    const decidedColor = currentColorArrangement[i]
    const isBlank = currentColorArrangement[i] === blankCandy

    if(coloumnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreView((score) => score + 4)
      coloumnOfFour.forEach(square => currentColorArrangement[square] = blankCandy)
      return true
    }
  }
}

const checkRowOfFour = () => {
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = currentColorArrangement[i]
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
    const isBlank = currentColorArrangement[i] === blankCandy

    if(notValid.includes(i)) continue

    if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreView((score) => score + 4)
      rowOfFour.forEach(square => currentColorArrangement[square] = blankCandy)
      return true
    }
  }
}

const checkColumnOfThree = () => {
  for (let i = 0; i <= 47; i++) {
    const coloumnOfThree = [i, i +width, i + width * 2]
    const decidedColor = currentColorArrangement[i]
    const isBlank = currentColorArrangement[i] === blankCandy

    if(coloumnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreView((score) => score + 3)
      coloumnOfThree.forEach(square => currentColorArrangement[square] = blankCandy)
      return true
    }
  }
}

const checkRowOfThree = () => {
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = currentColorArrangement[i]
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 39, 46, 47, 54, 55, 63, 64]
    const isBlank = currentColorArrangement[i] === blankCandy

    if(notValid.includes(i)) continue

    if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreView((score) => score + 3)
      rowOfThree.forEach(square => currentColorArrangement[square] = blankCandy)
      return true
    }
  }
}


const moveIntoSquareBelow = () => {
  for(let i = 0; i <= 55; i++) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]

    const isFirstRow = firstRow.includes(i) 


    if(isFirstRow && currentColorArrangement[i] === blankCandy) {
      let randomNumber = Math.floor(Math.random() * candyColors.length)
      currentColorArrangement[i] = candyColors[randomNumber]

    }

    if((currentColorArrangement[i + width]) === blankCandy) {
      currentColorArrangement[i + width] = currentColorArrangement[i]
      currentColorArrangement[i] = blankCandy
    }
  }
}


const dragStart = (e) => {
  setSquareBeingDragged(e.target)
}

const dragDrop = (e) => {
  setSquareBeingReplaced(e.target)
}

const dragEnd = () => {
  const squareBeingDraggedId =  parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId =  parseInt(squareBeingReplaced.getAttribute('data-id'))

  currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

  const validMoves = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - width,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + width
  ]

  const validMove = validMoves.includes(squareBeingReplacedId)

  const isAColumnOfFour = checkColumnOfFour()
  const isARowOfFour = checkRowOfFour()
  const isACoulmnOfThree = checkColumnOfThree()
  const isARowOfThree = checkRowOfThree()


  if(squareBeingReplacedId && validMove &&  ( isAColumnOfFour || isARowOfFour || isARowOfThree || isACoulmnOfThree)) {
    setSquareBeingDragged(null)
    setSquareBeingReplaced(null)
} else {
  currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
  currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
  setCurrentColorArrangement([...currentColorArrangement])
}

}



  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  React.useEffect(() => {
    createBoard()
  }, [])

  React.useEffect(() => {

    const timer = setInterval(() => {
      checkColumnOfFour()
      checkRowOfFour()
      checkColumnOfThree()
      checkRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)

    return () => clearInterval(timer)

  }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree, moveIntoSquareBelow, currentColorArrangement])


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, i) => (
          <img
            key={i}
            src={candyColor}
            alt={candyColor}
            data-id={i}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreView} />
    </div>
  )
};

export default App;
