let accumulatedNumber, currentValueInStringType, currentOperation, isJustAfterCalculated

const displayId = document.getElementById('display')
const limit = 10

function initialize() {
  accumulatedNumber = 0
  currentValueInStringType = ''
  currentOperation = 'assign'
  isJustAfterCalculated = false
}

function setAccumulatedNumberToCurrentValue() {
  currentValueInStringType = String(accumulatedNumber)
}

function clearAll() {
  initialize()
  display(0)
}

function clearCurrentValue() {
  currentValueInStringType = ''
  display(0)
  isJustAfterCalculated = false
}

function deleteOneNumber() {
  isJustAfterCalculated && setAccumulatedNumberToCurrentValue()
  currentValueInStringType = currentValueInStringType.slice(0, -1)
  display(currentValueInStringType || 0)
  isJustAfterCalculated = false
}

function reversePlusAndMinus() {
  isJustAfterCalculated && setAccumulatedNumberToCurrentValue()
  if(currentValueInStringType.indexOf('-') == 0) {
    currentValueInStringType = currentValueInStringType.slice(1)
  } else {
    currentValueInStringType = '-' + currentValueInStringType
  }
  display(currentValueInStringType)
  isJustAfterCalculated = false
}

function setCharacter(character) {
  isJustAfterCalculated && setAccumulatedNumberToCurrentValue()
  if(currentValueInStringType.length < limit) {
    currentValueInStringType += character
    display(currentValueInStringType)
    isJustAfterCalculated = false
  }
}

function setOperation(type) {
  if(isJustAfterCalculated) {
    setAccumulatedNumberToCurrentValue()
    currentOperation = 'assign'
  }
  calculate()
  currentValueInStringType = ''
  currentOperation = type
  isJustAfterCalculated = false
}

function calculate() {
  switch (currentOperation) {
    case 'assign':
      accumulatedNumber = Number(currentValueInStringType)
      break
    case 'add':
      accumulatedNumber += Number(currentValueInStringType)
      break
    case 'sub':
      accumulatedNumber -= Number(currentValueInStringType)
      break
    case 'mul':
      accumulatedNumber *= Number(currentValueInStringType)
      break
    case 'div':
      accumulatedNumber /= Number(currentValueInStringType)
      break
  }
  const roundDigit = limit - Math.ceil(Math.log10(accumulatedNumber))
  accumulatedNumber = Math.round(accumulatedNumber * 10**roundDigit) / 10**roundDigit
  if(String(accumulatedNumber).length > limit) {
    initialize()
    display('Too many digits')
  } else {
    display(accumulatedNumber)
    isJustAfterCalculated = true
  }
}

function display(text) {
  displayId.innerText = text
}

initialize()
