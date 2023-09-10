export const handlePostSubmit = async (
  data,
  session,
  editPostData,
  featuredPhoto,
  excerpt,
  createPost,
  editPost
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
  console.log("Title in handlePostSubmit:", payload.title); // Debugging line to check the title
  const missingTitle = payload.title === "";
  if (missingContent || missingTitle) {
    missingContent && !missingTitle && alert("Content is empty :(");
    missingTitle &&
      !missingContent &&
      alert("You can't just leave the title empty :(");
    missingContent && missingTitle && alert("Bro are you kidding me? xD");
    // everything filled in? continue:
  } else {
    // are we editing post?
    if (editPostData) {
      // basically if user role is admin, enable post edit.
      if (session.user.role === "admin") {
        editPost(payload);
      } else if (editPostData.authorId !== session.user.id) {
        console.log("you are NOT author");
        toast("You are not the author of this post. :(");
      } else {
        toast("You don't have privileges to edit this post!");
      }
      // If we are not editing post, create it.
    } else {
      createPost(payload);
    }
  }
};
