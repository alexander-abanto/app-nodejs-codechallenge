export const configLoader = () => {
    return {
        port: process.env.PORT,
        databases: {
            mongodb: {
                cluster: process.env.MONGO_CLUSTER,
                dbName: process.env.MONGO_DB_NAME,
                username: process.env.MONGO_DB_USERNAME,
                password: process.env.MONGO_DB_PASSWORD,
                mongoUrl: process.env.MONGO_URL,
            }
        },
        kafka: {
            // username: process.env.KAFKA_USERNAME,
            // password: process.env.KAFKA_PASSWORD,
            broker: process.env.KAFKA_BROCKER
        }
    };

}