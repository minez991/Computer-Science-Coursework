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
    this.x = coordinate[0]
    this.y = coordinate[1]
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
    AR_start: new node("ARS", ["GBL", "SH", "GTL"], [503, 470]),
    MTL: new node("MTL", ["CO", "MTR", "BI","MBL"], [304, 78]),
    MTR: new node("MTR", ["MTL", "MBR"], [403, 75]),
    MBL: new node("MBL", ["BI", "CH", "MBR", "MTL"], [302, 179]),
    MBR: new node("MBR", ["CH", "MTR", "MBL", "MP"], [385, 192]),
    MP: new node("MP", ['MBR', 'ME', "MAM"], [391, 232]),
    MAM: new node("MAM", ["MP", "GTL", "OG"], [382, 285]),
    MAG: new node("MAG", ["OG", "MU"], [256, 298]),
    GTL: new node("GTL", ["ME", "MAM", "ARS", "OG", "UC"], [516, 307]),
    GTR: new node("GTR", ["EC", "GBR", "LS",'UC'], [844, 367]),
    GBL: new node("GBL", ["ARS", "GBR"], [511, 579]),
    GBR: new node("GBR", ["GBL", "GTR"], [872, 563]),
    //////////////////////////////////////Locations//////////////////////////////////
    EC: new node("EC", ["GTR"], [815, 262]),
    LS: new node("LS", ["GTR", "UC"], [776, 335]),
    UC: new node("UC", ["F1", "F2", "LS", "GTL", "GTR"], [690, 321]),
    F1: new node("F1", ["UC"], [706, 273]),
    F2: new node("F2", ["UC"], [706, 273]),
    ME: new node("ME", ["PH", "GTL", "MP"], [482, 247]),
    BI: new node("BI", ["MTL", "MBL"], [269, 143]),
    CO: new node("CO", ["MTL"], [284, 40]),
    CH: new node("CH", ["MBL", "MBR"], [320, 198]),
    PH: new node("PH", ["ME"], [519, 182]),
    SH: new node("SH", ["CY", "OG","ARS"], [210, 466]),
    MU: new node("MU", ["CY", "MAG"], [166, 361]),  //need ,
    PL: new node("PL", ["CY", "GE", "PLE"], [156, 578]), // need
    GE: new node("GE", ["PL"], [178, 702]),
    CY: new node("CY", ["PL", "MU", "SH"], [157, 479]),
    OG: new node("OG", ["MAG", "SH", "GTL", "MAM"], [310, 323]),
    PLE: new node("PLE", ["PL"], [88, 572])
};  // Data Base of all the Nodes


