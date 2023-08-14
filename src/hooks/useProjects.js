import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDatabase, ref, onValue, off } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";

const getImageDownloadURL = async (imagePath) => {
  try {
    const storage = getStorage(app);
    const imageRef = storageRef(storage, imagePath);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error fetching image download URL:", error);
    return null;
  }
};

const useProjects = () => {
  const queryClient = useQueryClient();
  const [projects, setProjects] = useState([]);

  useQuery(
    "projects",
    async () => {
      const db = getDatabase(app);
      const projectsRef = ref(db, "projects");

      const onValueChange = onValue(projectsRef, async (snapshot) => {
        const data = snapshot.val();
        const formattedDataPromises = Object.keys(data).map(async (key) => {
          const imagePath = data[key].image;
          const imageURL = imagePath
            ? await getImageDownloadURL(imagePath)
            : null;
          return {
            id: key,
            ...data[key],
            imageURL,
          };
        });

        const formattedData = await Promise.all(formattedDataPromises);
        setProjects(formattedData);
        queryClient.setQueryData("projects", formattedData);
      });

      return () => off(projectsRef, "value", onValueChange);
    },
    []
  );

  return projects;
};

export default useProjects;
