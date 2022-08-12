
const Helpers = {};

let mockData = {
    one: {
        name: "John",
        date: 5,
        others: {
            one: {
                name: "Alex",
                date: 23,
                others: null,
            }, 
            two: {
                name: "Steve",
                date: 19,
                others: null,
            }, 
        }
    }
}

/**
 * The Graph should already be fairly in order. 
 * Insertion sort is a good choice for data that is nearly ordered already (I think)...
 * @param {The graph to sort} graph 
 * @param {Field in graph to sort by} field 
 * @param {set to 'false' for descending order} ascend 
 * @returns ordered graph
 */
Helpers.quickSort = (graph, field, ascend=true) => {
    console.log('Testing...')
    return sortedGraph = 0;
};

Helpers.quickSort(1,2)

//export default Helpers;