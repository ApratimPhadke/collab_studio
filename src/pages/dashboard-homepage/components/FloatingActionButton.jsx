import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ userType }) => {
  if (userType !== 'student' && userType !== 'professor') {
    return null;
  }

  return (
    <Link to="/create-project" className="fixed bottom-20 right-6 lg:bottom-6 z-40">
      <Button
        variant="default"
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 w-14 h-14 p-0"
        iconName="Plus"
        iconSize={24}
      >
        <span className="sr-only">Create Project</span>
      </Button>
    </Link>
  );
};

export default FloatingActionButton;