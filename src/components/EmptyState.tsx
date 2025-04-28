const EmptyState = () => {
  return (
    <div className="text-center py-20">
      <div className="mb-4 mx-auto w-32 h-32 rotate-slightly-rev">
        {/* Криво нарисованный в Paint смайлик */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full paint-effect" 
          style={{ imageRendering: 'pixelated' }}
        >
          <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="2" />
          <circle cx="30" cy="40" r="5" fill="black" />
          <circle cx="70" cy="40" r="5" fill="black" />
          <path 
            d="M 30 70 Q 50 50 70 70" 
            fill="none" 
            stroke="black" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <line x1="25" y1="30" x2="35" y2="35" stroke="black" strokeWidth="2" />
          <line x1="65" y1="35" x2="75" y2="30" stroke="black" strokeWidth="2" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-1">Мемов пока нет</h3>
      <p className="text-gray-600">Будь первым, кто добавит мем!</p>
    </div>
  );
};

export default EmptyState;
