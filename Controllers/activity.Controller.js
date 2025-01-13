import { UserActivity } from "../Models/activity.model.js";

export const addNewUserActivity = async (req, res) => {
  try {
    const { ipAddress, timestamp, userAgent, page } = req.body;
    const activity = new UserActivity({
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
    console.log("Err in addNewUserActivity ", error);
    return res.status(500).json({ error: "Failed to log activity." });
  }
};
// export const getAllUserActivities = async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(currentDate.getDate() - 7);
//     // Find data within the last 7 days
//     const weeklyData = await UserActivity.aggregate([
//       {
//         $match: {
//           timestamp: {
//             $gte: oneWeekAgo,
//             $lte: currentDate,
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $dayOfWeek: "$timestamp" }, // Group by day of the week
//           count: { $sum: 1 }, // Count the number of activities
//           details: { $push: "$$ROOT" }, // Optional: Include full activity details if needed
//         },
//       },
//       {
//         $sort: { _id: 1 }, // Sort by day of the week
//       },
//     ]);

//     res.status(200).json({ success: true, data: weeklyData });
//   } catch (error) {
//     console.log("Err in getAllUserActivities ", error);
//     return res.status(500).json({ error: "Failed to show activity." });
//   }
// };
export const getAllUserActivities = async (req, res) => {
  try {
    const currentDate = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    // Aggregate data grouped by day of the week
    const weeklyData = await UserActivity.aggregate([
      {
        $match: {
          timestamp: {
            $gte: oneWeekAgo,
            $lte: currentDate,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$timestamp" }, // Group by day of the week
          count: { $sum: 1 }, // Count the activities
        },
      },
      {
        $sort: { _id: 1 }, // Sort by day of the week (1 = Sunday, 7 = Saturday)
      },
    ]);

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

    const formattedData = weeklyData.map((entry) => ({
      day: daysMap[entry._id],
      count: entry.count,
    }));

   return res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error in getAllUserActivities: ", error);
    return res.status(500).json({ success: false, error: "Failed to fetch user activities." });
  }
};

