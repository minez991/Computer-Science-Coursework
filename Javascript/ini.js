function init() {
    var Start = document.getElementById("START"),
    End = document.getElementById("END");
    if (Start == End || Start.value == "ERROR" || End.value == "ERROR" ) {
        alert("Pls use different Locations");
    } else {
        console.log(Start.value);
        sessionStorage.setItem("Start_Op", Start.value);
        sessionStorage.setItem("End_Op", End.value);
        window.open("Map page.html","__self");
    }
}