export class Environment {
  static getEnvironmentPatch(): string | string[] {
    switch (process.env.NODE_ENV) {
      case 'test':
        return ['.env.test', '.env'];
      case 'stage':
        return ['.env.stage', '.env'];
      case 'development':
        return ['.env.development', '.env'];
      case 'production':
      default:
        return '.env';
    }
  }

  static getJwtConfig() {
    return {
      secret: process.env.JWT_SECRET,
      expiration: Number(process.env.JWT_EXPIRATION),
    };
  }
}
