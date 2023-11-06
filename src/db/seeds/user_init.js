const User = require("../models/user");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await User.deleteAll();
  await User.create(
    "johndoe@gmail.com",
    "johndoe",
    "123",
    "John Doe",
    "Male",
    "1990-01-01",
    "https://ucarecdn.com/63e443a6-a9eb-484c-a396-89a3e0f83412/-/scale_crop/500x500/smart_faces_objects/30p,25p/",
    "Sobriety is not the absence of something, but the presence of everything worth living for.",
    "John Doe is a determined individual committed to his journey of sobriety and embracing a life filled with purpose and fulfillment.",
    "John Doe is a determined individual committed to his journey of sobriety and embracing a life filled with purpose and fulfillment."
  );

  await User.create(
    "janesmith@gmail.com",
    "janesmith",
    "123",
    "Jane Smith",
    "Male",
    "1967-01-01",
    "https://ucarecdn.com/f75ba1e2-c912-4680-8797-f4ed45c7220a/-/scale_crop/500x500/smart_faces_objects/30p,25p/",
    "Recovery is not a destination; it's a lifelong journey filled with strength, growth, and endless possibilities.",
    "Jane Smith is a resilient woman on a lifelong journey of recovery, embracing strength and endless possibilities."
  );

  await User.create(
    "michalelJohnson@gmail.com",
    "michalelJohnson",
    "123",
    "Michael Johnson",
    "Male",
    "1973-06-01",
    "https://ucarecdn.com/6254967d-786f-4755-a74d-a75152c2aa2b/-/scale_crop/500x500/smart_faces_objects/30p,25p/",
    "You are stronger than the substances that once held you captive. Embrace your power and reclaim your life.",
    "Michael Johnson is a strong individual, breaking free from addiction and reclaiming his life with determination and empowerment."
  );

  await User.create(
    "emilydavis@gmail.com",
    "emilydavis",
    "123",
    "Emily Davis",
    "Female",
    "1990-01-09",
    "https://ucarecdn.com/a38e0069-6f52-46f8-8bcd-53efc9fd531e/-/scale_crop/500x500/smart_faces_objects/30p,25p/",
    "Every small step towards sobriety is a giant leap towards a brighter future. Stay committed and believe in your ability to overcome.",
    "Emily Davis takes each small step towards sobriety as a giant leap towards a brighter future, staying committed and inspiring others to overcome."
  );

  await User.create(
    "davidwilson@gmail.com",
    "davidwilson",
    "123",
    "David Wilson",
    "Male",
    "1950-01-01",
    "https://ucarecdn.com/fbb62ab0-6285-434b-a94c-33f2a7240ab8/-/scale_crop/500x500/smart_faces_objects/30p,25p/",
    "The path to sobriety may be challenging, but the rewards are immeasurable. You deserve a life filled with clarity, purpose, and genuine happiness.",
    "David Wilson embraces the challenges of the path to sobriety, knowing that the rewards are immeasurable, and he deserves a life filled with clarity, purpose, and genuine happiness."
  );
};
