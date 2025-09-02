import jwt from "jsonwebtoken";

export const generateTokenAndSaveInCookies = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,   // JS cannot access
    secure: false,    // ✅ set true only in production with HTTPS
    sameSite: "lax",  // ✅ allows cross-origin (5173 -> 5000)
    path: "/",        // available everywhere
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // 👇 log AFTER setting cookie
  console.log("Cookie set:", res.getHeaders()["set-cookie"]);

  return token;
};
