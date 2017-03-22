// JavaScript source code
function init() {
    var Start = document.getElementById("Start").value
    End = document.getElementById("End").value,
    Pass = document.getElementById("Pass").value,
    Start = removenumber(Start),
    End = removenumber(End),
    Pass = removenumber(Pass);
    if (Start.value == End.value || Start.value == Pass.value || Pass.value == End.value) {
        alert("You must have different values")
    }else if (DataBase[Start] != undefined && DataBase[End] != undefined && DataBase[Pass] != undefined ) {
        sessionStorage.setItem("Start_Op", DataBase[Start])
        sessionStorage.setItem("End_Op", DataBase[End])
        sessionStorage.setItem("Pass_Op", DataBase[Pass])
        window.open("Map page.html", "__self");
    } else {
        alert("Oops, Something is not right.Check the classroom codes again (Mind Capital) =w=")
    }
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

function removenumber(Element) {
    Element = Element.replace(new RegExp("[0-9]", "g"), "");
    return Element
}