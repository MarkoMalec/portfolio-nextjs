import { useSession, signOut } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { useState, useEffect } from "react";
import { PrismaClient } from '@prisma/client';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const data = await response.json();
        console.log('Post created:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
};


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
