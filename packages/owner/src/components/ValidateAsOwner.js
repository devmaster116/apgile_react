import React, { useEffect, useState } from "react";
import api from "@evenlogics/whf-api";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Watch } from "react-loader-spinner";

const ValidateAsOwner = (props) => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("rendering");
    setLoader(true);
    const payload = {
      token: props?.match?.params?.token?.split("&")[0],
    };
    console.log(props?.match?.params?.token?.split("&")[0], "token");
    let bearerToken = props?.match?.params?.token
      ?.split("&")?.[1]
      ?.split("|")?.[1];
    console.log(bearerToken, "received Token");
    api
      .request("post", "/auto-login", payload, bearerToken)
      .then(({ data }) => {
        console.log(data?.api_token, "response");
        setLoader(false);

        //  localStorage.setItem('previousUser',JSON.stringify(oldUser));
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...data, authToken: data?.api_token })
        );
      })
      .catch((error) => console.log(error));
  }, [props.match.params.token]);

  return (
    <>
      {loader ? (
        <Watch
          class="text-center"
          heigth="100"
          width="100"
          color="grey"
          ariaLabel="loading"
        />
      ) : (
        window.location.replace("https://js.gotomy.dev/call-btn-j/owner/#/")
      )}
    </>
  );
};

export default ValidateAsOwner;
