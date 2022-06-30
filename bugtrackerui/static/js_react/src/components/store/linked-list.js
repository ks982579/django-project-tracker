
class KevNode {
    constructor(data) {
        this.data = data;
    }
    stringify() {
        return JSON.stringify(this.data);
    }
}

export class ProjectNode extends KevNode {
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
export class TaskNode extends KevNode {
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