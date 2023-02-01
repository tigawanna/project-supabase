
import { useEffect } from 'react';

const useDelay=(seconds:number)=>{
useEffect(() => {
  const timer = setTimeout(() => {
    //console.log("This will run after 1 second!");
  }, seconds *1000);
  return () => clearTimeout(timer);
}, []);
}
