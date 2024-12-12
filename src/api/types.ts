import { z } from "zod";

// Define the ProfileImages schema
const ProfileImagesSchema = z.object({
  image32: z.string(),
  image64: z.string(),
  image128: z.string(),
});

// Define the YahooUser schema
const YahooUserSchema = z.object({
  email: z.string(),
  name: z.string(),
  profile_images: ProfileImagesSchema,
});

// Export the schemas if needed
export { ProfileImagesSchema, YahooUserSchema };

// Example usage
export type YahooUser = z.infer<typeof YahooUserSchema>;
export type ProfileImages = z.infer<typeof ProfileImagesSchema>;
