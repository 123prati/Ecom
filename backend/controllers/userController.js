function getDashboard(req, res) {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      provider: req.user.provider,
      createdAt: req.user.createdAt,
    },
    dashboard: {
      message: `Welcome back, ${req.user.name}.`,
      orders: [],
      savedAddresses: [],
      security: {
        passwordLoginEnabled: req.user.provider === "local",
        provider: req.user.provider,
      },
    },
  });
}

module.exports = { getDashboard };
