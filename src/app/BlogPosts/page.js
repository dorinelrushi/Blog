"use client";
import { useEffect, useState } from "react";
import ListBlog from "../compoenents/Header/ListBlog";
import Popup from "../compoenents/Popup";

export default function BlogPosts() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // Show popup after 5 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <>
      <main>
        <ListBlog />
      </main>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
}
