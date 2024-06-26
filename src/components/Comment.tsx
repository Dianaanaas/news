import React from 'react';
import { Comment as CommentType } from '../types';
import styles from '../styles/Comment.module.css';
import CommentList from './CommentList';

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => (
  <div className={styles.comment}>
    <p>
      <strong>{comment.by}</strong> {new Date(comment.time * 1000).toLocaleString()}
    </p>
    <p>{comment.text}</p>
    {comment.kids && <CommentList commentIds={comment.kids} />}
  </div>
);

export default Comment;
