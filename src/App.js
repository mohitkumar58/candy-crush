import React from "react";

const width = 8;

const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
const [currentColorArrangement, setCurrentColorArrangement] = React.useState([])

const checkColumnOfFour = () => {
  for (let i = 0; i < 39; i++) {
    const coloumnOfFour = [i, i +width, i + width * 2, i + width * 3]
    const decidedColor = currentColorArrangement[i]

    if(coloumnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
      coloumnOfFour.forEach(square => currentColorArrangement[square] = '')
    }
  }
}

const checkRowOfFour = () => {
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = currentColorArrangement[i]
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

    if(notValid.includes(i)) continue

    if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
      rowOfFour.forEach(square => currentColorArrangement[square] = '')
    }
  }
}

const checkColumnOfThree = () => {
  for (let i = 0; i < 47; i++) {
    const coloumnOfThree = [i, i +width, i + width * 2]
    const decidedColor = currentColorArrangement[i]

    if(coloumnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
      coloumnOfThree.forEach(square => currentColorArrangement[square] = '')
    }
  }
}

const checkRowOfThree = () => {
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = currentColorArrangement[i]
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 39, 46, 47, 54, 55, 63, 64]

    if(notValid.includes(i)) continue

    if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
      rowOfThree.forEach(square => currentColorArrangement[square] = '')
    }
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
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)

    return () => clearInterval(timer)

  }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree, currentColorArrangement])

  console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, i) => (
          <img
            key={i}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  )
};

export default App;
