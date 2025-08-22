module.exports = {
  apps : [{
    name   : "frontend",
    script : "npm",
    args   : "start",
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 5000,
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
