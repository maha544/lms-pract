import app from "./firebaseConfig";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const db = getDatabase(app);

export const sendData = (nodeName : string , data : any) => {
    return new Promise((resolve , reject) => {
        data.id = push(ref(db , `${nodeName}`)).key;
        const reference = ref(db , `${nodeName}/${data.id}`);
        set(reference , data)
        .then(() => {
            resolve({data})
        })
        .catch((error) => {
            reject(error)
        })

    })
}

export const getData = (nodeName : string , id ? : any) => {
        const reference = ref(db , `${nodeName}/${id ? id : ''}`);
        onValue(reference , (dt) => {
            console.log(dt.val());
        })
}

export const EditData = (nodeName : string ,id : string, data: any)=>{
    return new Promise((resolve , reject)=>{
      const reference = ref(db , `${nodeName}/${data.id}`);
      set(reference, data)
      .then(() => {
        resolve({message : "Data Edit Ssuccessfully"})
      })
      .catch((err) => {
        reject({message : "Data Not Edit"})
      })
  
    })
}

export const DelData = (nodeName : string , id : any) => {
    return new Promise((resolve , reject) => {
        const reference = ref(db , `${nodeName}/${id}`);
        set(reference , id)
        .then(() => {
            resolve({message : "Data Deleted Successfully"})
        })
        .catch(() => {
            reject({message : "Data Not Deleted"})
        })
    })
}