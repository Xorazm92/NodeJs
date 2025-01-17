import { LoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

export const LoggerConfig = LoggerModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      pinoHttp: {
        transport: {
          target: '@logtail/pino',
          options: {
            sourceToken: config.get('LOGTAIL_SOURCE_TOKEN'),
          },
        },
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        formatters: {
          level: (label) => {
            return { level: label };
          },
        },
      },
    };
  },
});
