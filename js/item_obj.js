class Item{
    constructor(name, dueDate){
        this.name = name;
        this.dueDate = dueDate
        this.stamp = this.createTimeStamp();
    }
}