import { useQuery } from "@tanstack/react-query";
import { fetchBeastStandings } from "../api/yahooAuthService";
import { useParams } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useState } from "react";

export default function BeastStandings()
{
    const {leagueKey} = useParams<{leagueKey: string}>();


    const {data: beastStandings, isLoading, isError} = useQuery({
        queryKey: ["beastStandings", leagueKey],
        queryFn: () => fetchBeastStandings(leagueKey!),
        enabled: !!leagueKey,
    });

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "overallScore",
        direction: "desc",
      });
    
      const sortedTeamScores = beastStandings?.teamScores?.slice().sort((a, b) => {
        const { key, direction } = sortConfig;
        const valueA = key === "overallScore" ? a[key] : a.statScores[key] || 0;
        const valueB = key === "overallScore" ? b[key] : b.statScores[key] || 0;
    
        if (valueA === valueB) return 0;
        return direction === "asc" ? (valueA ?? 0) - (valueB ?? 0) : (valueB ?? 0) - (valueA ?? 0);
      }) ?? [];
    
      const handleSort = (key: string) => {
        setSortConfig((prev) => ({
          key,
          direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
        }));
      };

    if (isLoading)
    {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    if(isError)
    {
        return (
            <div>
                <h1>Error fetching league settings</h1>
            </div>
        );
    }

    if (!beastStandings) {
        return null;
    }

    console.log(beastStandings);

    
    return (
        <div>
            <h1>Beast Standings</h1>
            <h2>Stat Categories</h2>
            <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell
              onClick={() => handleSort("teamName")}
              style={{ cursor: "pointer" }}
            >
              Team
            </TableCell>
            {beastStandings?.statCategories.map((category, index) => (
              <TableCell key={index}>
                <TableSortLabel
                  active={sortConfig.key === category.id.toString()}
                  direction={sortConfig.key === category.id.toString() ? sortConfig.direction : "asc"}
                  onClick={() => handleSort(category.id.toString())}
                >
                  {category.displayName}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "overallScore"}
                direction={sortConfig.key === "overallScore" ? sortConfig.direction : "asc"}
                onClick={() => handleSort("overallScore")}
              >
                Overall
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTeamScores.map((teamScore, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{teamScore.teamName}</TableCell>
              {beastStandings.statCategories.map((category, index) => (
                <TableCell key={index}>{teamScore.statScores[category.id]}</TableCell>
              ))}
              <TableCell>{teamScore.overallScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
    );
}