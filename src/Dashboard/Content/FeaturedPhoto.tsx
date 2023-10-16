import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import placeholder from "@assets/placeholder.svg";
import Image from "next/image";
import Card from "@Dashboard/Card";

type FeaturedPhotoProps = {
  initialPhoto?: string;
  setFeaturedPhoto?: any;
}

function FeaturedPhoto({ initialPhoto, setFeaturedPhoto }: FeaturedPhotoProps) {
  const [photo, setPhoto] = useState(initialPhoto || "");

  return (
    <Card title="Featured photo" className="featured_image-block">
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
    </Card>
  );
}

export default FeaturedPhoto;
