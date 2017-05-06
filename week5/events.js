function divClick(event){
    document.getElementById("output").textContent = "Div was clicked";
}

function buttonClick(event){
    document.getElementById("output").textContent = "Button was clicked";
    if(document.getElementById("propCheck").checked){
    	event.stopPropagation();
    }    
}

function checkClick(event){
    document.getElementById("output").textContent = "Checkbox was clicked";
    if(document.getElementById("defaultCheck").checked){
    	event.preventDefault();
    }
}

document.getElementById("check").addEventListener("click", checkClick);
document.getElementById("innerButton").addEventListener("click", buttonClick);
document.getElementById("buttonHolder").addEventListener("click", divClick);