import {v4 as uuidv4} from 'uuid'
import { auth } from '../config/firbase.config';

export const menu = [
    {id: uuidv4(), name:"Projects", url: "/home/projects" },
    {id: uuidv4(), name:"Collections", url: "/home/collection" },
    {id: uuidv4(), name:"Profile", url: "/home/profile" },
];

export const signOutAction = async() =>{
    await auth.signOut().then(()=> {
        window.location.reload();
    });
};