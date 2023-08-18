import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "~/pages/api/uploadthing";
 
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
