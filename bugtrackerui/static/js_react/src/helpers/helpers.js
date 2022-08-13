
const Helpers = {};

/**
 * The Graph should already be fairly in order. 
 * Insertion sort is a good choice for data that is nearly ordered already (I think)...
 * Anything that doesn't need sorting is O(n)
*/

Helpers.insertionSort = (mixedList, field) => {
    // Go thru list starting at second element
    for (let _i = 1; _i < mixedList.length; _i++) {
        //Handle null cases
        let currentField = mixedList[_i][field] !== null ? mixedList[_i][field] : Number.POSITIVE_INFINITY;
        let previousField = mixedList[_i-1][field] !== null ? mixedList[_i-1][field] : Number.POSITIVE_INFINITY;
        // If the current is less than previous value
        if (currentField < previousField) {
            //Switch the values
            [mixedList[_i], mixedList[_i - 1]] = [mixedList[_i - 1], mixedList[_i]];
            //move index back to check previous values
            _i = Math.max(0, _i - 2);
            // It will move up +1 at end of loop
        }
    }
}

Helpers.graphSort = (graph, sortField, diveField) => {
    //Begin the dive
    for (let _efk of graph) {
        if (_efk[diveField] && _efk[diveField].length > 1) {
            // Recursive dive 
            Helpers.graphSort(_efk[diveField], sortField, diveField);
        } else {
            continue;
        }
    }
    // If end of list, then sort
    Helpers.insertionSort(graph, sortField);
}

Helpers.deepCopy = (objectToCopy) => {
    return JSON.parse(JSON.stringify(objectToCopy));
}

export default Helpers;