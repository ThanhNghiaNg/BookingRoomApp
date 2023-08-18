import React, { useEffect, useState } from "react";
import axios from "axios";

interface RandomImageProps {
  ClassName?: string;
}

const RandomImage = ({ ClassName = "" }: RandomImageProps) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              query: "travel",
              orientation: "landscape",
              client_id: "RjL3TqjaLAfLCYIKJlXAoSIL2uM2lQVfRufAorKw330", // Thay YOUR_ACCESS_KEY bằng Access Key của bạn
            },
          }
        );

        setImage(response.data.urls.regular);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div>
      {image && <img className={`${ClassName}`} src={image} alt="Random" />}
    </div>
  );
};

export default RandomImage;
