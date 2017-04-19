var list = []
function generateList(n) {
    for (i = 0 ; i < n ; i++) {
        list.push(Math.floor(Math.random()*13)+1)
    }
}
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

    return merge(mergesort(left), mergesort(right))
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
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

function bubbleSort(NodeList) {
    console.log("Enter")
    for (i = 0 ; i < NodeList.length - 1 ; i++) {
        for (j = 0 ; j < NodeList.length - 1 ; j++) {
            if (NodeList[j] <= NodeList[j + 1]) {
                var a = NodeList[j]
                NodeList[j] = NodeList[j + 1]
                NodeList[j + 1] = a
            }
        }
    }
}
generateList(31);
console.log(list);
bubbleSort(list)
//list = mergesort(list);
console.log(list)

