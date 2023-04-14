module.exports = {
  apps: [
    {
      name: "moko-forum",
      cwd: ".",
      script: "npm",
      args: ["run", "deploy"],
      watch: true,
      // Delay between restart
      watch_delay: 10000,
      ignore_watch: [
        "node_modules",
        ".next",
        "code_examples",
        "data",
        "package-lock.json",
      ],
    },
  ],
};
