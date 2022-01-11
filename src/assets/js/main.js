const toggleNavbar = document.querySelector('.navbar-toggler'),
    collapseNavbar = document.querySelector('#navbarNavAltMarkup')

toggleNavbar.addEventListener('click', e => {
    e.preventDefault()
    collapseNavbar.classList.toggle('show')
})

