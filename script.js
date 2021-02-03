let click = document.querySelectorAll('.click');
let otherClick = document.querySelectorAll('.otherClick');

let left = document.querySelector('.left')
let right = document.querySelector('.right')

let info = document.querySelector('.input-info')
let otherInfo = document.querySelector('.other-input-info')

let arr = ['RUB','USD']
let numbers = ['Нужен запрос','Нужен запрос']

let swapper = document.querySelector('.switch')

async function currentExchange (arr) {
    if (arr[0] === arr[1]) {
        numbers[0] = 1
        numbers[1] = 1
    } else {
        try{
            let firstResponse = await fetch(`https://api.ratesapi.io/api/latest?base=${arr[0]}&symbols=${arr[1]}`)
            let firstData = await firstResponse.json()
            numbers[0] = await firstData.rates[arr[1]];
        } catch {
            alert('Невозможно получить первую валюту')
        }
    
        try {
            let secondResponse = await fetch (`https://api.ratesapi.io/api/latest?base=${arr[1]}&symbols=${arr[0]}`)
            let secondData = await secondResponse.json()
            numbers[1] = await secondData.rates[arr[0]];
        } catch {
            alert('Невозможно получить вторую валюту')
        }
            
    }
    right.value = left.value * numbers[0]
    inputInfo()
    console.log(arr)
    console.log(numbers)    
}
currentExchange(arr)

function inputInfo () {
    let selected = document.querySelectorAll('.selected')
    if (selected[0].tagName == 'SELECT' && selected[1].tagName == 'SELECT') {
        info.innerText = `1 ${selected[0].value} = ${numbers[0]} ${selected[1].value}`
        otherInfo.innerText = `1 ${selected[1].value} = ${numbers[1]} ${selected[0].value}`
    } else if (selected[0].tagName == 'SELECT' && selected[1].tagName != 'SELECT') {
        info.innerText = `1 ${selected[0].value} = ${numbers[0]} ${selected[1].innerText}`
        otherInfo.innerText = `1 ${selected[0].value} = ${numbers[1]} ${selected[1].innerText}`
    } else if (selected[0].tagName != 'SELECT' && selected[1].tagName == 'SELECT') {
        info.innerText = `1 ${selected[0].innerText} = ${numbers[0]} ${selected[1].value}`
        otherInfo.innerText = `1 ${selected[0].innerText} = ${numbers[1]} ${selected[1].value}`
    } else if (selected[0].tagName != 'SELECT' && selected[1].tagName != 'SELECT') {
        info.innerText = `1 ${selected[0].innerText} = ${numbers[0]} ${selected[1].innerText}`
        otherInfo.innerText = `1 ${selected[1].innerText} = ${numbers[1]} ${selected[0].innerText}`
    }
}

function changeFirstVallet (action) {
    if (action.tagName != 'SELECT') {
        arr[0] = action.innerText
    } else {
        arr[0] = action.value
    }
}
click.forEach((item) => {
    item.addEventListener('click', (e) => {
        click.forEach((item) => {
            item.classList.add('unselected')
            item.classList.remove('selected')
        })
        item.classList.add('selected')
        item.classList.remove('unselected')
        
        changeFirstVallet(item)
        currentExchange(arr)
    })
})
left.addEventListener('keyup', () => {
    right.value = left.value * numbers[0]
})

function changeSecondVallet (action) {
    if (action.tagName != 'SELECT') {
        arr[1] = action.innerText
    } else {
        arr[1] = action.value
    }
}
otherClick.forEach((item) => {
    item.addEventListener('click', (e) => {
        otherClick.forEach((item) => {
            item.classList.add('unselected')
            item.classList.remove('selected')
        })
        item.classList.add('selected')
        item.classList.remove('unselected')

        changeSecondVallet(item)
        currentExchange(arr)

    })
})
right.addEventListener('keyup', () => {
    left.value = right.value * numbers[1]
})

swapper.addEventListener('click', () => {
    let firstActive = 0
    let secondActive = 0
    for (i = 0; i < click.length; i++) {
        if (click[i].classList.contains('selected')) {
            firstActive = i
            click[i].classList.remove('selected')
            click[i].classList.add('unselected')
        }
        if (otherClick[i].classList.contains('selected')) {
            secondActive = i
            otherClick[i].classList.remove('selected')
            otherClick[i].classList.add('unselected')
        }
        if (click[i].tagName == 'SELECT' && otherClick[i].tagName == 'SELECT') {
            let a = click[i].value
            let b = otherClick[i].value
            click[i].value = b
            otherClick[i].value = a
        }
    }
    click[secondActive].classList.add('selected')
    click[secondActive].classList.remove('unselected')
    otherClick[firstActive].classList.add('selected')
    otherClick[firstActive].classList.remove('unselected')
    let rInput = right.value
    let lInput = left.value
    right.value = lInput
    left.value = rInput

    let a = arr[0]
    let b = arr[1]
    arr[1] = a
    arr[0] = b
    inputInfo()
})