import React, { Component } from "react";
import {
  alpha,
  AppBar,
  Box,
  Button,
  createTheme,
  InputBase,
  Modal,
  Rating,
  Stack,
  styled,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Login, Search } from "@material-ui/icons";

const theme = createTheme({
  palette: {
    black: {
      main: "#272727",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
    },
  },
});

const SearchArea = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

class Header extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="black">
            <Toolbar className="px-md-5">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/home" className="text-white">
                  EBookVendor
                </Link>
              </Typography>
              <SearchArea>
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search EBooks..."
                  inputProps={{ name: "search" }}
                />
              </SearchArea>
              <Link to="/login">
                <Button color="white" variant="outlined" startIcon={<Login />}>
                  Login
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    );
  }
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 4,
      review: "",
      isOpen: false,
    };
  }
  handleOpen() {
    this.setState({
      isOpen: true,
    });
  }
  handleClose() {
    this.setState({
      isOpen: false,
    });
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleRating(newValue) {
    this.setState({
      rating: newValue,
    });
  }
  handleSubmit() {
    console.log(this.state);
    this.handleClose();
  }
  render() {
    const style = {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      background: "#fff",
      border: "2px solid #272727",
      p: 4,
      textAlign: "center",
    };
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="black">
            <Toolbar sx={{ mx: "auto" }}>
              <Button
                variant="text"
                size="large"
                color="white"
                onClick={() => this.handleOpen()}
              >
                Write us a review
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Modal open={this.state.isOpen} onClose={() => this.handleClose()}>
          <Stack spacing={2} sx={style}>
            <Typography variant="h5">Write a review</Typography>
            <TextField
              label="Multiline"
              multiline
              rows={4}
              fullWidth
              variant="filled"
              value={this.state.review}
              name="review"
              onChange={(event) => this.handleUserInput(event)}
            />
            <Stack direction="row" justifyContent="space-between">
              <Button variant="contained" onClick={() => this.handleSubmit()}>
                Submit
              </Button>
              <Rating
                size="large"
                value={this.state.rating}
                onChange={(event, newValue) => this.handleRating(newValue)}
              />
            </Stack>
          </Stack>
        </Modal>
      </ThemeProvider>
    );
  }
}

const UserTemplate = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default UserTemplate;
