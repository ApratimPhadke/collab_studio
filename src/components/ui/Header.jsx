import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notificationCount] = useState(3);

  const navigationItems = [
    { label: 'Home', path: '/dashboard-homepage', icon: 'Home' },
    { label: 'Explore', path: '/explore-projects', icon: 'Search' },
    { label: 'My Projects', path: '/my-projects', icon: 'FolderOpen' },
    { label: 'Create', path: '/create-project', icon: 'Plus' },
    { label: 'Profile', path: '/profile-management', icon: 'User' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard-homepage" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" />
          </div>
          <span className="font-heading font-semibold text-xl text-foreground">
            Collab Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body font-medium text-sm transition-colors duration-200 hover:text-primary ${
                location.pathname === item.path
                  ? 'text-primary border-b-2 border-primary pb-1' :'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search, Notifications, and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </form>
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserMenuToggle}
              className="rounded-full"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-lg shadow-modal z-50 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="font-body font-medium text-sm text-foreground">John Doe</p>
                  <p className="font-caption text-xs text-muted-foreground">john.doe@university.edu</p>
                </div>
                <div className="py-2">
                  <Link
                    to="/profile-management"
                    className="flex items-center px-3 py-2 text-sm font-body text-foreground hover:bg-muted transition-colors duration-150"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm font-body text-foreground hover:bg-muted transition-colors duration-150"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Settings
                  </button>
                  <hr className="my-2 border-border" />
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm font-body text-error hover:bg-muted transition-colors duration-150"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {isSearchExpanded && (
        <div className="md:hidden border-t border-border bg-card p-4 animate-slide-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
              autoFocus
            />
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </form>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-caption text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;