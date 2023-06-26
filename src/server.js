const express = require("express");
const path = require("path");
const handleCookieSessions = require("./middleware/handle-cookie-sessions");
const userRoutes = require("./routes/user-routes");
const discussionRoutes = require("./routes/discussion-route");
const postRoutes = require("./routes/post-route");
const commentRoutes = require("./routes/comment-route");
const postLikeRoutes = require("./routes/post-like-route");
const eventRoutes = require("./routes/event-route");
const joinEventRoutes = require("./routes/join-event-route");
const conversationMessageRoute = require("./routes/conversation-message-route");

const logRoutes = require("./middleware/log-routes");

const app = express();

app.use(handleCookieSessions);
app.use(logRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", userRoutes);
app.use("/api", discussionRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", postLikeRoutes);
app.use("/api", eventRoutes);
app.use("/api", joinEventRoutes);
app.use("/api", conversationMessageRoute);

app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) next();
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
