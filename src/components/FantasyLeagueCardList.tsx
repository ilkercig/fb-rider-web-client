'use client'
import { Box, Grid2, Skeleton, Typography } from "@mui/material";
import FantasyLeagueCard from "./FantasyLeagueCard";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLeagues } from "@/lib/api/yahooAuthService";
import { useRouter } from "next/navigation";

function FantasyLeagueList() {
  const router = useRouter();
  const {
    data: leagues,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["userLeagues", "head"],
    queryFn: fetchUserLeagues,
  });

  if (isPending) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton animation="wave" />
      </Box>
    );
  }
  if (isError) {
    return <div>There was an error fetching the leagues</div>;
  }

  return (
    <div>
      <Typography variant="h4">Your Active H2H Leagues</Typography>
      <Grid2 container spacing={2}>
        {leagues &&
          leagues.map((league) => (
            <Grid2 onClick={() => router.push("/league/" + league.key)} key={league.key}>
              <FantasyLeagueCard name={league.name} logoUrl={league.logoUrl} />
            </Grid2>
          ))}
      </Grid2>
    </div>
  );
}

export default FantasyLeagueList;
