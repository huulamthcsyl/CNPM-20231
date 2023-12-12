import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function AutoComplete({optionList, onChange}) {
    return (
        <Autocomplete
            disablePortal
            autoHighlight
            options={optionList}
            getOptionLabel={(option) => option.label}
            onChange={onChange ? onChange : ''}
            sx={{
              "& .MuiAutocomplete-input": {
                fontSize: 20,
              },
              width: 500,
            }}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.label} (CCCD: {option.code})
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="" />}
          />
    );
}