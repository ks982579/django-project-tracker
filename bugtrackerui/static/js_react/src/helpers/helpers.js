
const Helpers = {};

let mockData = [
    {
        name: "John",
        date: 5,
        others: [
            {
                name: "Alex",
                date: 23,
                others: null,
            }, 
            {
                name: "Steve",
                date: 19,
                others: null,
            }, 
            {
                name: "Courtney",
                date: 18,
                others: [
                    {
                        name: "Cag-lar",
                        date: 30,
                        others: null,
                    }, 
                    {
                        name: "Larry",
                        date: 32,
                        others: null,
                    }, 
                    {
                        name: "Britney",
                        date: 33,
                        others: null,
                    }, 
                    {
                        name: "Ek-en-su",
                        date: 31,
                        others: null,
                    }, 
                ],
            }, 
            {
                name: "Tod",
                date: 20,
                others: null,
            }, 
        ]
    },
    {
        name: "Tracey",
        date: 4,
        others: [
            {
                name: "Alex",
                date: 23,
                others: null,
            }, 
            {
                name: "Steve",
                date: 19,
                others: null,
            }, 
            {
                name: "Courtney",
                date: 18,
                others: [
                    {
                        name: "Cag-lar",
                        date: 30,
                        others: null,
                    }, 
                    {
                        name: "Larry",
                        date: 32,
                        others: null,
                    }, 
                    {
                        name: "Britney",
                        date: 33,
                        others: null,
                    }, 
                    {
                        name: "Ek-en-su",
                        date: 31,
                        others: null,
                    }, 
                ],
            }, 
            {
                name: "Tod",
                date: 20,
                others: null,
            }, 
        ]
    }
]

/**
 * The Graph should already be fairly in order. 
 * Insertion sort is a good choice for data that is nearly ordered already (I think)...
 * need to dive in
 * you can pass in a node that I can try to find, probably breadth first search
 * that could also build our list...
 * Or we can sort the whole thing. Anything that doesn't need sorting is O(n)
 * @param {The graph to sort} graph 
 * @param {Field in graph to sort by} field 
 * @param {set to 'false' for descending order} ascend 
 * @returns ordered graph
*/

// True False check
const biggerThan = (_list, _field, _currentPos, _checkedPos) => {
    console.log(_list[_currentPos][_field]);
    // if(_list[_currentPos][_field]<_list[_checkedPos][_field]){

    // }
}

// splice(index, #_to_remove, ...[insert]) out and then in
Helpers.quickSort = (list, field, ascend=true) => {
    console.log('Testing...')
    console.log(JSON.stringify(list))
    console.log(field)
    for(let _x = 0; _x < list.length; _x++){
        //We can't compare the first
        if(_x === 0) {
            continue;
        };
        biggerThan(list, field, 0, 0)
    }
    return sortedGraph = 0;
};

Helpers.quickSort(mockData, 'date')

//export default Helpers;