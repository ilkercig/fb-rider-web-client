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
  logoUrl: z.string().url().optional(),
});

// Define the FantasyPlayer schema
const FantasyPlayerSchema = z.object({
  key: z.string().nonempty("Key is required"),
  fullName: z.string().nonempty("Full name is required"),
  eligiblePositions: z.array(z.string()),
  selectedPosition: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

const FantasyTeamRosterSchema = z.object({
  players: z.array(FantasyPlayerSchema),
});

// FantasyTeam Schema
const FantasyTeamSchema = z.object({
  key: z.string().nonempty("Key is required"),
  name: z.string().nonempty("Name is required"),
  teamLogo: z.string().url().optional(),
  roster: FantasyTeamRosterSchema.optional(),
});

// Define the StatCategory schema
const StatCategorySchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().nonempty("Name is required"),
  displayName: z.string().nonempty("Display name is required"),
});

// Define the LeagueSettings schema
const LeagueSettingsSchema = z.object({
  statCategories: z.array(StatCategorySchema),
});

// Define the TeamScore schema
const TeamScoreSchema = z.object({
  teamKey: z.string().nonempty("Team key is required"),
  teamName: z.string().nonempty("Team name is required"),
  statScores: z.record(z.string(), z.number()),
  overallScore: z.number().optional(),
});

// Define the BeastStandings schema
const AllPlayStandingsSchema = z.object({
  statCategories: z.array(StatCategorySchema),
  teamScores: z.array(TeamScoreSchema),
});

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
  TeamScoreSchema,
};

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
