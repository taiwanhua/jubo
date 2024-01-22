import type { ThemeOptions } from "@mui/material/styles";

export const defaultThemeOptions: ThemeOptions = {
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
    MuiButton: {
      defaultProps: {
        size: "medium",
        variant: "contained",
        type: "button",
        color: "primary",
        sx: { marginLeft: 2 },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "medium",
        type: "button",
        sx: { marginTop: 1 },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
        shrink: true,
        sx: {
          userSelect: "auto",
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        margin: "dense",
        variant: "outlined",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
};
