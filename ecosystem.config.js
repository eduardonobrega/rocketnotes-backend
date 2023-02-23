module.exports = {
  apps: [
    {
      name: 'app',
      script: './src/server.js', //nome do arquivo de inicialização
      instances: 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
