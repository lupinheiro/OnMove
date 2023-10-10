module.exports = {
  apps: [
    {
      name: 'routes',
      exec_mode: 'cluster',
      instances: 1,
      script: './build/routes/src/index.js',
      env: {
        JWT_KEY: 'asjdfhasjd²³²¡€32461²¡€856jhdjAFSD!@#^$@73',
        MONGO_URI: 'mongodb://localhost:27017/routes',
        PORT: 3002,
        OPENCAGE_API_KEY: '39000c3a2a984641be1057f5be7500d1',
      },
    },
  ],
};

