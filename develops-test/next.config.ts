import dotenv from 'dotenv';
import {NextConfig} from "next";

dotenv.config({ path: '.env.local' });

const nextConfig: NextConfig = {
    appDir: false,
};

export default nextConfig;
