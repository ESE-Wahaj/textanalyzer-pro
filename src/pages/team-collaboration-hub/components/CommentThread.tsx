import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Comment } from '../types';

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
  onEditComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
}

const CommentThread = ({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
}: CommentThreadProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(replyContent, parentId);
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const handleEditComment = (commentId: string) => {
    if (editContent.trim()) {
      onEditComment(commentId, editContent);
      setEditingId(null);
      setEditContent('');
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderComment = (comment: Comment, isReply: boolean = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex gap-3 mb-4">
        <Image
          src={comment.userAvatar}
          alt={`${comment.userName} profile picture`}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-foreground">{comment.userName}</span>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(comment.timestamp)}
              </span>
              {comment.isEdited && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
            </div>

            {editingId === comment.id ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Edit your comment..."
                  className="text-sm"
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleEditComment(comment.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingId(null);
                      setEditContent('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Icon name="Reply" size={12} />
              Reply
            </button>
            <button
              onClick={() => {
                setEditingId(comment.id);
                setEditContent(comment.content);
              }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Icon name="Edit3" size={12} />
              Edit
            </button>
            <button
              onClick={() => onDeleteComment(comment.id)}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
            >
              <Icon name="Trash2" size={12} />
              Delete
            </button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 space-y-2">
              <Input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="text-sm"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                >
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          Comments ({comments.length})
        </h3>
      </div>

      <div className="mb-6">
        <div className="space-y-2">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment... Use @ to mention team members"
            className="text-sm"
          />
          <div className="flex justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No comments yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Be the first to share your thoughts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentThread;