const basicFetchOptions = {
  method: "GET",
  credentials: "include",
};

export const deleteOptions = {
  method: "DELETE",
  credentials: "include",
};

export const getPostOptions = (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: "PATCH",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = basicFetchOptions) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok)
      return [null, { status: res.status, statusText: res.statusText }];
    if (res.status === 204) return [true, null];

    const data = await res.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const findUserName = (users, userId) => {
  const user = users.find((u) => u.id === userId);
  return user ? user.username : "";
};

export const findUserById = (users, userId) => {
  const user = users.find((u) => u.id === userId);
  return user;
};

export const timeDifference = (createdTime) => {
  const diff = new Date().getTime() - new Date(createdTime).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) {
    return `${Math.floor(diff / (1000 * 60))}m ago`;
  }
  if (hours > 24) {
    return `${Math.floor(hours / 24)}d ago`;
  }
  return `${hours}h ago`;
};

export const dateFormat = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

export const timeFormat = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  let formattedTime = "";

  let ampm = "AM";
  let formattedHours = parseInt(hours, 10);
  if (formattedHours >= 12) {
    ampm = "PM";
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  formattedHours = String(formattedHours).padStart(2, "0");
  const formattedMinutes = minutes.padStart(2, "0");

  formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
};

export const validateDate = (date) => {
  const newDate = new Date(date).toLocaleDateString();
  const dateNow = new Date().toLocaleDateString();
  return newDate < dateNow;
};
