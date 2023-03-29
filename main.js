const groceries = ['Eggs', 'Milk', 'Bread'];
const boughtItems = {};

// toggle checkbox
function toggleStatus (item) {
    boughtItems[item] = boughtItems[item]? false: true;
    displayGroceriesList();
}

// generic function to add a item to a list and
// delete it from input box afterwards
function appendListItem (text) {
    const li = document.createElement('li');
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    let listOfItems = document.getElementById('itemList'); // <ul>
    const close = document.createElement('span');
    const product = document.createElement('span');
    const br = document.createElement('br');
    product.innerText = text;
    close.innerText = ' ';
    product.classList.add('item-name');
    close.classList.add('fa-solid');
    close.classList.add('fa-trash');

    // delete list item when character 'x' is clicked
    close.addEventListener('click', function(event){
        const li = event.target.parentElement;
        const deletedItem = li.querySelector(".item-name");
        deleteItem(deletedItem.innerText, li);
    });

    // mark as bought when checkbox is clicked
    checkbox.addEventListener('click', function(event){
        const li = event.target.parentElement;
        const itemName = li.querySelector(".item-name");
        toggleStatus(itemName.innerText);
    });
    if (text in boughtItems && boughtItems[text] == true) {
        product.classList.add('checked');
        checkbox.checked = true;
    }
    // append the children in list
    li.appendChild(checkbox);
    li.appendChild(product);
    li.appendChild(br);
    li.appendChild(close);

    // append <li> and <br> to the <ul>
    listOfItems.appendChild(li);
    listOfItems.appendChild(br);
}

// function to delete the items
function deleteItem (item, li) {
    groceries.splice(groceries.indexOf (item), 1);
    displayGroceriesList();
    li.style.display = 'none';
}

// function to show the list
function displayGroceriesList () {
    document.getElementById("itemList").innerHTML = "";
    for (let i = 0; i < groceries.length; i++) {
        appendListItem(groceries[i], i);
    }
}

// add the user input to the list
function addItem () {
    const input = document.getElementById('search-input');
    const newItem = input.value;
    // after reading the input value, delete it from UI
    input.value = "";
    // alert the user if the input is empty
    if (newItem == "") {
        alert("You should insert an item.");
        return;
    }
    // add the item in the array
    groceries.push(newItem);
    displayGroceriesList();
}
// show the initial shopping list 
displayGroceriesList();

// append user input to the existing list
const button = document.getElementById('addBtn');
button.addEventListener('click', addItem);

document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        addItem();
    }
})
