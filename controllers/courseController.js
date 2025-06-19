const getWeekContent = async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohort = await Cohort.findById(cohortId);
    const currentWeek = cohort.getCurrentWeek();

    // Get week information
    const week = await Week.findOne({ weekNumber: currentWeek });
    
    // Get all videos for this week
    const videos = await Video.find({ 
      weekNumber: currentWeek 
    }).sort('orderInWeek');

    res.json({ 
      success: true, 
      week,
      videos 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 