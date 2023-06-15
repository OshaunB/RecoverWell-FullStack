const Post = require("../models/post");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await Post.createPost(
    2,
    1,
    "Just wanted to check in and see how everyone is doing today. Remember, we're all in this together!",
  );

  await Post.createPost(
    3,
    1,
    "I'm feeling grateful for the support I've received here. It has made a tremendous difference in my recovery journey.",
  );

  await Post.createPost(
    4,
    2,
    "Sharing my recovery milestones: It has been 6 months since I last used substances. Celebrating progress!",
  );

  await Post.createPost(
    5,
    2,
    "I find exercise to be an effective way to stay focused and maintain a healthy lifestyle during recovery. Who else incorporates exercise into their routine?",
  );

  await Post.createPost(
    1,
    3,
    "When cravings hit, I distract myself with activities like reading, listening to music, or going for a walk. What are your go-to distraction techniques?",
  );

  await Post.createPost(
    2,
    3,
    "It's normal to experience setbacks in recovery. Remember to be kind to yourself and keep moving forward. Progress is not always linear.",
  );

  await Post.createPost(
    3,
    4,
    "Finding a supportive therapist or counselor has been instrumental in my recovery journey. They provide guidance, validation, and help in navigating challenges.",
  );

  await Post.createPost(
    4,
    4,
    "Managing triggers and creating a safe environment are crucial for maintaining sobriety. Let's share strategies and tips on how to create a supportive environment.",
  );

  await Post.createPost(
    5,
    5,
    "Rebuilding relationships and mending past wounds is possible after recovery. It takes time, effort, and open communication, but it's worth the journey.",
  );

  await Post.createPost(
    1,
    5,
    "Gratitude has become an essential part of my daily routine. Practicing gratitude helps shift my focus to the positive aspects of life and supports my recovery.",
  );
};
