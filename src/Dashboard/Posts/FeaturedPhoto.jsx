import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import placeholder from "@assets/placeholder.svg";
import Image from "next/image";

function FeaturedPhoto({ initialPhoto, setFeaturedPhoto }) {
  const [photo, setPhoto] = useState(initialPhoto || "");

  return (
    <section className="dashboard-block featured_image-block">
      <h5>Featured photo</h5>
      <div className="featured_image-preview">
        <Image
          src={photo ? photo : placeholder}
          alt="featured post image"
          width="600"
          height="600"
        />
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setPhoto(res[0].fileUrl);
          setFeaturedPhoto(res[0].fileUrl);
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </section>
  );
}

export default FeaturedPhoto;
