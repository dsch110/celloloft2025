import React, { useState, useEffect } from 'react';

const WeekContent = ({ cohortId }) => {
  const [weekData, setWeekData] = useState(null);

  useEffect(() => {
    const fetchWeekContent = async () => {
      const response = await fetch(`/api/cohort/${cohortId}/week-content`);
      const data = await response.json();
      if (data.success) {
        setWeekData(data);
      }
    };

    fetchWeekContent();
  }, [cohortId]);

  if (!weekData) return <div>Loading...</div>;

  return (
    <div className="week-content">
      <div className="week-header">
        <h1>{weekData.week.title}</h1>
        <div className="intro-text">
          {weekData.week.introText}
        </div>
      </div>

      <div className="video-sections">
        {weekData.videos.map((video) => (
          <div key={video.sortKey} className="video-block">
            <h3>{video.title}</h3>
            <h4>{video.subtitle}</h4>
            <div className="video-container">
              <iframe
                src={video.youtubeUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="video-description">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekContent; 