import {  makeObservable, observable } from "mobx";

export default class mobXelement{
    title = "current store";
    count = 5;
    action = []

    constructor()
    {
        makeObservable(this, {
            title: observable,
            count: observable
        })
    }

    increment = (i = 1) => { 
        this.count += i;
         this.action.push(`added ${i}`)
        }
    decrement = (i = 1) => {
        this.count += i;
        this.action.push(`decrement ${i}`)
    }

    get totalLenth(){
        return this.action.length;
    }

}