
class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.children = new LinkedList(); //Should always be a list of Tasks...
        this.next = null;
    }
    stringify(){
        return JSON.stringify(this.data);
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
        this.endDate = kwargs.end_Date; // again, Date obj...
        this.percentComplete = kwargs.percent_complete;
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
}

class LinkedList {
    constructor(head=null) {
        this.head = head;
        if(head){
            this.length = 1;
        } else {
            this.length = 0;
        }
    }

    addition(){
        return null;
    }

    get last() {
        if(this.length == 0){
            return null;
        } else if(this.length == 1){
            return this.head;
        } else {
            let nextNode = this.head.next;
            let keepChecking = true;
            while(keepChecking){
                if(nextNode.next == null){
                    keepChecking = false;
                    return nextNode;
                } else {
                    nextNode = nextNode.next;
                }
            }
        }
    }
    
    push(node) {
        const formatLog = `background-color: navy; color: floralwhite`;
        console.log(`%cInside push(node)`, formatLog);
        if(this.head == null){
            console.log(`%cNew Head`, formatLog);
            this.head = node;
            console.log(`%c${this.head.stringify()}`, formatLog);
        } else {
            console.log(`%cNew Last`, formatLog);
            let lastNode = this.last;
            lastNode.next = node; //Not Complete
            console.log(`%c${this.last.stringify()}`, formatLog);
        }
        this.length++
    }
    // Append, Pop, Remove, Get...
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

}

export default LinkedList;