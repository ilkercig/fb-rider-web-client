import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import LogoutMenuItem from "./LogoutMenuItem";

// Define the props type for the component
interface UserProfileMenuProps {
  userName: string;
  imageUrl: string;
}

function UserProfileMenu({ userName, imageUrl }: UserProfileMenuProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  return (
    <Box sx={{ flexGrow: 0 
    }}>
      <Tooltip title="User Profile">
        <IconButton
          onClick={(event)=>setAnchorElUser(event.currentTarget)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar alt={userName} src={imageUrl} />
          <Typography variant="body1">{userName}</Typography>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={()=> setAnchorElUser(null)}
      >
        <LogoutMenuItem />
      </Menu>
    </Box>
  );
}

export default UserProfileMenu;
