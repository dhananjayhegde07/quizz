import { writable } from "svelte/store";
type crd={
    username:string,
    key:string
}
export const crd=writable<crd>({username:'',key:''})
export const details=writable<any>({})