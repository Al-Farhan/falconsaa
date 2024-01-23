import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Myaccount = () => {
  let router = useRouter();
  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [router.query]);

  return <div>Myaccount</div>;
};

export default Myaccount;
