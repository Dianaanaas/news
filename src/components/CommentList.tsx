import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { Comment as CommentType } from '../types';
import { fetchComments } from '../services/api';
import styles from '../styles/CommentList.module.css';

type CommentListProps = {
  commentIds: number[];
};

const CommentList: React.FC<CommentListProps> = ({ commentIds }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await fetchComments(commentIds);
      setComments(fetchedComments);
    };
    loadComments();
  }, [commentIds]);

  return (
    <div className={styles.commentList}>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
