/// <reference path="Map page.html" />
/// <reference path="Path.js" />

 // Classes
function node(name,connect,coordinate,type) {
    this.name= name;
    this.connect = connect;
    this.distance = 1
    this.temp = Infinity
    this.perm = null
    this.ord = null
    this.retracevisited = false
    this.p1 = coordinate
    this.type = type
    this.gettype = function () {
        if (type == "Way Points") {
            return true
        } else {
            return false
        }
    }
}
var user ={ 
    Start: sessionStorage.getItem("Start_Op"),
    Pass: sessionStorage.getItem("Pass_Op"),
    End: sessionStorage.getItem("End_Op"),
}       //Class of user's selection
var Database = {
    AR_start: new node("ARS", ["GTL", "GBL", "ARE"], [503, 470], "Way Points"),
    AR_End: new node("ARE", ["OG","ARS", "SH", "CY"], [210, 466], "Way Points"),
    MTL: new node("MTL", ["CO", "MTR", "BI"], [304, 78], "Way Points"),
    MTR: new node("MTR", ["MTL", "MBR"], [403, 75], "Way Points"),
    MBL: new node("MBL", ["BI", "CH", "MBR"], [293, 134], "Way Points"),
    MBR: new node("MBR", ["CH", "MTR", "MBL", "MP"], [385, 192], "Way Points"),
    MP: new node("MP", ['MBR', 'ME', "MAM"], [391, 232], "Way Points"),
    MAM: new node("MAM", ["MP", "GTL", "OG"], [421, 275], "Way Points"),
    MAG: new node("MAG", ["OG", "MU"], [256, 298], "Way Points"),
    GTL: new node("GTL", ["UC", "ME", "MAM", "ARS"], [516, 307], "Way Points"),
    GTR: new node("GTR", ["LS", "EC"], [844, 367], "Way Points"),
    GBL: new node("GBL", ["ARS", "GBR"], [477, 470], [508.583], "Way Points"),
    GBR: new node("GBR", ["GBL", "GTR"], [872, 563], "Way Points"),
    //////////////////////////////////////Locations//////////////////////////////////
    EC: new node("EC", ["GTR"], [815, 262]),
    LS: new node("LS", ["GTR", "UC"], [776, 335]),
    UC: new node("UC", ["F1", "F2", "GTL", "LS"], [690, 321]),
    F1: new node("F1", ["UC"], [706, 273]),
    F2: new node("F2", ["UC"], [706, 273]),
    ME: new node("ME", ["PH", "GTL", "MP"], [482, 247]),
    BI: new node("BI", ["MTL", "MBL", ], [269, 143]),
    CO: new node("CO", ["MTL"], [284, 40]),
    CH: new node("CH", ["MBL", "MBR"], [320, 198]),
    PH: new node("PH", ["ME"], [519, 182]),
    SH: new node("SH", ["ARE", "CY"], [210, 466]),
    MU: new node("MU", ["CY", "MAG"], [166, 361]),  //need ,
    PL: new node("PL", ["CY", "GE", "PLE"], [156, 578]), // need
    GE: new node("GE", ["PL"], [178, 702]),
    CY: new node("CY", ["ARE", "PL", "MU", "SH"], [157, 479]),
    OG: new node("OG", ["MAM", "MAG","ARE"], [310, 323]),
    PLE: new node("PLE", ["PL"], [88, 572])
};  // Data Base of all the Nodes

