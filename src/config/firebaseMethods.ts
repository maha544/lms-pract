import app from "./firebaseConfig";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const db = getDatabase(app);

export const sendData = (nodeName: string, data: any) => {
  return new Promise((resolve, reject) => {
    data.id = push(ref(db, `${nodeName}`)).key;
    const reference = ref(db, `${nodeName}/${data.id}`);
    set(reference, data)
      .then(() => {
        resolve({ data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};



export const getData = <T>(nodeName: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const reference = ref(db, nodeName);
    onValue(
      reference,
      (snapshot) => {
        const data = snapshot.val();
        const dataArray: T[] = data ? Object.values(data) : [];
        resolve(dataArray);
      },
      (error) => {
        reject(error);
      }
    );
  });
};


export const editData = (nodeName: string, id: string, data: any) => {
  return new Promise((resolve, reject) => {
    const reference = ref(db, `${nodeName}/${id}`);
    set(reference, data)
    .then(() => {
      resolve({ message: "Data edited successfully" });
    })
    .catch((error) => {
      reject({ message: "Data not edited", error });
    });
  });
};




// export const DelData = (nodeName : string , id : any) => {
  //     return new Promise((resolve , reject) => {
    //         const reference = ref(db , `${nodeName}/${id}`);
    //         set(reference , id)
    //         .then(() => {
      //             resolve({message : "Data Deleted Successfully"})
      //         })
      //         .catch(() => {
        //             reject({message : "Data Not Deleted"})
        //         })
        //     })
        // }
        // export const getData = <T>(nodeName: string): Promise<T[]> => {
        //   return new Promise((resolve, reject) => {
        //     const reference = ref(db, nodeName);
        //     onValue(
        //       reference,
        //       (snapshot) => {
        //         const data = snapshot.val();
        //         const dataArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
        //         resolve(dataArray);
        //       },
        //       (error) => {
        //         reject(error);
        //       }
        //     );
        //   });
        // };