import { Clear, KeyboardReturn, Save } from "@mui/icons-material";
import { IconButton, Input, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const AwardListItem = ({
  award,
  pos,
  updateAwards,
  removeAward,
}: {
  pos: number;
  award: string;
  updateAwards: (text: string, pos: number) => void;
  removeAward: (pos: number) => void;
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [previousText, setPreviousText] = React.useState<string>(award);
  const [editingText, setEditingText] = React.useState<string>(award);
  return (
    <Paper
      onDoubleClick={() => setEditMode(true)}
      sx={{
        marginTop: 1,
        paddingX: 2,
        paddingY: 0.5,
        borderLeft: 6,
        borderLeftColor: "secondary.main",
        marginLeft: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: 1,
        borderTopColor: "grey.400",
        borderBottom: 1,
        borderBottomColor: "grey.400",
        borderRight: 1,
        borderRightColor: "grey.400",
      }}
      elevation={0}
    >
      {editMode ? (
        <>
          <Input
            value={editingText ?? ""}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              color="info"
              size="small"
              onClick={() => {
                updateAwards(editingText, pos);
                setEditMode(false);
              }}
            >
              <Save fontSize="medium" color="info" />
            </IconButton>
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                setEditingText(previousText);
                setPreviousText(award);
                setEditMode(false);
              }}
            >
              <KeyboardReturn fontSize="medium" color="warning" />
            </IconButton>
          </Stack>
        </>
      ) : (
        <>
          <Typography>{previousText}</Typography>
          <IconButton
            color="error"
            size="small"
            onClick={() => removeAward(pos)}
          >
            <Clear fontSize="medium" />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default AwardListItem;
