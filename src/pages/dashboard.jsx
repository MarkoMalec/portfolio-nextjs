import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSession, signOut } from 'next-auth/react';

const Dashboard = ({ user }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  if (!session) {
    return (
      <div>
        You are not logged in!
        <br />
        <a href="/login">Login</a>
      </div>
    );
  }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await fetch('/api/posts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title: title,
//                 content: content,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to create post');
//         }

//         const data = await response.json();
//         console.log('Post created:', data);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// };

const { mutate: createPost, isLoading } = useMutation({
  mutationFn: async () => {
    const payload = {
      title,
      content,
      session
    };

    const { data } = await axios.post('http://localhost:3000/api/posts', payload, { withCredentials: true });
    return data;
  },
  onError: (err) => {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        console.error("User is not authenticated");
        // Handle unauthorized error
        return;
      }
      console.error("Failed to create post:", err.message);
    }
  },
  onSuccess: (data) => {
    console.log("Post created:", data);
    // Handle success - for example, clear the input fields
    setTitle('');
    setContent('');
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  createPost();
};

isLoading ?? 'loading';


  return (
    <div id="dashboard" className="dashboard-container">
      <form className="create-article" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Create Post</button>
      </form>
      <button className="btn btn-primary" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session.user,
    },
  };
};

export default Dashboard;
