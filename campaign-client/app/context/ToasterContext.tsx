'use client';

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return ( 
    <Toaster toastOptions={{
      style: {
        backgroundColor: 'rgb(17 24 39 / 1)',
        color: 'white'
      }
    }}/>
   );
}
 
export default ToasterContext;