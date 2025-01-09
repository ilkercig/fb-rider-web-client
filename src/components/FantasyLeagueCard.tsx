import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

// Props for FantasyLeagueCard
interface FantasyLeagueCardProps {
  name: string; // League Name
  logoUrl?: string; // Optional Logo URL
}

const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image URL

const FantasyLeagueCard: React.FC<FantasyLeagueCardProps> = ({ name, logoUrl }) => {
  return (
    <Card sx={{ maxWidth: 300, m: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="150"
        image={logoUrl || placeholderImage} // Use logoUrl or fallback to placeholder
        alt={`${name} Logo`}
      />
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" component="div" gutterBottom>
            {name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FantasyLeagueCard;
