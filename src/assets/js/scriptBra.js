import {underbustSizesCm, underbustSizesIn, overbustSizesCm, overbustSizesIn} from "./data.js";
import {onRenderDropdownContent, displayCmBottom, cmChangeBottom, inChangeBottom, clearDropdownBottom} from "./scriptBottom";

let newValue,
    elementsUnderbust,
    elementsOverbust

const underbustElem = document.querySelector('#underbust'),
    overbustElem = document.querySelector('#overbust'),
    sizeEu = document.querySelector('#eu'),
    sizeFr = document.querySelector('#fr'),
    sizeGb = document.querySelector('#gb'),
    sizeUs = document.querySelector('#us'),
    cmChange = document.querySelector('#cmBtn'),
    inChange = document.querySelector('#inBtn'),
    underbustToDisplayInch = displayUnderbust(underbustSizesIn),
    underbustToDisplayCm = displayUnderbust(underbustSizesCm)

window.onload = function() {
    onDisplayUnderbust(underbustToDisplayCm, cmChange, inChange)
    elementsOverbust = overbustSizesCm
    clearDropdownBottom()
    onRenderDropdownContent(displayCmBottom, cmChangeBottom, inChangeBottom)
}

cmChange.addEventListener('click', e => {
    e.preventDefault()
    clearResult()
    onDisplayUnderbust(underbustToDisplayCm, cmChange, inChange)
    elementsOverbust = overbustSizesCm
})

inChange.addEventListener('click', e => {
    e.preventDefault()
    clearResult()
    onDisplayUnderbust(underbustToDisplayInch, inChange, cmChange)
    elementsOverbust = overbustSizesIn
})

underbustElem.addEventListener('change', e => {
    e.preventDefault()
    if (underbustElem.value === '-1') {
        clearResult()
    }
})

overbustElem.addEventListener('change', e => {
    e.preventDefault()
    if (overbustElem.value === '-1') {
        clearResult()
    } else {
        sizeEu.textContent = `${underbustElem.value}${overbustElem.value}`
        sizeFr.textContent = `${+underbustElem.value + 15}${overbustElem.value}`

        if (overbustElem.value === 'E') {
            sizeGb.textContent = `${newValue}DD`
            sizeUs.textContent = `${newValue}DD/E`
        } else if (overbustElem.value === 'F') {
            sizeGb.textContent = `${newValue}E`
            sizeUs.textContent = `${newValue}DDD/F`
        } else if (overbustElem.value === 'G') {
            sizeGb.textContent = `${newValue}F`
            sizeUs.textContent = `${newValue}${overbustElem.value}`
        } else {
            sizeGb.textContent = `${newValue}${overbustElem.value}`
            sizeUs.textContent = `${newValue}${overbustElem.value}`
        }
    }
})

underbustElem.addEventListener('change', () => {
    switch (underbustElem.value) {
        case '65':
            displayOverbust(elementsOverbust.option1)
            newValue = 30
            break
        case '70':
            displayOverbust(elementsOverbust.option2)
            newValue = 32
            break
        case '75':
            displayOverbust(elementsOverbust.option3)
            newValue = 34
            break
        case '80':
            displayOverbust(elementsOverbust.option4)
            newValue = 36
            break
        case '85':
            displayOverbust(elementsOverbust.option5)
            newValue = 38
            break
        case '90':
            displayOverbust(elementsOverbust.option6)
            newValue = 40
            break
        default:
            clearOverbust()
    }
})

function displayUnderbust(unit) {
    elementsUnderbust = []
    for (let key in unit) {
        const value = unit[key]
        value.data.forEach((item, i) => {
            value.data[i] = item.toFixed(1)
        })
        let html = `<option value=${value.value}>${value.data.join(' - ')}</option>`
        elementsUnderbust.push(html)
    }
    return elementsUnderbust
}

function onDisplayUnderbust(displayUnit, thisUnit, otherUnit) {
    thisUnit.disabled = true
    otherUnit.disabled = false
    clearUnderbust()
    clearOverbust()
    for (let i = 0; i < displayUnit.length; i++) {
        underbustElem.insertAdjacentHTML('beforeend', displayUnit[i])
    }
}

function displayOverbust(unit) {
    clearOverbust()
    clearResult()
    for (let [key, value] of Object.entries(unit)) {
        let elements = `<option value=${value.value}>${value.data.map(item => item.toFixed(1)).join(' - ')}</option>`
        overbustElem.insertAdjacentHTML('beforeend', elements)
    }
}

function clearUnderbust() {
    underbustElem.innerHTML = `<option value="-1">Underbust size</option>`
}

function clearOverbust() {
    overbustElem.innerHTML = `<option value="-1">Overbust size</option>`
}

function clearResult() {
    sizeEu.textContent = '-'
    sizeFr.textContent = '-'
    sizeGb.textContent = '-'
    sizeUs.textContent = '-'
}
