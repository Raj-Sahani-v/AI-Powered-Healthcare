import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DoctorsData = createContext();
export const ContextApiData = ({children}) => {
    const [allDoctorsData , setAllDoctorsData] = useState(null);

    useEffect(()=>{
        (async()=>{
            try {
                let res = await axios(`http://localhost:5000/api/v1/doctor/all-doctor`);
                console.log(res.data.data)
                setAllDoctorsData(res.data.data);
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

  return (
    <DoctorsData.Provider value={{allDoctorsData}}>
        {children}
    </DoctorsData.Provider>
  )
}
