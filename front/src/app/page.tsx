"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return <p>{message}</p>;
}
