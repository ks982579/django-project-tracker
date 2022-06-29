
class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.children = new LinkedList(); //Should always be a list of Tasks...
        this.next = null;
    }
    stringify() {
        return JSON.stringify(this.data);
    }
    setNext(node) {
        /* https://www.geeksforgeeks.org/instanceof-operator-in-javascript/
        */
        if (node instanceof LinkedListNode) {
            this.next = node;
            return this.next;
        } else {
            console.warn(`Could not set next. Instance was not class type "LinkedListNode".`)
        }
    }
}

export class ProjectNode extends LinkedListNode {
    constructor(kwargs) {
        //unable to destructure kwargs - JSON object
        super(kwargs);

        this.id = kwargs.id;
        this.owner = kwargs.owner;
        this.developers = kwargs.developers;
        this.title = kwargs.title;
        this.subTitle = kwargs.sub_title;
        this.startDate = kwargs.start_date; // needs to transform into Date object
        this.endDate = kwargs.end_Date; // again, Date obj... <ProjectCard>
        this.percentComplete = kwargs.percent_complete;
    }
    static create(data) {
        let returnVal;
        try {
            returnVal = new ProjectNode(data);
        } catch (error) {
            console.error(`Unable to create ProjectNode: ${error}`);
        } finally {
            return returnVal;
        }
    }
}
export class TaskNode extends LinkedListNode {
    constructor(kwargs) {
        super(kwargs)

        this.id = kwargs.id;
        this.developers = kwargs.developers;
        this.parentProject = kwargs.parent_project;
        this.parentTask = kwargs.parent_task;
        this.name = kwargs.task_name;
        this.description = kwargs.description;
        this.startDate = kwargs.start_date; // needs to transform into Date object
        this.endDate = kwargs.end_Date; // again, Date obj...
        this.percentComplete = kwargs.percent_complete; //out of 10k
    }
    static create(data) {
        let returnVal;
        try {
            returnVal = new TaskNode(data);
        } catch (error) {
            console.error(`Unable to create TaskNode: ${error}`);
        } finally {
            return returnVal;
        }
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head;
        if (head) {
            this.length = 1;
        } else {
            this.length = 0;
        }
    }

    last() {
        if (this.length == 0) {
            return null;
        } else if (this.length == 1) {
            console.log("returning head")
            return this.head;
        } else {
            // There are multiple nodes in list...
            let nextNode = this.head;
            let keepChecking = true;
            let counter = 0
            while (keepChecking) {
                console.log("Checking for last");
                if(nextNode.next === null){
                    // We found last node
                    console.log('found last node')
                    return nextNode;
                } else if(nextNode.next){
                    // if next node is truthy (valid)
                    console.warn(`Truthy Value -> ListNode: ${nextNode.next instanceof LinkedListNode} | value: ${nextNode.next}`);
                    nextNode = nextNode.next
                    console.log(nextNode.title);
                } else {
                    console.error(`Error w/next node -> ListNode: ${nextNode.next instanceof LinkedListNode} | value: ${nextNode.next}`);
                }
                if(counter > 20) {
                    keepChecking = false;
                } else {
                    counter++;
                }
            }
        }
    }

    push(node) {
        const formatLog = `background-color: navy; color: floralwhite`;
        console.log(`%cInside push(node)`, formatLog);
        if (this.head == null) {
            console.log(`%cNew Head`, formatLog);
            this.head = node;
            console.log(`%c${this.head.stringify()}`, formatLog);
        } else {
            console.log(`%cNew Last`, formatLog);
            let lastNode = this.last();
            lastNode.setNext(node); //Not Complete
            console.log(`%c${this.last().stringify()}`, formatLog);
        }
        this.length++;
    }

    // Append, Pop, Remove, Get...
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
    map(callBack) {
        let currentNode = this.head;
        for(let _e=0; _e < this.length; _e++){
            callBack(currentNode);
            currentNode = currentNode.next;
        }
    }

    static createProjectList(data = null) {
        let returnVal;
        if (data !== null) {
            // Create entire list from an Array!
            console.log("Data not null")
            if(Array.isArray(data)){
                console.log("Project Data is Array")
                returnVal = new LinkedList()
                try {
                    data.forEach(element => {
                        console.log("pushing ProjectNode")
                        returnVal.push(ProjectNode.create(element))
                    });
                } catch (error) {
                    console.error(`Could not create Project-list from Array:\n${error}`)
                }
            } else {
                console.log("Data is not Array");
                try {
                    returnVal = new LinkedList(ProjectNode.create(data));
                } catch (error) {
                    console.log(`Error Creating List: ${error}`);
                    returnVal = new LinkedList()
                }
            }
        } else {
            returnVal = new LinkedList();
        }
        return returnVal
    }
    static createTaskList(data = null) {
        let returnVal;
        if (data !== null) {
            // Create entire list from an Array!
            if(Array.isArray(data)){
                console.log("Task Data is Array")
                returnVal = new LinkedList()
                try {
                    data.forEach(element => {
                        console.log("Pushing TaskNode")
                        returnVal.push(TaskNode.create(element))
                    });
                } catch (error) {
                    console.error(`Could not create Task-list from Array:\n${error}`)
                }
            } else {
                console.log("Data not array");
                try {
                    returnVal = new LinkedList(TaskNode.create(data));
                } catch (error) {
                    console.log(`Error Creating List: ${error}`);
                    returnVal = new LinkedList();
                }
            }
        } else {
            returnVal = new LinkedList();
        }
        return returnVal
    }
}

export default LinkedList;