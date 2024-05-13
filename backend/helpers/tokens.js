const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 60 });
  return token;
};

const createRefreshToken = (id, access_token) => {
  const refresh_token = jwt.sign({ id, access_token }, process.env.SECRET_KEY);
  return refresh_token;
};

const generateTokens = (id) => {
  const access_token = createAccessToken(id);

  const refresh_token = createRefreshToken(id, access_token);
  return {
    access_token,
    refresh_token,
  };
};

const decryptTokens = (req, tokens) => {
  const { refresh_token, access_token } = tokens;
  const data = jwt.verify(refresh_token, process.env.SECRET_KEY);
  if (access_token === data.access_token) {
    const isExpired = jwt.verify(
      access_token,
      process.env.SECRET_KEY,
      function (err, decoded) {
        if (err) {
          return { status: true, error: err };
        } else {
          return { status: false, token: decoded };
        }
      }
    );

    if (isExpired?.status) {
      const id = data?.id;
      const access_token = createAccessToken(id);

      const refresh_token = createRefreshToken(id, access_token);

      req.headers.userId = id;
      return {
        status: false,
        error: "Token expired",
        tokens: { access_token, refresh_token },
      };
    } else {
      req.headers.userId = data?.id;

      return {
        status: true,
        message: "Valid User",
        id: isExpired?.token.id,
      };
    }
  } else {
    return { status: false, message: "Invalid User" };
  }
};

module.exports = { generateTokens, createRefreshToken, decryptTokens };
