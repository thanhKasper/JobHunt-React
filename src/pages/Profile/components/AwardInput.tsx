import { Add } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import React from "react";
import AwardListItem from "./AwardListItem";

const AwardInput = ({
  awardList,
  onAwardsChange,
}: {
  awardList?: string[];
  onAwardsChange?: (awards: string[]) => void;
}) => {
  const [text, setText] = React.useState<string>("");
  const [awards, setAwards] = React.useState<string[]>(awardList ?? []);
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setAwards([...awards, (event.target as HTMLInputElement).value]);
      setText("");
      onAwardsChange?.([...awards, (event.target as HTMLInputElement).value]);
    }
  };

  return (
    <Stack>
      <TextField
        label="Các Giải Thưởng"
        placeholder="Các giải thưởng"
        id="awards"
        onKeyDown={handleEnterKey}
        value={text ?? ""}
        onChange={(e) => setText(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setAwards([...awards, text]);
                    setText("");
                  }}
                >
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack>
        {awards.map((award, pos) => (
          <AwardListItem
            key={award}
            award={award}
            pos={pos}
            updateAwards={(text, pos) => {
              const newAwards = [...awards];
              newAwards[pos] = text;
              setAwards(newAwards);
            }}
            removeAward={(pos) => {
              setAwards(awards.filter((_, i) => i !== pos));
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AwardInput;
