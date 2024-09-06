namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    DB_USERNAME?: string;
    DB_PASSWORD?: string;
    DB_HOST?: string;
    DB_PORT?: string;
    DB_NAME?: string;
    S3_ACCESS_KEY?: string;
    S3_SECRET_KEY?: string;
    S3_BUCKET_NAME?: string;
    S3_ENDPOINT?: string;
    RESEND_API_KEY?: string;
    JWT_ACCESS_TOKEN_SECRET?: string;
    JWT_REFRESH_TOKEN_SECRET?: string;
    ACCESS_TOKEN_EXPIRY_TIME?: string;
    REFRESH_TOKEN_EXPIRY_TIME?: string;
  }
}
