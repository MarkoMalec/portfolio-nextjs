import Link from 'next/link';
import React from 'react';

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2'
  },
  td: {
    color: 'white',
    fontWeight: '300',
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
    height: '80px'
  },
  responsiveDiv: {
    overflowX: 'auto'
  }
};

const PostTable = ({ posts }) => {
    // Convert ISO string dates to JavaScript Date objects
    const formattedPosts = posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }));
  
    // If needed in the future, you can sort them like:
    // formattedPosts.sort((a, b) => b.createdAt - a.createdAt); // For sorting in descending order
  
    return (
      <div style={styles.responsiveDiv}>
        <table id="posts_table" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {formattedPosts.map(post => (
              <tr key={post.id}>
                <td style={styles.td}>{post.id}</td>
                <td style={styles.td}><Link href={`/dashboard/post/${post.id}`}>{post.title}</Link></td>
                <td style={styles.td}>{post.createdAt.toDateString()}</td>
                <td style={styles.td}>{post.updatedAt.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PostTable;