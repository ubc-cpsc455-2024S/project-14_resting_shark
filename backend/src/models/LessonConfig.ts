import mongoose from "mongoose";

const LessonConfigSchema = new mongoose.Schema(
    {
       livesPerLesson: Number,
       livesRefreshCooldown: Number,            // cooldown period, seconds
       scoreMultiplier: Number,               
    }
);

const LessonConfig = mongoose.model("LessonConfig", LessonConfigSchema);
export default LessonConfig;