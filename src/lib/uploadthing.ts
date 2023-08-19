import { generateReactHelpers } from "@uploadthing/react/hooks";
import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "~/server/uploadthing";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>()

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();