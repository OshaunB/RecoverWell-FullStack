const Comment = require("../models/comment");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await Comment.createComment(
    3,
    1,
    "Welcome, John! We're here to support you. Feel free to reach out if you need anything.",
  );
  await Comment.createComment(
    4,
    1,
    "Congratulations on taking this step towards recovery, John. You're not alone in this journey.",
  );
  await Comment.createComment(
    2,
    2,
    "Thank you for sharing your story, Jane. It's inspiring to hear about your progress and determination.",
  );
  await Comment.createComment(
    1,
    2,
    "Your story gives hope to others, Jane. Keep up the amazing work!",
  );
  await Comment.createComment(
    5,
    3,
    "Art therapy has been a powerful tool in my recovery as well. It allows for self-expression and healing in a unique way.",
  );
  await await Comment.createComment(
    1,
    3,
    "I've never tried art therapy, but it sounds interesting. I'll definitely look into it!",
  );
  await await Comment.createComment(
    4,
    4,
    "I find jogging to be a great way to incorporate exercise into my routine. It helps me clear my mind and stay focused.",
  );
  await await Comment.createComment(
    3,
    4,
    "I'm more into yoga and meditation, but I understand the benefits of exercise in recovery. Different approaches work for different people.",
  );
  await await Comment.createComment(
    2,
    5,
    "When cravings hit, I distract myself by engaging in a hobby like painting or playing an instrument. It helps shift my focus away from the craving.",
  );

  await await Comment.createComment(
    5,
    5,
    "I find deep breathing exercises and guided mindfulness meditation helpful during moments of cravings. It brings a sense of calm and grounding.",
  );

  await await Comment.createComment(
    1,
    6,
    "Thank you for the reminder, John. Progress is not always linear, but as long as we keep moving forward, we're on the right path.",
  );

  await Comment.createComment(
    3,
    6,
    "Absolutely, John. Recovery is a journey with ups and downs. What matters is the commitment to keep going and never give up.",
  );

  await Comment.createComment(
    4,
    7,
    "Having a supportive therapist has made a world of difference in my recovery. They provide guidance and help me navigate challenges.",
  );

  await Comment.createComment(
    2,
    7,
    "I'm currently looking for a therapist. Any tips on finding the right one?",
  );

  await Comment.createComment(
    5,
    8,
    "Creating a safe environment means removing triggers from your surroundings and surrounding yourself with supportive people.",
  );

  await Comment.createComment(
    1,
    8,
    "Setting boundaries and having open communication with loved ones also contribute to creating a safe environment.",
  );

  await Comment.createComment(
    3,
    9,
    "It's amazing to see how life can be rebuilt after recovery. Each success story gives hope to others.",
  );

  await Comment.createComment(
    2,
    9,
    "Absolutely, David. Rebuilding relationships and finding purpose after recovery is a beautiful transformation.",
  );

  await Comment.createComment(
    4,
    10,
    "Practicing gratitude is a game-changer. It shifts our perspective and helps us appreciate the present moment.",
  );

  await Comment.createComment(
    1,
    10,
    "Gratitude is a powerful tool for maintaining a positive mindset. It has made a significant impact on my recovery journey.",
  );
};
