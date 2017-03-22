function init() {
    var Start = document.getElementById("START"),
    End = document.getElementById("END"),
    Pass = document.getElementById("MidPoint");
    if (Start.value == End.value || Start.value == Pass.value || Pass.value == End.value) {
        alert("Pls select different Locations");
    } else if(Start.value == "ERROR" || End.value == "ERROR" ){
        alert("One of the value you selected is incorrect!")
    }else {
        console.log(Start.value);
        sessionStorage.setItem("Start_Op", Start.value);
        sessionStorage.setItem("End_Op", End.value);
        sessionStorage.setItem("Pass_Op", Pass.value)
        window.open("Map page.html", "__self");
    }
}