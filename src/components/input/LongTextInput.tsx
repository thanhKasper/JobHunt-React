import { Add } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import React from "react";
import TextListItem from "./TextListItem";

interface LongTextInputProps {
  textList: string[];
  onListChange: (list: string[]) => void;
  label: string;
  placeholder: string;
}

const LongTextInput = ({
  label,
  placeholder,
  textList,
  onListChange,
}: LongTextInputProps) => {
  const [text, setText] = React.useState<string>("");
  const [texts, setTexts] = React.useState<string[]>(textList ?? []);
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTexts([...texts, (event.target as HTMLInputElement).value]);
      setText("");
      onListChange?.([...texts, (event.target as HTMLInputElement).value]);
    }
  };

  return (
    <Stack>
      <TextField
        autoComplete="off"
        label={label}
        placeholder={placeholder}
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
                    setTexts([...texts, text]);
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
        {texts.map((text, pos) => (
          <TextListItem
            key={text}
            text={text}
            pos={pos}
            updateTexts={(updatedText, pos) => {
              const newAwards = [...texts];
              newAwards[pos] = updatedText;
              setTexts(newAwards);
            }}
            removeText={(pos) => {
              setTexts(texts.filter((_, i) => i !== pos));
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default LongTextInput;
