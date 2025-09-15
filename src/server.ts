import app from './app';
import config from './config/serverConfig';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${config.nodeEnv}`);
});