var ReplaceDatabase = {
    AR_start: new node("ARS", ["GTL", "GBL", "ARE"], [503, 470], "Way Points"),
    AR_End: new node("ARE", ["ARS", "SH", "CY"], [210, 466], "Way Points"),
    MTL: new node("MTL", ["CO", "MTR", "BI"], [304, 78], "Way Points"),
    MTR: new node("MTR", ["MTL", "MBR"], [403, 75], "Way Points"),
    MBL: new node("MBL", ["BI", "CH", "MBR"], [293, 134], "Way Points"),
    MBR: new node("MBR", ["CH", "MTR", "MBL", "MP"], [385, 192], "Way Points"),
    MP: new node("MP", ['MBR', 'ME', "MAM"], [391, 232], "Way Points"),
    MAM: new node("MAM", ["MP", "GTL", "OG"], [421, 275], "Way Points"),
    MAG: new node("MAG", ["OG", "MU"], [256, 298], "Way Points"),
    GTL: new node("GTL", ["UC", "ME", "MAM", "ARS"], [516, 307], "Way Points"),
    GTR: new node("GTR", ["LS", "EC"], [844, 367], "Way Points"),
    GBL: new node("GBL", ["ARS", "GBR"], [477, 470], [508.583], "Way Points"),
    GBR: new node("GBR", ["GBL", "GTR"], [872, 563], "Way Points"),
    //////////////////////////////////////Locations//////////////////////////////////
    EC: new node("EC", ["GTR"], [815, 262]),
    LS: new node("LS", ["GTR", "UC"], [776, 335]),
    UC: new node("UC", ["F1", "F2", "GTL", "LS"], [690, 321]),
    F1: new node("F1", ["UC"], [706, 273]),
    F2: new node("F2", ["UC"], [706, 273]),
    ME: new node("ME", ["PH", "GTL", "MP"], [482, 247]),
    BI: new node("BI", ["MTL", "MBL", ], [269, 143]),
    CO: new node("CO", ["MTL"], [284, 40]),
    CH: new node("CH", ["MBL", "MBR"], [320, 198]),
    PH: new node("PH", ["ME"], [519, 182]),
    SH: new node("SH", ["ARE", "CY"], [210, 466]),
    MU: new node("MU", ["CY", "MAG"], [166, 361]),  //need ,
    PL: new node("PL", ["CY", "GE", "PLE"], [156, 578]), // need
    GE: new node("GE", ["PL"], [178, 702]),
    CY: new node("CY", ["ARE", "PL", "MU", "SH"], [157, 479]),
    OG: new node("OG", ["MAM", "MAG"], [310, 323]),
    PLE: new node("PLE", ["PL"], [88, 572])
};  // Data Base of all the Nodes

///////////////////////////////////////// Path Find Variable base
var Ord = 1
var Explored = []
var visited = []
var TempNodes = []
var CurCon = []
var track = []
var vist = []
var track_Node = [];
var vistited_string = []
var n = 1
var FinalPath = []
// Drawing variable
var img,
imgIsloaded,
imgX = 0,
imgY = 0,
canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');
// PathFinding Algorithm

function PushConToTemp(NodeName) {
    for (i = 0 ; i < NodeName.connect.length ; i++) {
        if (TempNodes.indexOf(Node(NodeName.connect[i])) == -1) {
            if (visited.indexOf(Node(NodeName.connect[i])) == -1) {
                TempNodes.push(Node(NodeName.connect[i]))
            }
        }
    }
}
function Assigntemp(LastPerm,NodeName) {
    if (NodeName.temp >= (LastPerm.perm + NodeName.distance)) {
        NodeName.temp = LastPerm.perm + NodeName.distance
}
}
function AssignConnectedtemp(CurrentPermNode) {
    for (i = 0; i < CurrentPermNode.connect.length ; i++) {
        var ConnectedNode = Node(CurrentPermNode.connect[i])
        if (ConnectedNode.temp >= (CurrentPermNode.perm + ConnectedNode.distance)) {
            ConnectedNode.temp = CurrentPermNode.perm + ConnectedNode.distance
        }
    }
}
function AssignPerm(Node) {
    Node.ord = Ord
    Ord = Ord + 1
    Node.perm = Node.temp
}
function bubbleSort(NodeList) {
    for (i = 0 ; i < NodeList.length - 1 ; i++) {
        for (j = 0 ; j < NodeList.length -1 ; j++) {
            if (NodeList[j].temp <= NodeList[j+1].temp) {
                var a = NodeList[j]
                NodeList[j] = NodeList[j + 1]
                NodeList[j+1]= a
}
}
}
}
// I could convert this to a merge sort

function mergesort(m) {
    console.log("LIST CONFIG")
    console.log(m)
    console.log(m.length)
    console.log("-----------Complete---------")
    if (m.length <= 1) {
        return m
    }
    var left = [],
        right = [];
    for (i = 0; i < m.length;i++){
        if (i < m.length / 2) {
            left.push(m[i])
        } else {
            right.push(m[i])
        }
    }
    console.log("-------Seperated list--------")
    console.log(left)
    console.log(right)
    console.log("-----------------------------")
    left = mergesort(left)
    right = mergesort(right)
    console.log("---------------Before Pass in --------------")
    console.log(left)
    console.log(right)
    return merge(left,right)
}

