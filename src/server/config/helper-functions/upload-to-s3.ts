import { s3 } from "../s3-config";
import { processImage } from "./process-image";

interface CustomFile extends File {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
}

const uploadToS3 = async (file: CustomFile, bucketName: string) => {
    const params = {
        Bucket: bucketName,
        Key: `${Date.now()}-${file.originalname}`,
        Body: await processImage(file.buffer), // Processing the image before uploading to aws s3
        ContentType: file.mimetype,
        ACL: "public-read",
    };

    try {
        const data = await s3.upload(params).promise();
        console.log("File uploaded successfully:", data.Location);
        return data.Location;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export { uploadToS3 };