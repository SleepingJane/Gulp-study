const filterTrigger = document.querySelector('.filter-list__item__js-filter-trigger');

const classes = {
    isActive: 'is-active'
}

const toggleClass = (el, className) => {
    if (el.classList.contains(className)) {
        el.classList.remove(classes.isActive);
    } else {
        el.classList.add(className);
    }
}

filterTrigger.addEventListener('click', (e) => {
    toggleClass(e.currentTarget, classes.isActive);
});