    // JavaScript source code
function init() {
    var Start = document.getElementById("Start").value
    End = document.getElementById("End").value,
    Pass = document.getElementById("Pass").value,
    Start = removenumber(Start),
    End = removenumber(End),
    Pass = removenumber(Pass);
    console.log("Start: " + DataBase[Start])
    console.log("End: " + DataBase[End])
    console.log("Via: " + Pass)
    IfVia(Start,End,Pass)
}

var DataBase = {
    PL: "PH",
    Comp: "CO",
    BLab: "BI",
    J: "GE",
    P: "LS",
    F: "F2",
    CLab: "CH",
    SH: "SH",
    M: "MU",
    Pal: "PL",
    Gr: "OG"
}
function IfVia(Start,End,Pass) {
    if (Pass == "") {
        PathfindWithoutVia(Start,End)
    } else {
        PathfindWithVia(Start, End, Pass)
    }
}
function PathfindWithoutVia(Start, End) {   //Upload value of user's choice with out pass
    if (Start == End ) {
        alert("You must use different department for start and finish")
    } else if (DataBase[Start] == undefined || DataBase[End] == undefined) {
        alert("Invalid Classroom Code")
    } else {
        sessionStorage.setItem("Start_Op", DataBase[Start])
        sessionStorage.setItem("End_Op", DataBase[End])
        window.open("Map page.html", "__self");
    }
}
function PathfindWithVia(Start, End, Pass) { //Upload value of user's choice with via point
    if (Start == End || Start == Pass || Pass == End) {
        console.log("Duo")
        alert("You must use different department for start and finish")
    } else if (DataBase[Start] == undefined || DataBase[End] == undefined || DataBase[Pass] == undefined) {
        alert("Invalid Classroom Code")
    } else {
        sessionStorage.setItem("Start_Op", DataBase[Start])
        sessionStorage.setItem("End_Op", DataBase[End])
        sessionStorage.setItem("Pass_Op", DataBase[Pass])
        window.open("Map page.html", "__self");
    }
}
function removenumber(Element) {    //removing number
    Element = Element.replace(new RegExp("[0-9]", "g"), "");
    return Element
}