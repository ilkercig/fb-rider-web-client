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

// Define the FantasyLeague schema
const FantasyLeagueSchema = z.object({
  key: z.string().nonempty("Key is required"),
  name: z.string().nonempty("Name is required"),
  logoUrl: z.string().url().optional(), // Optional field
});

// Define the FantasyPlayer schema
const FantasyPlayerSchema = z.object({
  key: z.string().nonempty("Key is required"),
  fullName: z.string().nonempty("Full name is required"),
  eligiblePositions: z.array(z.string()),
  selectedPosition: z.string().optional(), // Optional field
  imageUrl: z.string().url().optional(), // Optional field
});
const FantasyTeamRosterSchema = z.object({
  players: z.array(FantasyPlayerSchema),
});

// FantasyTeam Schema
const FantasyTeamSchema = z.object({
  key: z.string().nonempty("Key is required"),
  name: z.string().nonempty("Name is required"),
  teamLogo: z.string().url().optional(), // Optional field
  roster: FantasyTeamRosterSchema.optional(), // Optional field for Roster
});

// Define the StatCategory schema
const StatCategorySchema = z.object({
  id: z.number().int().nonnegative(), // Ensure ID is a positive integer
  name: z.string().nonempty("Name is required"),
  displayName: z.string().nonempty("Display name is required")
});

// Define the LeagueSettings schema
const LeagueSettingsSchema = z.object({
  statCategories: z.array(StatCategorySchema), // Array of StatCategory
});

// Define the TeamScore schema
const TeamScoreSchema = z.object({
  teamKey: z.string().nonempty("Team key is required"),
  teamName: z.string().nonempty("Team name is required"),
  statScores: z.record(z.string(), z.number()), // Treat keys as strings
  overallScore: z.number().optional(), // Optional field, derived from statScores
});

// Define the BeastStandings schema
const AllPlayStandingsSchema = z.object({
  statCategories: z.array(StatCategorySchema),
  teamScores: z.array(TeamScoreSchema),
});


// Export the schemas if needed
export {
  ProfileImagesSchema,
  YahooUserSchema,
  FantasyLeagueSchema,
  FantasyPlayerSchema,
  FantasyTeamRosterSchema,
  FantasyTeamSchema,
  StatCategorySchema,
  LeagueSettingsSchema,
  AllPlayStandingsSchema,
  TeamScoreSchema
};

// Example usage
export type YahooUser = z.infer<typeof YahooUserSchema>;
export type ProfileImages = z.infer<typeof ProfileImagesSchema>;
export type FantasyLeague = z.infer<typeof FantasyLeagueSchema>;
export type FantasyTeamRoster = z.infer<typeof FantasyTeamRosterSchema>;
export type FantasyTeam = z.infer<typeof FantasyTeamSchema>;
export type FantasyPlayer = z.infer<typeof FantasyPlayerSchema>;
export type StatCategory = z.infer<typeof StatCategorySchema>;
export type LeagueSettings = z.infer<typeof LeagueSettingsSchema>;
export type AllPlayStandings = z.infer<typeof AllPlayStandingsSchema>;
export type TeamScore = z.infer<typeof TeamScoreSchema>;