var inserter = document.getElementById("addNewItem");
var theList = document.getElementById("ul");
var placeholder = document.createElement("LI");
placeholder.setAttribute("id", "placeholderLi");
placeholder.textContent = "Add a new item";
var theBin = document.getElementsByClassName("bin-closed");
var theChecks = document.getElementsByClassName("checkButton");
var clickHappened = false;
//var storedListItems = [];
var retrievedListItems = JSON.parse(localStorage.getItem("storedListItems"));

// Display all of the list items retrieved from local storage
for (let l = 0; l < retrievedListItems.length; l++){
    console.log(retrievedListItems[l]);
    var node = document.createElement("LI");
    var listItem = document.createTextNode(retrievedListItems[l]);
    node.appendChild(listItem);
    var icons = document.createElement("div");
    icons.setAttribute('class','icons');
    var binIcon = document.createElement("img");
    var checkIcon = document.createElement("img");
    binIcon.setAttribute('src', 'bin-closed.png');
    binIcon.setAttribute('class','bin-closed');
    checkIcon.setAttribute('src','http://localhost/to-do-list/unchecked.png');
    checkIcon.setAttribute('class','checkButton');
    icons.appendChild(binIcon);
    icons.appendChild(checkIcon);
    node.appendChild(icons);
    node.setAttribute('class','list-item');
    theList.appendChild(node);
}


// Adding new items to the list
inserter.oninput = function() {
    var newItem = inserter.value;
    placeholder.textContent = newItem;
    theList.appendChild(placeholder);
    
}

inserter.onchange = function() {
    var newItem = inserter.value;
    var createNewLi = document.createElement("LI");
    createNewLi.textContent = newItem; 
    theList.appendChild(createNewLi);
    inserter.value = "";
    placeholder.textContent = "Add a new item";
    // add the new list item to the array
    retrievedListItems.push(newItem);
    // update local storage with the new array
    localStorage.setItem("storedListItems", JSON.stringify(retrievedListItems));
}

// Event handlers for the bin icon
for (let i=0; i<theBin.length; i++){
    theBin[i].onmouseover = function(e){
        e.target.src = "bin-open.png";
    }
    theBin[i].onmouseleave = function(e){
        e.target.src = "bin-closed.png";
    }
    theBin[i].onclick = function(e){
        let listItem = e.target.parentElement.parentElement;
        theList.removeChild(listItem);
        // update the array to remove the clicked item
        let arrVal = listItem.textContent;
        console.log(arrVal);
        for (let i = 0; i < retrievedListItems.length; i++){
            if (retrievedListItems[i] === arrVal) {
                retrievedListItems.splice(i, 1);
            }
        }
        
        // update local storage with the new array
        localStorage.setItem("storedListItems", JSON.stringify(retrievedListItems));
    }
}

// Setting up the event functions for the check/uncheck icon

function changeCheckImgPerm(e) {
    if (e.target.src == "http://localhost/to-do-list/checked.png"){
        e.target.parentElement.parentElement.firstChild.setAttribute("id", "checked");
        clickHappened = true;
    } else {
        e.target.src = "http://localhost/to-do-list/unchecked.png";
        e.target.parentElement.parentElement.firstChild.setAttribute("id", "somethingrandom");
        clickHappened = true;
    }
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

// Apply the event listeners to all check images

for (let i=0; i<theChecks.length; i++){
    theChecks[i].addEventListener("mouseover", changeCheckImg);
    theChecks[i].addEventListener("mouseleave", changeCheckImg);
    theChecks[i].addEventListener("click", changeCheckImgPerm);
}