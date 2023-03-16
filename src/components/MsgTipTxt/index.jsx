import { useState, useEffect } from "react";
export default function MsgTipTxt(props) {
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMsg(props.msg);
  }, [props.msg]);

  useEffect(() => {
    setIsSuccess(props.isSuccess);
  }, [props.isSuccess]);

  return (
    <div
      style={{
        color: isSuccess ? "#38E274" : "#FCDA01",
        marginTop: 5,
      }}
    >
      {msg}
    </div>
  );
}
