module.exports = {
  apps: [
    {
      name: 'vehicles',
      exec_mode: 'cluster',
      instances: 1,
      script: './build/index.js',
      env: {
        JWT_KEY: 'asjdfhasjd²³²¡€32461²¡€856jhdjAFSD!@#^$@73',
        MONGO_URI: 'mongodb://localhost:27017/vehicles',
        NATS_CLUSTER_ID: 'orders',
        NATS_CLIENT_ID: '4',
        NATS_URL: 'nats://nats:4222',
        PORT: 3003,
      },
    },
  ],
};

