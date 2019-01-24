var inserter = document.getElementById("addNewItem");
var theList = document.getElementById("ul");
var placeholder = document.createElement("LI");
placeholder.setAttribute("id", "placeholderLi");
placeholder.textContent = "Add a new item";
var theBin = document.getElementsByClassName("bin-closed");
var theChecks = document.getElementsByClassName("checkButton");

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

//Functions for the image event handlers

function changeCheckImg(e) {
    console.log(e.target.src);
    if (e.target.src == "http://localhost/to-do-list/unchecked.png") {
        e.target.src = "http://localhost/to-do-list/checked.png";
    } else {
        if (e.target.parentElement.parentElement.firstChild.getAttribute("id") != "http://localhost/to-do-list/checked.png") {
        e.target.src = "http://localhost/to-do-list/unchecked.png";
        }
    }
}


function changeCheckImgPerm(e) {
  // e.target.removeEventListener("mouseleave", changeCheckImg);
    if (e.target.src == "http://localhost/to-do-list/unchecked.png"){
        e.target.src = "http://localhost/to-do-list/checked.png";
        e.target.parentElement.parentElement.firstChild.setAttribute("id", "checked");
    } else {
        e.target.src = "http://localhost/to-do-list/unchecked.png";
        e.target.parentElement.parentElement.firstChild.setAttribute("id", "somethingrandom");
    }
}

//Applying the image event listeners
for (let i=0; i<theChecks.length; i++){
    theChecks[i].addEventListener("mouseover", changeCheckImg);
    theChecks[i].addEventListener("mouseleave", changeCheckImg);
    theChecks[i].addEventListener("click", changeCheckImgPerm);
}