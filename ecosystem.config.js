module.exports = {
  apps: [
    {
      name: 'passo-a-passo-app',
      script: './index.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3015,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3015,
      },
    },
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
