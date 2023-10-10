module.exports = {
  apps: [
    {
      name: 'auth',
      exec_mode: 'cluster',
      instances: 1,
      script: './build/index.js',
      env: {
        JWT_KEY: 'asjdfhasjd²³²¡€32461²¡€856jhdjAFSD!@#^$@73',
        MONGO_URI: 'mongodb://localhost:27017/auth',
        NATS_CLUSTER_ID: 'orders',
        NATS_CLIENT_ID: '1',
        NATS_URL: 'nats://nats:4222',
        PORT: 3000,
      },
    },
  ],
};

