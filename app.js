//  SELECT THE ELEMENTS
const clear = document.querySelector(".clear"),
    dateElement = document.querySelector("#date"),
    list = document.querySelector("#list"),
    input = document.querySelector("#input");

// SELECT ICON CLASSES NAMES
const CHECK = "fa-check-circle",
    UNCHECK = "fa-circle-thin",
    LINE_THROUGH = "lineThrough";


// VARS
// let LIST = [],
//     id = 0;

let LIST, id;

//get item form storage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {

    LIST = JSON.parse(data);

    id = LIST.length; // set the id to the last one in the list

    loadList(LIST); // Load the list to the user interface

} else {

    // if theres no data
    LIST = [];
    id = 0;
}


// load items to user interface
function loadList(array) {
    array.forEach(item => {
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

// clear local Storage
clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

// SHOW TODAY'S DATE
const today = new Date(),
    options = {
        weekday: "long",
        month: "short",
        day: "numeric"
    };

//GETS THE DATE FORMAT w/m/d => wed/june/5th
dateElement.innerHTML = today.toLocaleDateString("en-us", options);



// THE TODO FUNCTION WHICH DISPLAYS THE LI ELEMENT
function addTodo(toDo, id, done, trash) {

    // if its trash it'll prevent the code below from running
    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK,
        LINE = done ? LINE_THROUGH : "";

    const item =
        ` 
            <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>      
        `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}



// ADD AN ITEM WHEN THE USER HIT THE ENTER KEY
document.addEventListener("keyup", (e) => {

    if (e.keyCode === 13) {
        const toDo = input.value;

        // IF INPUT(TODO) IS'NT EMPTY, WE PUSH OUR ELEMENT TO DO THE ARRAY
        if (toDo) {
            addTodo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add/set item to localStorage (this code must be added where the LIST array is Updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }

        input.value = "";
    }

});

// complete todo
function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}



// target the items created dynamically
list.addEventListener("click", (event) => {
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    //add/set item to localStorage (this code must be added where the LIST array is Updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


// addTodo("drink ", 1, false, false);