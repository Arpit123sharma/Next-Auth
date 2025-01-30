import mongoose from 'mongoose';

export default async function dbConnect(): Promise<void> {
    if (mongoose.connection.readyState) {
        console.log('Database already connected');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "");
        console.log('Database connected successfully:', db.connection.host);
    } catch (error: any) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
}
