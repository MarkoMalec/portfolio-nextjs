import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "~/pages/api/uploadthing";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>()