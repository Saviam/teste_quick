import React, { useState, useEffect } from 'react';
import { getComments, createComment, updateComment, deleteComment } from '../api';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ text: '' });
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getComments();
        setComments(result.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, []);

  const handleCreate = async () => {
    try {
      const result = await createComment(newComment);
      setComments([...comments, result.data]);
      setNewComment({ text: '' });
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedComment = { text: editCommentText };
      await updateComment(id, updatedComment);
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, ...updatedComment } : comment
      ));
      setEditCommentId(null);
      setEditCommentText('');
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4 pt-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Comments</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Create Comment</h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newComment.text}
              onChange={(e) => setNewComment({ text: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your comment"
            />
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Add Comment
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Comments List</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 border border-gray-200 rounded">
              {editCommentId === comment.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleUpdate(comment.id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded focus:outline-none focus:ring focus:ring-green-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-800">{comment.text}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => { setEditCommentId(comment.id); setEditCommentText(comment.text); }}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded focus:outline-none focus:ring focus:ring-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:ring focus:ring-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
