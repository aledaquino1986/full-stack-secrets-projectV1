import React, { useState, useEffect } from "react";

const Loader = ({ loadingText = "Loading", speed = 300 }) => {
  const [loading, setLoading] = useState(loadingText);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(text => {
        return text === loadingText + "..." ? loadingText : text + ".";
      });
    }, speed);

    return () => clearInterval(interval);
  }, [loading, speed]);

  return <h2>{loading}</h2>;
};

export default Loader;
