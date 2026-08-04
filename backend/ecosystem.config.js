module.exports = {
  apps: [
    {
      name: "tutionmaster-backend",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "300M",
      kill_timeout: 5000,
    },
  ],
};
