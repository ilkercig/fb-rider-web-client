'use client'
import {
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchUserSeasons } from "@/lib/api/yahooAuthService";
import { useRouter } from "next/navigation";
import { LeagueResponse } from "@/lib/api/types";

const placeholderLogo = "https://via.placeholder.com/40";

function LeagueListItem({ league }: { league: LeagueResponse }) {
  const router = useRouter();
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => router.push(`/league/${league.key}`)}>
        <ListItemAvatar>
          <Avatar
            src={league.logoUrl ?? placeholderLogo}
            alt={league.name}
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          primary={league.name}
          secondary={`${league.scoringType} · Week ${league.currentWeek}`}
        />
      </ListItemButton>
    </ListItem>
  );
}

function SeasonsDashboard() {
  const { data: seasons, isPending, isError } = useQuery({
    queryKey: ["userSeasons"],
    queryFn: fetchUserSeasons,
  });

  if (isPending) {
    return (
      <Box sx={{ width: 400, p: 2 }}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} animation="wave" height={60} sx={{ mb: 1 }} />
        ))}
      </Box>
    );
  }

  if (isError) {
    return <Typography color="error">Failed to load seasons.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      {seasons.map((season) => (
        <Box key={season.key} sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="h5">{season.seasonYear} Season</Typography>
            {season.isSeasonOver && (
              <Chip label="Completed" size="small" color="default" />
            )}
          </Box>
          {season.leagues.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No leagues for this season.
            </Typography>
          ) : (
            <List disablePadding sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              {season.leagues.map((league, idx) => (
                <Box key={league.key}>
                  <LeagueListItem league={league} />
                  {idx < season.leagues.length - 1 && (
                    <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />
                  )}
                </Box>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default SeasonsDashboard;
