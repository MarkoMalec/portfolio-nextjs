// import dynamic from "next/dynamic";

// const Output = dynamic(
//   async () => (await import("editorjs-react-renderer")).default,
//   { ssr: false }
// );

// function SinglePostPage({ post }) {
//   if (!post) {
//     return <div>loading</div>;
//   }

//   const contentObject = JSON.parse(post.content);

//   return (
//       {/* <Output data={contentObject} /> */}
//     </DashboardLayout>
//   );
// }

// export default SinglePostPage;

// export async function getServerSideProps(context) {
//   const post = await fetchSinglePost(context.params.postId);

//   return {
//     props: {
//       post,
//     },
//   };
// }