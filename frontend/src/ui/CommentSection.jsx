import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowDown, FaUserCircle, FaEllipsisV } from "react-icons/fa";

const CommentSectionContainer = styled.div`
  margin: 1rem;
  width: inherit;
  background-color: var(--color-card);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  left: -0.3rem;
`;

const ToggleButton = styled.button`
  background: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 3px 20px;
  cursor: pointer;
  font-size: large;
  margin-bottom: 20px;
  position: relative;
  top: 0.6rem;
`;

const CommentListWrapper = styled.div`
  max-height: ${({ show }) => (show ? "400px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

const CommentList = styled.div`
  padding: 10px;
  overflow-y: auto;
  max-height: 320px;
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  background-color: #444444;
  padding: 10px;
  border-radius: var(--border-radius-sm);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  .avatar {
    margin-right: 10px;
  }

  .content {
    flex: 1;

    .username {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .comment-text {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }

  .options {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;

    .options-menu {
      display: none;
      position: absolute;
      top: 20px;
      right: 0;
      background: white;
      color: black;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;

      div {
        padding: 10px;
        cursor: pointer;

        &:hover {
          background: #ddd;
        }
      }
    }

    &.active .options-menu {
      display: block;
    }
  }
`;

const AddCommentContainer = styled.div`
  display: flex;
  margin-top: 20px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
  }
`;

const dummyComments = [
  {
    id: 1,
    username: "John Doe",
    text: "This movie was amazing! I loved every minute of it.",
  },
  {
    id: 2,
    username: "Jane Smith",
    text: "Not bad, but I felt the ending was a bit rushed.",
  },
  {
    id: 3,
    username: "Alice Johnson",
    text: "Fantastic performances by the cast. Highly recommend!",
  },
  {
    id: 4,
    username: "Bob Brown",
    text: "The cinematography was stunning. A visual masterpiece!",
  },
  {
    id: 5,
    username: "Charlie Davis",
    text: "The storyline was captivating and kept me on the edge of my seat.",
  },
];

const CommentSection = () => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          username: "Current User",
          text: newComment.trim(),
        },
      ]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    setActiveCommentId(null);
  };

  const toggleOptions = (id) => {
    setActiveCommentId(activeCommentId === id ? null : id);
  };

  return (
    <CommentSectionContainer>
      <ToggleButton onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Comments 389"}
        <FaArrowDown
          style={{ position: "relative", top: "0.2rem", left: "0.2rem" }}
        />
      </ToggleButton>
      <CommentListWrapper show={showComments}>
        <CommentList>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <FaUserCircle size={40} className="avatar" />
              <div className="content">
                <div className="username">{comment.username}</div>
                <div className="comment-text">{comment.text}</div>
              </div>
              <div
                className={`options ${
                  activeCommentId === comment.id ? "active" : ""
                }`}
                onClick={() => toggleOptions(comment.id)}
              >
                <FaEllipsisV />
                <div className="options-menu">
                  <div onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </div>
                </div>
              </div>
            </Comment>
          ))}
        </CommentList>
        <AddCommentContainer>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Comment</button>
        </AddCommentContainer>
      </CommentListWrapper>
    </CommentSectionContainer>
  );
};

export default CommentSection;