var ReplaceDatabase = {
    AR_start: new node("ARS", ["GBL", "SH", "GTL"], [503, 470]),
    MTL: new node("MTL", ["CO", "MTR", "BI", "MBL"], [304, 78]),
    MTR: new node("MTR", ["MTL", "MBR"], [403, 75]),
    MBL: new node("MBL", ["BI", "CH", "MBR", "MTL"], [302, 179]),
    MBR: new node("MBR", ["CH", "MTR", "MBL", "MP"], [385, 192]),
    MP: new node("MP", ['MBR', 'ME', "MAM"], [391, 232]),
    MAM: new node("MAM", ["MP", "GTL", "OG"], [382, 285]),
    MAG: new node("MAG", ["OG", "MU"], [256, 298]),
    GTL: new node("GTL", ["ME", "MAM", "ARS", "OG", "UC"], [516, 307]),
    GTR: new node("GTR", ["EC", "GBR", "LS", 'UC'], [844, 367]),
    GBL: new node("GBL", ["ARS", "GBR"], [511, 579]),
    GBR: new node("GBR", ["GBL", "GTR"], [872, 563]),
    //////////////////////////////////////Locations//////////////////////////////////
    EC: new node("EC", ["GTR"], [815, 262]),
    LS: new node("LS", ["GTR", "UC"], [776, 335]),
    UC: new node("UC", ["F1", "F2", "LS", "GTL", "GTR"], [690, 321]),
    F1: new node("F1", ["UC"], [706, 273]),
    F2: new node("F2", ["UC"], [706, 273]),
    ME: new node("ME", ["PH", "GTL", "MP"], [482, 247]),
    BI: new node("BI", ["MTL", "MBL"], [269, 143]),
    CO: new node("CO", ["MTL"], [284, 40]),
    CH: new node("CH", ["MBL", "MBR"], [320, 198]),
    PH: new node("PH", ["ME"], [519, 182]),
    SH: new node("SH", ["CY", "OG", "ARS"], [210, 466]),
    MU: new node("MU", ["CY", "MAG"], [166, 361]),  //need ,
    PL: new node("PL", ["CY", "GE", "PLE"], [156, 578]), // need
    GE: new node("GE", ["PL"], [178, 702]),
    CY: new node("CY", ["PL", "MU", "SH"], [157, 479]),
    OG: new node("OG", ["MAG", "SH", "GTL", "MAM"], [310, 323]),
    PLE: new node("PLE", ["PL"], [88, 572]),

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
    if (m.length < 2)
        return m;

    var middle = parseInt(m.length / 2),
        left = m.slice(0, middle),
        right = m.slice(middle, m.length)

    console.log("-------Seperated list--------")
    console.log(left)
    console.log(right)
    console.log("-----------------------------")

    return merge(mergesort(left),mergesort(right))
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0].temp >= right[0].temp) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function retraceLastNode(node, Start) {
    console.log('Current Node:' + node.name)
    console.log('This is the ' + n + ' Recursion')
    n = n + 1
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
                    retraceLastNode(ConnectedNode, Start)
                } else if (ConnectedNode == Start) {
                    //                    console.log("d3 = ")
                    //                    console.log(ConnectedNode)
                    break
                }
                break
            }
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
    console.log("---4 : Assign Temp value---")
    for (i = 0 ; i < TempNodes.length ; i++) {
        Assigntemp(Start, TempNodes[i])        // Assigning temperary value to all connected Node
    }
    console.log("---5: Sorting TempNodes---")

    //bubbleSort(TempNodes)
    TempNodes = mergesort(TempNodes)       //           // Find the node with smallest Node using bubble sort
    //TempNodes = quickSort(TempNodes)

    while (End.ord == null) {                  // looping this algorithm until the Destination has an perment value
        console.log("---6: Current node -> smallest temp---")
        var Current = TempNodes.pop()         // Go to the next node
        visited.push(Current)                 // Push it to visited node
        console.log("---7: Assign Permentant value for the current node---")
        AssignPerm(Current)                  // Assigning permanent value to the node
        console.log("---8: Push the new connected to the Templist---")
        PushConToTemp(Current)                  
        console.log("---9: Assign Temp Values to the new Node---")
        AssignConnectedtemp(Current)

        console.log("---10: Sort TempNodes---")
        //bubbleSort(TempNodes)
        TempNodes = mergesort(TempNodes)
        //TempNodes = quickSort(TempNodes)

    }
    for (i = 0 ; i < visited.length ; i++) {
        vistited_string.push(visited[i].name);
    }
    console.log('visited node:')
    console.log(vistited_string)
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
    console.log("Start: " + user.Start + "\nEnd: " +user.End + "\nPass: "+ user.Pass)
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
        PathFindWithoutPass()
    }else{
        PathFindWithPass()
    }
}

function PathFindWithoutPass() {
    console.log(user.Start + "" + user.End)
    FinalPath.push(Pathfind(Node(user.Start), Node(user.End)))
    //PushListElement(track, FinalPath)
}
function PathFindWithPass() {
    FinalPath.push(Pathfind(Node(user.Start), Node(user.Pass)))
    PathfindReset()
    FinalPath.push(Pathfind(Node(user.Pass), Node(user.End)))
	console.log(track)
}
/*function PushListElement(List1, List2) {
    for (i = 0; i < List1.length; i++) {
        List2.push(List1[i])
    }
}*/
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
        if (FinalPath[1] != undefined) {
            drawDirect(FinalPath[1], '#66ccff')
        }
        drawDirect(FinalPath[0],'#66ccff')
        DrawPoints(Node(user.Start),Node(user.End))
    }
    img.src = "Picture/map.png"
};
    
function DrawPoints(Start,End) {
    DrawStartPoint(Start) // Draw out the starting points
    DrawEndPoint(End) // Draw out the ending points
    DrawPassPoint()
}
function drawDirect(path,Colour) {
    ctx.lineWidth = 5
    ctx.lineJoin = 'round' // Line Join Type
    ctx.strokeStyle = Colour // Colour of line
    ctx.beginPath();
    ctx.moveTo(Node(path[0]).x, Node(path[0]).y)
    for (i = 1; i < path.length ; i++) {
        canvas_arrow(ctx, Node(path[i - 1]).x, Node(path[i - 1]).y, Node(path[i]).x, Node(path[i]).y)
    }
    ctx.stroke()
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 20;   // length of head in pixels
    var angle = Math.atan2(toy - fromy, tox - fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function DrawStartPoint(Start) {
    ctx.fillStyle = '#00FF00' // Colour of Start Point
    ctx.beginPath()
    ctx.arc(Start.x, Start.y, 5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}
function DrawEndPoint(End) {
    ctx.beginPath()
    ctx.fillStyle = "#FF0000"  // Colour for the End Point
    ctx.arc(End.x, End.y, 5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}
function DrawPassPoint() {
    ctx.fillStyle = '#f442ee' // Colour of mid-Point
    ctx.beginPath()
    ctx.arc(Node(user.Pass).x, Node(user.Pass).y, 5, 0, Math.PI * 2)
    ctx.closePath();
    ctx.fill()
}
