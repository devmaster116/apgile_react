import React,{useEffect,useState} from 'react';
// import api from "@evenlogics/whf-api";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Watch } from  'react-loader-spinner'

const ValidateAsOwner = (props) => {

const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true)
        console.log(window.location.search);
    }, []);
    


  return (
    <>
      {loader ? (
        <Watch class="text-center" heigth="100" width="100" color="grey" ariaLabel="loading" />
      ) : (
        <div>HI</div>
      )}
    </>
  );
  
  
};

export default ValidateAsOwner;
