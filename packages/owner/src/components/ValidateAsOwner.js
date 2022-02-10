import React, { useEffect } from "react";
import api from "@evenlogics/whf-api";
// import { Watch } from "react-loader-spinner";

const ValidateAsOwner = (props) => {
  // const [loader, setLoader] = useState(false);

  useEffect(() => {
    // setLoader(true);
    const payload = {
      token: props?.match?.params?.token?.split("&")[0],
    };
    let bearerToken = props?.match?.params?.token?.split("&")?.[1]?.split("|")?.[1];
    api.request("post", "/auto-login", payload, bearerToken)
      .then(({ data }) => {
        localStorage.setItem("currentUser",JSON.stringify({ ...data, authToken: data?.api_token }));
        window.location.replace("https://js.gotomy.dev/call-btn-j/owner/#/dashboard")
        window.location.reload()
      })
      .catch((error) => console.log(error));
  }, [props.match.params.token]);

  return (
    <>
      {/* loader && (
        <div style={{textAlign:"center",width:"100%"}}>
        <Watch
          class="text-center"
          heigth="100"
          width="100"
          color="grey"
          ariaLabel="loading"
        />
        </div> */}
      {/* ) */}
      </>
  );
};

export default ValidateAsOwner;
