import React from 'react';

const PostEditorSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <aside className="post_editor--sidebar">
            {children}
        </aside>
    );

}

export default PostEditorSidebar;