const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

const usersFilePath = path.join(__dirname, "..", "users.json");

async function ensureUsersFile() {
  try {
    await fs.access(usersFilePath);
  } catch (_error) {
    await fs.writeFile(usersFilePath, "[]", "utf8");
  }
}

async function readUsers() {
  await ensureUsersFile();
  const file = await fs.readFile(usersFilePath, "utf8");
  try {
    const users = JSON.parse(file);
    return Array.isArray(users) ? users : [];
  } catch (_error) {
    return [];
  }
}

async function writeUsers(users) {
  await ensureUsersFile();
  await fs.writeFile(usersFilePath, `${JSON.stringify(users, null, 2)}\n`, "utf8");
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function sanitizeUser(user) {
  if (!user) return null;
  const {
    password,
    resetPasswordToken,
    resetPasswordExpires,
    ...safeUser
  } = user;
  return safeUser;
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString("hex");
}

async function findByEmail(email, { includePassword = false } = {}) {
  const users = await readUsers();
  const user = users.find((item) => item.email === normalizeEmail(email));
  return includePassword ? user || null : sanitizeUser(user);
}

async function findById(id, { includePassword = false } = {}) {
  const users = await readUsers();
  const user = users.find((item) => item.id === id);
  return includePassword ? user || null : sanitizeUser(user);
}

async function findByProvider(provider, providerId) {
  const users = await readUsers();
  const user = users.find((item) => item.provider === provider && item.providerId === providerId);
  return sanitizeUser(user);
}

async function createUser({ name, email, password, provider = "local", providerId = null, isEmailVerified = false }) {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);

  if (users.some((user) => user.email === normalizedEmail)) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const now = new Date().toISOString();
  const user = {
    id: createId(),
    name: String(name || "Mercato Customer").trim(),
    email: normalizedEmail,
    password: password ? await bcrypt.hash(password, 12) : null,
    provider,
    providerId,
    role: "customer",
    isEmailVerified,
    resetPasswordToken: null,
    resetPasswordExpires: null,
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);
  await writeUsers(users);
  return sanitizeUser(user);
}

async function comparePassword(user, candidatePassword) {
  if (!user?.password) return false;
  return bcrypt.compare(candidatePassword, user.password);
}

async function updateUser(id, updates) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (updates.password) {
    users[index].password = await bcrypt.hash(updates.password, 12);
  }

  await writeUsers(users);
  return sanitizeUser(users[index]);
}

async function createPasswordResetToken(email) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.email === normalizeEmail(email));
  if (index === -1) return null;

  const resetToken = crypto.randomBytes(32).toString("hex");
  users[index].resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  users[index].resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  users[index].updatedAt = new Date().toISOString();

  await writeUsers(users);
  return { resetToken, user: sanitizeUser(users[index]) };
}

async function resetPassword(token, password) {
  const users = await readUsers();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const index = users.findIndex(
    (user) =>
      user.resetPasswordToken === hashedToken &&
      user.resetPasswordExpires &&
      new Date(user.resetPasswordExpires).getTime() > Date.now()
  );

  if (index === -1) return null;

  users[index].password = await bcrypt.hash(password, 12);
  users[index].resetPasswordToken = null;
  users[index].resetPasswordExpires = null;
  users[index].updatedAt = new Date().toISOString();

  await writeUsers(users);
  return sanitizeUser(users[index]);
}

async function linkOAuthUser(existingUserId, { provider, providerId }) {
  return updateUser(existingUserId, { provider, providerId, isEmailVerified: true });
}

module.exports = {
  ensureUsersFile,
  readUsers,
  writeUsers,
  sanitizeUser,
  findByEmail,
  findById,
  findByProvider,
  createUser,
  comparePassword,
  updateUser,
  createPasswordResetToken,
  resetPassword,
  linkOAuthUser,
};
