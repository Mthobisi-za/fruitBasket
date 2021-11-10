var input = document.querySelector("#name");
input.addEventListener("keyup", (event)=>{
    var fruits = document.querySelector("#data");
    var changeedArg = JSON.parse(fruits.value);
    var upper = (input.value).toUpperCase();
    var condition = changeedArg.indexOf(upper);
    var p = document.querySelector(".p");
    if(condition != -1){  
        p.style.color = "red";
        p.innerHTML = input.value+" already exist! try to update the basket.";
        var btn = document.querySelector("button");
        btn.type = "button";
    
    }else if(input.value != ""){  
        p.style.color = "green";
        p.innerHTML = input.value + " does not exist! You are good to go.";
        var btn = document.querySelector("button");
        btn.type = "submit";
    }else{
        p.innerHTML = input.value
        var btn = document.querySelector("button");
        btn.type = "button";
    }
    
   
})