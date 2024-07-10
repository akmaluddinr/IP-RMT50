function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  console.log(err);

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "dataNotFound":
      status = 404;
      message = "Data not found";
      break;
    case "usernameRequired":
      status = 400;
      message = "Username is required";
      break;
    case "invalidInput":
      status = 400;
      message = "Email or password is required";
      break;
    case "invalidEmail":
      status = 401;
      message = "User not found";
      break;
    case "wrongPassword":
      status = 401;
      message = "Password not match";
      break;
    case "unauthorized":
    case "JsonWebTokenError":
      status = 401;
      message = "You are not authenticated";
      break;
    case "forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    default:
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
