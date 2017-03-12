// JavaScript source code
function init() {
    var Start = document.getElementById("Start").value
    End = document.getElementById("End").value,
        Start = removenumber(Start),
        End = removenumber(End);
    if (DataBase[Start] != undefined && DataBase[End] != undefined) {
        sessionStorage.setItem("Start_Op", DataBase[Start])
        sessionStorage.setItem("End_Op", DataBase[End])
    } else {
        alert("Oops, Something is not right.Check the classroom codes again (Mind Capital) =w=")
    }

    window.open("Map page.html", "__self");
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