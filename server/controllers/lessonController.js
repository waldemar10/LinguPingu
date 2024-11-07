const User = require("../model/User"); 

async function getLessonProgress(req, res) {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.completedLessons || user.completedLessons.length === 0) {
      console.warn(`User ${userId} has no completed lessons`);
      return res.json({ completedLessons: [] });
    }

    console.log(`User ${userId} completed lessons:`, user.completedLessons);
    res.json(user.completedLessons);
  } catch (error) {
    console.error("Error fetching lesson progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateLessonCompletion(req, res) {
  try {
    const { title_en } = req.body;
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.completedLessons) {
      console.warn(`User ${userId} has no completedLessons array`);
      return res.status(400).json({ error: "completedLessons not initialized" });
    }

    if (!user.completedLessons.includes(title_en)) {
      user.completedLessons.push(title_en);
      const updatedUser = await user.save();
      res.json({ message: "Lesson marked as completed", updatedUser });
    } else {
      res.status(409).json({ error: "Lesson already completed" });
    }
  } catch (error) {
    console.error("Error updating lesson completion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function removeLessonCompletion(req, res) {
  try {
    const { lessonId } = req.body;
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.progressGrammar) {
      console.warn(`User ${userId} has no progressGrammar data`);
      return res.status(400).json({ error: "progressGrammar not initialized" });
    }

    const existingLessonIndex = user.progressGrammar.lessons.findIndex(
      (lesson) =>
        lesson.lessonId !== null && lesson.lessonId.toString() === lessonId
    );

    if (existingLessonIndex === -1) {
      return res.status(404).json({ error: "Lesson not found in progressGrammar" });
    }

    user.progressGrammar.lessons[existingLessonIndex].completed = false;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error("Error removing lesson completion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getLessonProgress,
  updateLessonCompletion,
  removeLessonCompletion,
};