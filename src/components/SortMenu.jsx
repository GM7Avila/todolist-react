import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function SortMenu({ handleSortChange, sortCriteria }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SwapVertIcon />
        Sort by {sortCriteria}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "rgb(30, 30, 30)",
            color: "rgb(211, 211, 211)",
            borderColor: "rgb(80, 80, 80)",
            borderWidth: "1px",
            width: "9rem",
          },
        }}
      >
        <MenuItem value="status" onClick={() => handleSortChange("status")}>
          Status
        </MenuItem>
        <MenuItem value="date" onClick={() => handleSortChange("date")}>
          Data
        </MenuItem>
      </Menu>
    </div>
  );
}
