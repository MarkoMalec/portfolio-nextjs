import React from 'react';
import { fetchSinglePost } from '@utils/data-fetching';

function SinglePost({ postTitle }) {
    console.log(postTitle);
  return (
    <div>index</div>
  )
}

export default SinglePost;

export async function getServerSideProps(context) {
    console.log(context.params.postTitle)
    const postTitle = await fetchSinglePost(context.params.postTitle);
  
    return {
      props: {
        postTitle,
      },
    };
  }