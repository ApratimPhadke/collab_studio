import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ application, onWithdraw }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-error text-error-foreground';
      case 'under-review': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'under-review': return 'Clock';
      case 'pending': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            {application.projectTitle}
          </h3>
          <p className="text-muted-foreground text-sm font-body mb-2">
            {application.projectDescription}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-caption">
            <span className="flex items-center gap-1">
              <Icon name="User" size={14} />
              Led by {application.groupLeader}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Building" size={14} />
              {application.department}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-caption font-medium flex items-center gap-1 ${getStatusColor(application.status)}`}>
            <Icon name={getStatusIcon(application.status)} size={12} />
            {application.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Application Details */}
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground font-caption">Applied on:</span>
            <p className="font-body text-foreground">{application.appliedDate}</p>
          </div>
          <div>
            <span className="text-muted-foreground font-caption">Response time:</span>
            <p className="font-body text-foreground">{application.responseTime}</p>
          </div>
        </div>
      </div>

      {/* Skills Match */}
      <div className="mb-4">
        <h4 className="text-sm font-body text-foreground mb-2">Skills Match</h4>
        <div className="flex flex-wrap gap-2">
          {application.skillsMatch.map((skill, index) => (
            <span 
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-caption ${
                skill.matched 
                  ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
              }`}
            >
              {skill.matched && <Icon name="Check" size={10} className="inline mr-1" />}
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Message from Leader */}
      {application.message && (
        <div className="mb-4 p-3 bg-background border border-border rounded-lg">
          <h4 className="text-sm font-body text-foreground mb-2 flex items-center gap-2">
            <Icon name="MessageSquare" size={14} />
            Message from Group Leader
          </h4>
          <p className="text-sm text-muted-foreground font-body italic">
            "{application.message}"
          </p>
        </div>
      )}

      {/* Team Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-body text-foreground mb-2">Team Members</h4>
        <div className="flex items-center gap-2">
          {application.teamMembers.slice(0, 5).map((member, index) => (
            <div key={member.id} className="relative">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-background"
              />
              {member.isLeader && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={8} color="white" />
                </div>
              )}
            </div>
          ))}
          {application.teamMembers.length > 5 && (
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-caption text-muted-foreground">
                +{application.teamMembers.length - 5}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {application.status === 'accepted' && (
          <Button variant="default" size="sm" className="flex-1">
            <Icon name="Users" size={14} className="mr-2" />
            Join Team Chat
          </Button>
        )}
        {application.status === 'pending' || application.status === 'under-review' ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onWithdraw(application.id)}
            className="flex-1 text-error hover:text-error"
          >
            <Icon name="X" size={14} className="mr-2" />
            Withdraw Application
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Eye" size={14} className="mr-2" />
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;