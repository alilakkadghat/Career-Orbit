/**
 * CareerOrbit AI — Authentication Controller
 * Handles user registration and login with hybrid DB/Mock support.
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserPG");
const appConfig = require("../config/app.config");
const response = require("../utils/responseFormatter");
const logger = require("../middleware/requestLogger");

// In-memory Mock Store for when DB is down
const mockUsers = [];

const signToken = (id) => {
  return jwt.sign({ id }, appConfig.auth.jwtSecret, { expiresIn: appConfig.auth.jwtExpiry });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // MOCK MODE: when PostgreSQL is not connected
    if (!req.dbConnected) {
      const existing = mockUsers.find((u) => u.email === email);
      if (existing) {
        return response.error(res, "User already exists (Mock Store)", 400, "USER_EXISTS");
      }

      const hashedPassword = await bcrypt.hash(password, appConfig.auth.saltRounds);
      const newUser = {
        id: "M" + Date.now(),
        username,
        email,
        password: hashedPassword,
        profileCompleted: false,
      };
      mockUsers.push(newUser);

      const token = signToken(newUser.id);
      logger.info(`[AUTH] Registered mock user: ${email}`);

      return response.success(res, {
        token,
        user: { id: newUser.id, username, email, profileCompleted: newUser.profileCompleted },
        mock: true,
      });
    }

    // REAL PostgreSQL logic
    let user = await User.findOne({ where: { email } });
    if (user) {
      return response.error(res, "User already exists", 400, "USER_EXISTS");
    }

    user = await User.create({ username, email, password });
    const token = signToken(user.id);
    logger.info(`[AUTH] Registered user: ${email}`);

    return response.success(res, {
      token,
      user: { id: user.id, username: user.username, email: user.email, profileCompleted: user.profileCompleted },
    });
  } catch (err) {
    logger.error(`[AUTH] Register Error: ${err.message}`);
    return response.error(res, "Server Error during registration", 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // MOCK MODE
    if (!req.dbConnected) {
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        return response.error(res, "Invalid credentials (Mock Store)", 400, "INVALID_CREDENTIALS");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.error(res, "Invalid credentials", 400, "INVALID_CREDENTIALS");
      }

      const token = signToken(user.id);
      logger.info(`[AUTH] Mock user login: ${email}`);

      return response.success(res, {
        token,
        user: { id: user.id, username: user.username, email: user.email, profileCompleted: user.profileCompleted },
        mock: true,
      });
    }

    // REAL PostgreSQL logic
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return response.error(res, "Invalid credentials", 400, "INVALID_CREDENTIALS");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.error(res, "Invalid credentials", 400, "INVALID_CREDENTIALS");
    }

    const token = signToken(user.id);
    logger.info(`[AUTH] User login: ${email}`);

    return response.success(res, {
      token,
      user: { id: user.id, username: user.username, email: user.email, profileCompleted: user.profileCompleted },
    });
  } catch (err) {
    logger.error(`[AUTH] Login Error: ${err.message}`);
    return response.error(res, "Server Error during login", 500);
  }
};
