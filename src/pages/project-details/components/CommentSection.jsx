import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Questions & Discussion
      </h2>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Ask a question or share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                size="sm"
                loading={isSubmitting}
                disabled={!newComment.trim()}
                iconName="Send"
                iconPosition="left"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="font-body text-muted-foreground">No questions yet. Be the first to ask!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 bg-muted rounded-lg">
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-body font-medium text-foreground">
                    {comment.author.name}
                  </span>
                  {comment.author.isLeader && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded">
                      Project Leader
                    </span>
                  )}
                  <span className="font-caption text-xs text-muted-foreground">
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>
                <p className="font-body text-foreground mb-3">
                  {comment.content}
                </p>
                
                {/* Comment Actions */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
                    <Icon name="ThumbsUp" size={14} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150">
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 pl-4 border-l-2 border-border">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Image
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body font-medium text-foreground text-sm">
                              {reply.author.name}
                            </span>
                            {reply.author.isLeader && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-caption rounded">
                                Project Leader
                              </span>
                            )}
                            <span className="font-caption text-xs text-muted-foreground">
                              {formatTimeAgo(reply.timestamp)}
                            </span>
                          </div>
                          <p className="font-body text-foreground text-sm">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;