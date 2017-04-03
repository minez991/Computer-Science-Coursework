function init() {
    var Start = document.getElementById("START"),
    End = document.getElementById("END"),
    Pass = document.getElementById("MidPoint"); //Grabing infomation from mid point
    console.log("Start: " + Start.value + ' ' + "Pass: " + Pass.value + ' ' + "End: " + End.value)
    if(Start.value == "ERROR" || End.value == "ERROR" || Pass.value == "ERROR"){     // Seperation of different error message
        alert("One of the value you selected is incorrect!")
    }else if(Start.value == End.value || Start.value == Pass.value || Pass.value == End.value) { //Extra Validation
        alert("Pls select different Locations");
    }else {
        console.log(Start.value);
        sessionStorage.setItem("Start_Op", Start.value);
        sessionStorage.setItem("End_Op", End.value);
        sessionStorage.setItem("Pass_Op", Pass.value)
        window.open("Map page.html", "__self"); //Open a new page
    }
}