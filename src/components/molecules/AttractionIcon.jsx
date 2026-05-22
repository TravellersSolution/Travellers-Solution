import React from 'react';

const AttractionIcon = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'hotel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v5H6V10h2a2 2 0 012 2v7h-2v-5zm8 5v-7a2 2 0 00-2-2h-2v9h2v-5h2v5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-4-4h8l-4 4z" />
          </svg>
        );
      case 'flight':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      case 'taxi':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a2 2 0 010-2.828l10.606-10.607a2 2 0 012.828 0l-4.243 4.243-4.242 4.242z" />
          </svg>
        );
      case 'tour':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4l6 3 6-3v8.764a1 1 0 01-.553.894L15 20l-6-3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full">
      {getIcon()}
    </div>
  );
};

export default AttractionIcon;