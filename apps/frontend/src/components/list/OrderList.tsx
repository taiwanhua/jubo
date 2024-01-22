import type { FC, PropsWithChildren } from "react";
import { memo, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { useSx, type SX } from "@/src/hooks/theme/useSx";

export interface OrderListProps {
  sx?: SX;
}

const timeout = 2000;

const OrderListFC: FC<PropsWithChildren<OrderListProps>> = ({ sx }) => {
  const [open, setOpen] = useState(false);

  const cardSx = useSx(
    () => [
      {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        textAlign: "center",
        padding: 1,
        margin: "2rem auto",
        width: "calc(100vw - 6rem)",
        height: "calc(100vh - 6rem)",
        borderColor: (theme) => theme.palette.grey[500],
      },
      sx,
    ],
    [sx],
  );

  const listSx = useSx(
    () => [
      {
        width: "100%",
        margin: "2rem auto",
        maxWidth: "20rem",
        bgcolor: "background.paper",
      },
      sx,
    ],
    [sx],
  );

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Card sx={cardSx}>
      <Typography component="h3" variant="h3">
        照護長者名單暨醫囑歷史紀錄
      </Typography>
      <List sx={listSx}>
        {[
          { id: "1", name: "小名" },
          { d: "2", name: "裝下名" },
          { d: "3", name: "林小名" },
        ].map(({ id, name }) => (
          <>
            <ListItem
              key={id}
              secondaryAction={
                <Tooltip title={`檢視 ${name} 醫囑歷史紀錄`}>
                  <IconButton aria-label="orders">
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemText primary={`名字 : ${name}`} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Card>
  );

  // return (
  //   <Collapse in={open} timeout={timeout}>
  //     sss
  //   </Collapse>
  // );
};

export const OrderList = memo(OrderListFC);
