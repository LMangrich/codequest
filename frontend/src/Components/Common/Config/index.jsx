import { createTheme } from "@mui/material/styles";

const getCssVariableColor = (variableName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

const theme = createTheme({
  palette: {
    primary: {
      main: getCssVariableColor("--primary-color"),
    },
    secondary: {
      main: getCssVariableColor("--secondary-color"),
    },
    success: {
      main: getCssVariableColor("--tertiary-color"),
    },
    error: {
      main: getCssVariableColor("--error-color"),
    },
    background: {
      default: getCssVariableColor("--dark-blue-color"),
      paper: getCssVariableColor("--light-blue-color"),
    },
    text: {
      primary: getCssVariableColor("--text-color"),
      secondary: getCssVariableColor("--text-weak-color"),
      disabled: getCssVariableColor("--disabled-color"),
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: getCssVariableColor("--text-weak-color"),

            "&:hover": {
              color: getCssVariableColor("--text-color"),
              backgroundColor: getCssVariableColor("--dark-blue-color"),
            },

            "&:focus": {
              color: getCssVariableColor("--text-color"),
            },
            "& .MuiFilledInput-root": {
              background: getCssVariableColor("--light-blue-color"),
            },
          },
          //Outlined
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: getCssVariableColor("--text-color"),
              color: getCssVariableColor("--text-color"),
            },
            "&:hover ": {
              backgroundColor: getCssVariableColor("--dark-blue-color"),
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            backgroundColor: getCssVariableColor("--dark-blue-color"),
            color: getCssVariableColor("--text-color"),
          },
          //Filled
          "& .MuiFilledInput-root": {
            backgroundColor: getCssVariableColor("--light-blue-color"),
            borderRadius: 6,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: getCssVariableColor("--text-color"),
              color: getCssVariableColor("--text-color"),
              borderRadius: 6,
            },
            "&:hover ": {
              backgroundColor: getCssVariableColor("--dark-blue-color"),
              borderRadius: 6,
            },
            "&.Mui-focused": {
              backgroundColor: getCssVariableColor("--dark-blue-color"),
              color: getCssVariableColor("--text-color"),
            },
          },
          //Label
          "& .MuiInputLabel-root.Mui-focused": {
            backgroundColor: "transparent",
            color: getCssVariableColor("--text-color"),
          },
          //Icons
          "& .MuiInputAdornment-root": {
            color: getCssVariableColor("--text-weak-color"),
          },
          //Border
          "& .MuiInputBase-root.MuiFilledInput-root::after": {
            borderBottom: `2px solid ${getCssVariableColor(
              "--secondary-color"
            )}`,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          color: getCssVariableColor("--text-weak-color"),
          background: getCssVariableColor("--light-blue-color"),
          "&:hover .MuiOutlinedInput-root": {
            backgroundColor: getCssVariableColor("--dark-blue-color"),
            color: getCssVariableColor("--text-color"),
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            backgroundColor: "var(--dark-blue-color)",
            color: getCssVariableColor("--text-color"),
          },
          ":disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          },
          //Icons
          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
            color: getCssVariableColor("--text-weak-color"),
            marginRight: 2,
          },
          "&:hover .MuiAutocomplete-endAdornment .MuiSvgIcon-root, & .MuiOutlinedInput-root.Mui-focused .MuiAutocomplete-endAdornment .MuiSvgIcon-root":
            {
              color: getCssVariableColor("--text-color"),
            },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: getCssVariableColor("--default-color"),
          color: getCssVariableColor("--text-weak-color"),
          "&:hover": {
            color: getCssVariableColor("--text-color"),
            "& .MuiSvgIcon-root": {
              color: getCssVariableColor("--text-color"),
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: getCssVariableColor("--default-color"),
          color: getCssVariableColor("--text-color"),
          "&.Mui-disabled": {
            background: getCssVariableColor("--disabled-color"),
            color: getCssVariableColor("--text-color"),
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: getCssVariableColor("--text-weak-color"),
          "&.Mui-checked": {
            color: getCssVariableColor("--text-color"),
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
          "& .MuiSwitch-track": {
            borderRadius: 22 / 2,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: 16,
              height: 16,
            },
            "&::before": {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                getCssVariableColor("--tertiary-color")
              )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
              left: 12,
            },
            "&::after": {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                getCssVariableColor("--tertiary-color")
              )}" d="M19,13H5V11H19V13Z" /></svg>')`,
              right: 12,
            },
          },
          "& .MuiSwitch-thumb": {
            boxShadow: "none",
            width: 16,
            height: 16,
            margin: 2,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: getCssVariableColor("--text-weak-color"),
          backgroundColor: getCssVariableColor("--light-blue-color"),
          border: `1px solid ${getCssVariableColor("--dark-blue-color")}`,
          borderRadius: 6,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 15,
          marginLeft: 0,
          marginRight: 0,
          wordBreak: "break-word",
          "&:hover": {
            color: getCssVariableColor("--text-color"),
            backgroundColor: getCssVariableColor("--dark-blue-color"),
            border: `1px solid${getCssVariableColor("--text-color")}`,
          },
        },
      },
    },
  },
});

export default theme;
