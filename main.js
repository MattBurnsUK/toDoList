var inserter = document.getElementById("addNewItem");
var theList = document.getElementById("ul");
var placeholder = document.createElement("LI");
placeholder.setAttribute("id", "placeholderLi");
placeholder.textContent = "Add a new item";
var theBin = document.getElementsByClassName("bin-closed");
var theChecks = document.getElementsByClassName("checkButton");
var clickHappened = false;
var retrievedListItems = JSON.parse(localStorage.getItem("storedListItems")) || [["make to do list app", true],["fly to Vancouver", true],["get dream job", false],["eat putine every day", false]];

// Display all of the list items retrieved from local storage
for (let l = 0; l < retrievedListItems.length; l++){
    //console.log(retrievedListItems[l]);
    var node = document.createElement("LI");
    var listItem = document.createTextNode(retrievedListItems[l][0]);
    console.log (listItem);
    var itemContainer = document.createElement("div");
    itemContainer.setAttribute('class','item');
    itemContainer.appendChild(listItem);
    node.appendChild(itemContainer);
    var icons = document.createElement("div");
    icons.setAttribute('class','icons');
    var binIcon = document.createElement("img");
    var checkIcon = document.createElement("img");
    binIcon.setAttribute('src', 'bin-closed.png');
    binIcon.setAttribute('class','bin-closed');
    
    //check the array to see if the icon has been checked and set src to correct img
    if (retrievedListItems[l][1] === true) {
        checkIcon.setAttribute('src', "/checked.png")
        itemContainer.setAttribute("id", "checked");
    } else {
        checkIcon.setAttribute('src', "/unchecked.png")
    }
    
    checkIcon.setAttribute('class','checkButton');
    icons.appendChild(binIcon);
    icons.appendChild(checkIcon);
    node.appendChild(icons);
    node.setAttribute('class','list-item');
    theList.appendChild(node);
    updateEventListeners();
}


// Adding new items to the list
inserter.oninput = function() {
    var newItem = inserter.value;
    placeholder.textContent = newItem;
    theList.appendChild(placeholder);
    
}

inserter.onchange = function() {
    var newItem = inserter.value;
    var node = document.createElement("LI");
    var listItem = document.createTextNode(newItem);
    var itemContainer = document.createElement("div");
    itemContainer.setAttribute('class','item');
    itemContainer.appendChild(listItem);
    node.appendChild(itemContainer);
    var icons = document.createElement("div");
    icons.setAttribute('class','icons');
    var binIcon = document.createElement("img");
    var checkIcon = document.createElement("img");
    binIcon.setAttribute('src', 'bin-closed.png');
    binIcon.setAttribute('class','bin-closed');
    checkIcon.setAttribute('class','checkButton');
    checkIcon.setAttribute('src', "http://localhost/to-do-list/unchecked.png")
    icons.appendChild(binIcon);
    icons.appendChild(checkIcon);
    node.appendChild(icons);
    node.setAttribute('class','list-item');
    theList.appendChild(node);
    
    // add the new list item to the array
    retrievedListItems.push([newItem, false]);
    // update local storage with the new array
    localStorage.setItem("storedListItems", JSON.stringify(retrievedListItems));
    updateEventListeners();
    inserter.value = "";
    placeholder.textContent = "";
}

function binHover(e){
    console.log(e.target.src);
    e.target.src = "bin-open.png";
}

function binHoverLeave(e){
    e.target.src = "bin-closed.png";
}

function binClick(e){
    let listItem = e.target.parentElement.parentElement;
    theList.removeChild(listItem);
    // update the array to remove the clicked item
    let arrVal = listItem.textContent;
    //console.log(arrVal);
    for (let i = 0; i < retrievedListItems.length; i++){
        if (retrievedListItems[i][0] === arrVal) {
            retrievedListItems.splice(i, 1);
        }
    }

    // update local storage with the new array
    localStorage.setItem("storedListItems", JSON.stringify(retrievedListItems));
}

// Setting up the event functions for the check/uncheck icon

function changeCheckImgPerm(e) {
    if (e.target.src == "http://localhost/to-do-list/checked.png"){
        e.target.parentElement.parentElement.firstChild.setAttribute("id", "checked");
        clickHappened = true;
        
        for (let l = 0; l < retrievedListItems.length; l++){
            if (retrievedListItems[l][0] === e.target.parentElement.parentElement.firstChild.textContent)
                 {
                retrievedListItems[l][1] = true;
            }
        }

    } else {
        e.target.src = "http://localhost/to-do-list/unchecked.png";
        e.target.parentElement.parentElement.firstChild.setAttribute("id", "");
        clickHappened = true;
        
        for (let l = 0; l < retrievedListItems.length; l++){
            if (retrievedListItems[l][0] === e.target.parentElement.parentElement.firstChild.textContent) {
                retrievedListItems[l][1] = false;
            }
        }
    }
    // update local storage
        localStorage.setItem("storedListItems", JSON.stringify(retrievedListItems));
}

function changeCheckImg(e) {
    (clickHappened) ? clickReset(e) : doChangeImg(e);
}

function clickReset(e) {
    clickHappened = false;
}

function doChangeImg(e) {
     if (e.target.src == "http://localhost/to-do-list/unchecked.png") {
        e.target.src = "http://localhost/to-do-list/checked.png";
    } else {
        e.target.src = "http://localhost/to-do-list/unchecked.png";
    }
}

// Apply the event listeners to all check images and bins

function updateEventListeners () {
    for (let i=0; i<theChecks.length; i++){
        theChecks[i].addEventListener("mouseover", changeCheckImg);
        theChecks[i].addEventListener("mouseleave", changeCheckImg);
        theChecks[i].addEventListener("click", changeCheckImgPerm);
    }
    for (let j=0; j<theBin.length; j++){
        theBin[j].addEventListener("mouseover", binHover);
        theBin[j].addEventListener("mouseleave", binHoverLeave);
        theBin[j].addEventListener("click", binClick);
    }
}