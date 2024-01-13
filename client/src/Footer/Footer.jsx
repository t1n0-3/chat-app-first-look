import { useContext, useState } from "react";
import { authContext } from "../context/authContext";

export default function Footer() {

  const { setChatId, chatId } = useContext(authContext)

  return (
    <footer style={{
      backgroundColor: 'lightgray',
      padding: '10px',
      position: 'fixed',
      bottom: 0,
      height: '5px',
      width: '100%',
      textAlign: 'center'
    }}>
      <p>© 2022 Your Company</p>
    </footer>
  );
};

