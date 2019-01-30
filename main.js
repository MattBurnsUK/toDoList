var inserter = document.getElementById("addNewItem");
var theList = document.getElementById("ul");
var placeholder = document.createElement("LI");
placeholder.setAttribute("id", "placeholderLi");
placeholder.textContent = "Add a new item";
var theBin = document.getElementsByClassName("bin-closed");
var theChecks = document.getElementsByClassName("checkButton");
var clickHappened = false;


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