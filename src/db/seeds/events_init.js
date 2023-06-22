const Event = require("../models/events");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async (knex) => {
  const events = [
    {
      user_id: 1,
      name: "Sober Beach Bonfire",
      description:
        "Join us for a night of sober fun around the bonfire on the beach!",
      address: "313 Brightwater Ct",
      city: "Brooklyn",
      state: "NY",
      zip: "11235",
      date: "2023-08-01",
      time: "19:00:00",
      image:
        "https://cdn.shopify.com/s/files/1/0863/2686/products/IMG_0727.JPG?v=1544767081",
      guestCount: 10,
    },
    {
      user_id: 2,
      name: "Sober Hiking Meetup",
      description: "Join us for a sober hike in the beautiful mountains!",
      address: "Route 9W North",
      city: "Bear Mountain",
      state: "NY",
      zip: "10911",
      date: "2023-07-08",
      time: "10:00:00",
      image: "https://cdn.hswstatic.com/gif/bear-mountain-1.jpg",
      guestCount: 10,
    },
    {
      user_id: 3,
      name: "Sober Coffee Chat",
      description:
        "Join us for a sober coffee chat and meet other sober people in the community!",
      address: "42-77 Hunter St",
      city: "Queens",
      state: "NY",
      zip: "11101",
      date: "2023-07-05",
      time: "15:00:00",
      image:
        "https://www.magazinediscover.com/wp-content/uploads/2020/10/coffee-04.jpg",
      guestCount: 3,
    },
    {
      user_id: 1,
      name: "Movie Night",
      description: "Join us for a sober movie night and snacks!",
      address: "234 W 42nd St",
      city: "New York",
      state: "NY",
      zip: "10036",
      date: "2023-07-10",
      time: "19:00:00",
      image:
        "https://secretnyc.co/wp-content/uploads/2022/10/museum-of-the-moving-image-2-e1666709335372.jpeg",
      guestCount: 10,
    },
    {
      user_id: 2,
      name: "Sober Bowling Night",
      description: "Join us for a night of sober bowling and fun!",
      address: "61 Wythe Ave",
      city: "Brooklyn",
      state: "NY",
      zip: "11211",
      date: "2023-07-05",
      time: "20:00:00",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bowlerbowling.JPG",
      guestCount: 10,
    },
    {
      user_id: 3,
      name: "Sober Game Night",
      description: "Join us for a fun night of sober games and snacks!",
      address: "659 Manhattan Ave",
      city: "Brooklyn",
      state: "NY",
      zip: "11222",
      date: "2023-07-01",
      time: "18:00:00",
      image:
        "https://funcheaporfree.com/wp-content/uploads/2019/12/Game-Night-Ideas-Plus-Tips-for-Hosting.jpg",
      guestCount: 6,
    },
  ];

  events.forEach(async (event) => {
    await Event.createEvent(event);
  });
};
