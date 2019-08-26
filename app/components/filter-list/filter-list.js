const filterTriggerList = document.querySelectorAll('.js-filter-trigger');

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

// for (let i = 0; i < filterTriggerList.length; i++) {
//     filterTriggerList[i].addEventListener('click', (e) => {
//         toggleClass(e.currentTarget, classes.isActive);
//     });
// }
console.log(filterTriggerList);

filterTriggerList.forEach((filterTrigger) => {
    filterTrigger.addEventListener('click', (e) => {
        toggleClass(e.currentTarget, classes.isActive);
    });
})