import { makeAutoObservable } from "mobx";


export default class FilterObserve
{
    filter = "all"
    startDate = new Date().toISOString();

    constructor(){
        makeAutoObservable(this);
    }

    setFilter = (filter: string) => 
    {
            this.filter = filter;
    }

    setDate = (date: Date) => 
    {
        this.startDate = date.toISOString()
    }

}