function merge(left, right) {
    var result = []
    if (left !== undefined && left !== undefined){
        while (left.length !== 0 && right.length !== 0) {
            console.log(left)
            console.log(right)
            if (left[0] <= right[0]) {
                result.push(left.pop())
            } else {
                result.push(right.pop())
            }
        }
    }
    while (right.length > 0) {
        result.push(right.pop())
    }
    return result
}
function retraceLastNode(node, Start) {
    console.log('Current Node:' + node.name)
    console.log('This is the ' + n + ' Recursion')
    n = n +1
    for (i = 0 ; i < node.connect.length; i++) {
//        console.log(i)
        var ConnectedNode = Node(node.connect[i])
        if (ConnectedNode.retracevisited == false) {
            console.log("d1")
            if (ConnectedNode.perm == node.perm - ConnectedNode.distance) {
                console.log("d2")
                track.push(ConnectedNode.name)
                ConnectedNode.retraceLastNode = true
                if (ConnectedNode != Start) {
                    console.log("d3")
                    retraceLastNode(ConnectedNode,Start) // recursive
                } else if (ConnectedNode == Start) {
//                    console.log("d3 = ")
//                    console.log(ConnectedNode)
                    break
                }
            break}
        }
    }
}
function LoopForRetace(current,Start) {
    var Now = retraceLastNode(current,Start)
    while (Now != Start) {
        retraceLastNode(Now,Start)
    }
}
function Pathfind(Start, End) {
    console.log('---1. Assign Temp to Start---')
    Start.temp = 0
    console.log("---2 Assign Perm to Node---")
    AssignPerm(Start)       // Assign permenent value to the current node
    visited.push(Start)   // Push the current Node to the visited list, so that the algorithm will not visit it again
    console.log("---3 Creating Connection array---")
    PushConToTemp(Start)   //Reading the connection array and push it to a temperary node list, where in this list, every node is has an tempary value
    console.log(TempNodes)
    console.log("---4 : Assign Temp value---")
    for (i = 0 ; i < TempNodes.length ; i++) {
        Assigntemp(Start, TempNodes[i])        // Assigning temperary value to all connected Node
    }
    console.log(TempNodes)
    console.log("---5: Sorting TempNodes---")
    bubbleSort(TempNodes)       //           // Find the node with smallest Node using bubble sort
    console.log(mergesort(TempNodes))
    //console.log(End)
    while (End.ord == null) {                  // looping this algorithm until the Destination has an perment value
        console.log("---6: Current node -> smallest temp---")
        console.log(Current)
        var Current = TempNodes.pop()         // Go to the next node
        visited.push(Current)                 // Push it to visited node
        //console.log(TempNodes)
        //console.log("Current Node:" + Current.name)
        console.log("---7: Assign Permentant value for the current node---")
        console.log(Current)
        AssignPerm(Current)                  // Assigning permanent value to the node
       // console.log("Next Order: " + Ord)
      //  console.log("Current Order" + Current.ord)
        console.log("---8: Push the new connected to the Templist---")
      //  console.log(Current)
        PushConToTemp(Current)                  
      //  console.log(TempNodes)
        console.log("---9: Assign Temp Values to the new Node---")
        AssignConnectedtemp(Current)
        console.log("---10: Bubble Sort TempNodes---")
//        if (TempNodes.length > 0) {
//            console.log("---------Start Node-List--------")
//            console.log(TempNodes)
//            console.log("-------------TEmp NODE--------")
        TempNodes = mergesort(TempNodes)
//        }
    }
    //FUNCTION WORKED! RETRACT FROM HERE
    for (i = 0 ; i < visited.length ; i++) {
        vistited_string.push(visited[i].name);
    }
    console.log('visited node:')
    console.log(vistited_string)
    //Debug Ends
    track.push(Current.name)
    retraceLastNode(Current, Start)
    console.log(track)
    track.reverse()
    return track
}
function Node(input) {
    if (input == "EC") {
        return Database.EC;
    } else if (input == "GTL") {
        return Database.GTL
    } else if (input == "GTR") {
        return Database.GTR
    } else if (input == "LS") {
        return Database.LS
    } else if (input == "UC") {
        return Database.UC
    } else if (input == "F1") {
        return Database.F1
    } else if (input == "F2") {
        return Database.F2
    } else if (input == "ME") {
        return Database.ME
    } else if (input == "PH") {
        return Database.PH
    } else if (input == "BI") {
        return Database.BI
    } else if (input == "CO") {
        return Database.CO
    } else if (input == "CH") {
        return Database.CH
    } else if (input == "SH") {
        return Database.SH
    } else if (input == "MU") {
        return Database.MU
    } else if (input == "PL") {
        return Database.PL
    } else if (input == "GE") {
        return Database.GE
    } else if (input == "GLT") {
        return Database.GLT
    } else if (input == "GBL") {
        return Database.GBL
    } else if (input == "ARS") {
        return Database.AR_start
    } else if (input == "ARE") {
        return Database.AR_End
    } else if (input == "CY") {
        return Database.CY
    } else if (input == "MTL") {
        return Database.MTL
    } else if (input == "MTR") {
        return Database.MTR
    } else if (input == "MBL") {
        return Database.MBL
    } else if (input == "MBR") {
        return Database.MBR
    } else if (input == "MP") {
        return Database.MP
    } else if (input == "MAM"){
        return Database.MAM
    } else if (input == "MAG") {
        return Database.MAG
    } else if (input == "OG") {
        return Database.OG
    } else if (input == "GBR") {
        return Database.GBR
    } else if (input == "PLE") {
        return Database.PLE
    }
}

