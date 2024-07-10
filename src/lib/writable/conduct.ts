import { writable } from "svelte/store";

export const write=writable({settings:{},title:{title:'',desc:''},qns:[],started:false})

export const taken=writable({info:{},settings:{},qns:[],ans:[]})

export const quizzzz=writable({state:true,cur_dur:0,end:false})

export const sendcopy=writable({send:false,do_it:false,submit:false})


export const endpage=writable({mode:1,prev:0,curr:0})