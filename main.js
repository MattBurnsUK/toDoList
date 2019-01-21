var inserter = document.getElementById("addNewItem");
var theList = document.getElementById("ul");
var placeholder = document.createElement("LI");
placeholder.setAttribute("id", "placeholderLi");
placeholder.textContent = "Add a new item";

//getElementById(placeholderLi).textContent = "Add a new item...";
//maybe placeholder needs to getElementById and call a static, purpose built new item li in the html
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

/*

inserter.addEventListener("input", addNewThing());


function addNewThing() {
    //console.log("working");
    createNewLi.textContent = inserter.textContent;
    theList.appendChild(createNewLi);
}
    
    
    
    var theContent = document.getElementById("addNewItem").textContent;
    
    
    
    
    var newInputArea = document.createElement("input");
    var createNewLi = document.createElement("li");
    
    
    var addLiContent = li.textContent = newInputArea.textContent;
    
    
    theList.appendChild(addLiContent);
}

//inserter.addEventListener('click', addNewThing)




*/
