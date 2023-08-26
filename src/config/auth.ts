export const jwt_config = {
    secret: process.env.API_SECRET || 'default',
    expereIn: '1d'
}