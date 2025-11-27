// /home/game/backoffice_frontend/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "backoffice_frontend",
      cwd: "/home/game/backoffice_frontend",

      // ใช้ npm run เพื่อให้ PATH/ENV ครบ (ถ้ามี script "preview")
      // ถ้าไม่มี script ให้ใช้ตัวล่างแทน (vite ไบนารีตรง)
      script: "npm",
      args: "run preview -- --port 9000 --host 0.0.0.0",

      // --- ถ้าไม่มี script "preview" ใน package.json ให้ใช้แทนสองบรรทัดบน ---
      // script: "node_modules/.bin/vite",
      // args: "preview --port 9000 --host 0.0.0.0",

      exec_mode: "fork",
      instances: 1,

      max_memory_restart: "300M",
      node_args: "--max-old-space-size=250",

      watch: false,
      autorestart: true,
      restart_delay: 3000,
      min_uptime: "10s",
      max_restarts: 15,

      out_file: "/home/game/logs/frontend-out.log",
      error_file: "/home/game/logs/frontend-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      env: {
        NODE_ENV: "production",
        PORT: "9000",
        HOST: "0.0.0.0"
      }
    }
  ]
};
