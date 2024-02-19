import { useState } from "react";

function Comment({ comment, key , handleAddReply }) {
  const [reply, setReply] = useState("");
  const [showReplyCommentBox, setShowReplyCommentBox] = useState(false);

  return (
    <li key={key}>
     <span> {comment.title}</span>
      {!showReplyCommentBox ? (
        <button onClick={() => setShowReplyCommentBox(true)}>Add Reply</button>
      ) : null}
      {showReplyCommentBox ? (
        <div>
          <textarea
            rows={"2"}
            cols={"20"}
            onChange={(event) => setReply(event.target.value)}
            value={reply}
          />
          <br />
          <div className="reply-buttons-container">
            <button onClick={()=>{
                handleAddReply(comment.id, reply)
                setShowReplyCommentBox(false);
                setReply('')
            }}>Submit</button>
            <button
              onClick={() => {
                setShowReplyCommentBox(false);
                setReply("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      {comment && comment.children && comment.children.length > 0 ? (
        <ul>
          {comment.children.map((childComment) => (
            <Comment handleAddReply={handleAddReply} key={childComment.id} comment={childComment} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default Comment;
