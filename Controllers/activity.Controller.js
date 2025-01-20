import { ActivityModel } from "../Models/activity.model.js";

export const addNewActivityModel = async (req, res) => {
  try {
    const { ipAddress, timestamp, userAgent, page } = req.body;
    const activity = new ActivityModel({
      ipAddress,
      timestamp,
      userAgent,
      page,
    });
    await activity.save();
    return res
      .status(201)
      .json({ message: "User activity logged successfully." });
  } catch (error) {
    console.log("Err in addNewActivityModel ", error);
    return res.status(500).json({ error: "Failed to log activity." });
  }
};
export const getAllUserActivities = async (req, res) => {
  const { range } = req.params;
  const daysRange = parseInt(range, 10) || 7; 
  console.log("This is range ", range, "And this is days range ", daysRange);
  
  try {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - daysRange); // Calculate the start date based on the range

    // Debugging logs for date range and timestamp format
    console.log("Start Date: ", startDate.toISOString());  // Log in ISO format
    console.log("Current Date: ", currentDate.toISOString());  // Log in ISO format

    // Aggregate data grouped by day of the week
    const activityData = await ActivityModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,  // Ensure we are comparing Date objects correctly
            $lte: currentDate,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },  // Group by day of the week
          count: { $sum: 1 },  // Count the activities
        },
      },
      {
        $sort: { _id: 1 },  // Sort by day of the week (1 = Sunday, 7 = Saturday)
      },
    ]);

    // Debugging log to inspect the aggregated data
    console.log("Aggregated Data: ", activityData);

    // If no data is found, return a message
    if (activityData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No activities found for the specified range.",
      });
    }

    // Map the day numbers to day names
    const daysMap = {
      1: "Sunday",
      2: "Monday",
      3: "Tuesday",
      4: "Wednesday",
      5: "Thursday",
      6: "Friday",
      7: "Saturday",
    };

    // Format the data
    const formattedData = activityData.map((entry) => ({
      day: daysMap[entry._id],
      count: entry.count,
    }));

    return res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error in getAllUserActivities: ", error);
    return res.status(500).json({ success: false, error: "Failed to fetch user activities." });
  }
};
