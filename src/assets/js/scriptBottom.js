import {bottomSizes} from "./data";

let bottomElements

const bottomElem = document.querySelector('#bottom'),
    sizeEu = document.querySelector('#euBottom'),
    sizeFr = document.querySelector('#frBottom'),
    sizeGb = document.querySelector('#gbBottom'),
    sizeUs = document.querySelector('#usBottom')
export const cmChangeBottom = document.querySelector('#cmBtnBottom')
export const inChangeBottom = document.querySelector('#inBtnBottom')
export const displayCmBottom = renderDropdownContent(bottomSizes.cm)
const displayInBottom = renderDropdownContent(bottomSizes.in)

cmChangeBottom.addEventListener('click', e => {
    e.preventDefault()
    clearDropdownBottom()
    clearResult()
    onRenderDropdownContent(displayCmBottom, cmChangeBottom, inChangeBottom)
})

inChangeBottom.addEventListener('click', e => {
    e.preventDefault()
    clearDropdownBottom()
    clearResult()
    onRenderDropdownContent(displayInBottom, inChangeBottom, cmChangeBottom)
})

bottomElem.addEventListener('change', () => {
    if (bottomElem.value === '-1') {
        [sizeEu, sizeFr, sizeGb, sizeUs].map(item => item.textContent = '-')
    } else {
        [sizeFr, sizeGb, sizeUs].map(item => item.textContent = bottomElem.value)
        const values = {
            '34': 'XS',
            '36': 'S',
            '38': 'M',
            '40': 'L',
            '42': 'XL',
            '44': 'XXL',
        }
        for (let [key, value] of Object.entries(values)) {
            if (bottomElem.value === value) {
                sizeEu.textContent = key
            }
        }
    }
})

function renderDropdownContent(unit) {
    bottomElements = []
    for (let [key, value] of Object.entries(unit)) {
        const html = `<option value="${value.value}">${value.data.map(item => item.toFixed(1)).join(' - ')}</option>`
        bottomElements.push(html)
    }
    return bottomElements
}

export function onRenderDropdownContent(displayUnit, thisUnit, otherUnit) {
    thisUnit.disabled = true
    otherUnit.disabled = false
    for (let i = 0; i < displayUnit.length; i++) {
        bottomElem.insertAdjacentHTML('beforeend', displayUnit[i])
    }
}

export function clearDropdownBottom() {
    bottomElem.innerHTML = '<option value=-1>Hip Size</option>'
}

function clearResult() {
    [sizeEu, sizeFr, sizeGb, sizeUs].map(item => item.textContent = '-')
}