//__INIT__
(function int() {
    Validation()
	console.log(user.pass)
    PathCalc()
    Canvas()
    }
)()

function Validation(){
    if (user.Start == user.End) {
        alert("Please select different Locations")
        window.close()
    }
    TestStartPointType(user.Start)
}
function TestStartPointType(node) {
    if (Node(node).gettype() == true) {
        alert("You can not start with a way point")
        window.close()
    } else {
        console.log(Node.type)
    }
}
function PathCalc(){
	
    if (user.Pass == "Blank" || user.Pass == undefined) {
        alert("No Pass")
        PathFindWithoutPass()
    }else{
        PathFindWithPass()
    }
}

function PathFindWithoutPass() {
    console.log(user.Start + "" + user.End)
    Pathfind(Node(user.Start), Node(user.End))
    PushListElement(track, FinalPath)
}
function PathFindWithPass() {
    Pathfind(Node(user.Start), Node(user.Pass))
    PushListElement(track, FinalPath)
    PathfindReset()
    Pathfind(Node(user.Pass), Node(user.End))
	console.log(track)
    PushListElement(track, FinalPath)
}
function PushListElement(List1, List2) {
    for (i = 0; i < List1.length; i++) {
        List2.push(List1[i])
    }
}
function PathfindReset() {
    Ord = 1
    Explored = []
    visited = []
    TempNodes = []
    CurCon = []
    track = []
    vist = []
    track_Node = [];
    vistited_string = []
    n = 1
    Database = ReplaceDatabase
}
function Canvas() {  // Cancas's Object
    img = new Image()
    img.onload = function () {
        imgIsloaded = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        drawmap(FinalPath)
    }
    img.src = "Picture/map.png"
};
    


function drawmap(path) {
    console.log("//////////////////////CALCULATING TRACK//////////////////////////")
    console.log(path)
    drawLocation(path)  //Draw out the path
    DrawStartPoint(path) // Draw out the starting points
    DrawEndPoint(path) // Draw out the ending points
    DrawPassPoint() //Draw out the mid-points
}
function drawLocation(path) {
    ctx.lineWidth = 5
    ctx.lineJoin = 'round' // Line Join Type
    ctx.strokeStyle = '#66ccff' // Colour of line
    ctx.beginPath();
    ctx.moveTo(Node(path[0]).p1[0], Node(path[0]).p1[1])
    for (i = 1; i < path.length ; i++) {
        ctx.lineTo(Node(path[i]).p1[0], Node(path[i]).p1[1])
    }
    ctx.stroke()
}
function DrawStartPoint(path) {
    ctx.fillStyle = '#00FF00' // Colour of Start Point
    var X_Begin = Node(path[0]).p1[0]
    var Y_Begin = Node(path[0]).p1[1]
    ctx.beginPath()
    ctx.arc(X_Begin, Y_Begin, 5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}
function DrawEndPoint(path) {
    var End = Node(path[path.length - 1])
    ctx.beginPath()
    ctx.fillStyle = "#FF0000"  // Colour for the End Point
    ctx.arc(End.p1[0], End.p1[1], 5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}
function DrawPassPoint() {
    ctx.fillStyle = '#f442ee' // Colour of mid-Point
    ctx.beginPath()
    ctx.arc(Node(user.Pass).p1[0], Node(user.Pass).p1[1], 5, 0, Math.PI * 2)
    ctx.closePath();
    ctx.fill()
}
