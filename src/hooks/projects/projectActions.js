export const handleProjectSubmit = async (
    data,
    session,
    editProjectData,
    featuredPhoto,
    excerpt,
    createProject,
    editProject
  ) => {
    const blocks = await data.editorRef.current?.save();
    const payload = {
      title: data.title,
      content: blocks,
      session: session,
      featuredPhoto: featuredPhoto,
      excerpt: excerpt,
    };
  
    // Validation
    const missingContent = payload.content.blocks.length === 0;
    console.log("Title in handleProjectSubmit:", payload.title); // Debugging line to check the title
    const missingTitle = payload.title === "";
    if (missingContent || missingTitle) {
      missingContent && !missingTitle && alert("Content is empty :(");
      missingTitle &&
        !missingContent &&
        alert("You can't just leave the title empty :(");
      missingContent && missingTitle && alert("Bro are you kidding me? xD");
      // everything filled in? continue:
    } else {
      // are we editing project?
      if (editProjectData) {
        // basically if user role is admin, enable project edit.
        if (session.user.role === "admin") {
          editProject(payload);
        } else if (editProjectData.authorId !== session.user.id) {
          console.log("you are NOT author");
          toast("You are not the author of this project. :(");
        } else {
          toast("You don't have privileges to edit this project!");
        }
        // If we are not editing project, create it.
      } else {
        createProject(payload);
      }
    }
  };
  