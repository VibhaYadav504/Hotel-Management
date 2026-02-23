import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import multer from "multer";




// Upload buffer to Cloudinary
export const uploadToCloudinary = (fileBuffer, options = { folder: "rooms" }) => {

    // Cloudinary configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
        if (!fileBuffer) return reject(new Error("No file buffer provided"));

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", ...options },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
};


const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only images are allowed"), false);
    },
});

export default cloudinary;