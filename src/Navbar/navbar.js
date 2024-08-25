import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, FormControl, Grid, InputLabel, MenuItem, Select, Slider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const drawerWidth = 250;

const Navbar = ({ handleChange=()=>{}, handleSlider=()=>{}, handleState=()=>{}  }) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [slider ,setSlider] = React.useState(100)

  const [visibility, setVisibility] = React.useState('visible');
  const [state, setState] = React.useState('All');

  const handleSelectChange = (event) => {
    setVisibility(event.target.value);
    handleChange(event.target.value);
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
    handleState(event.target.value);
  };

const handleSliderChange=(e)=>{

  setSlider(e.target.value);
  handleSlider(e.target.value);
}

  return (
    <>
      <Box sx={{ height: 100 }} >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Map Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant="persistent"
        anchor="top"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            // width: drawerWidth,
            height: '100px',
            boxSizing: 'border-box',
          },
        }}
        open={open} onClose={() => {
          setOpen(false);
        }}>
        <Box>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
          <Grid  display={'flex'} alignItems={'center'} justifyContent={'space-around'}>


          <Grid lg={12} width={300}>
          <InputLabel id="demo-simple-select-label">{`Color Intensity (${slider}%)`}</InputLabel>

          <FormControl fullWidth>

            <Slider
              size="small"
              defaultValue={50}
              value={slider}
              min={10}
              max={100}
              disabled={visibility == 'none'}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
              />
              </FormControl>
              </Grid >
              <Grid lg={12} width={300}>

            <FormControl variant='standard' fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="Visibility"
                onChange={handleStateChange}
                >
                <MenuItem value={'Arizona'}>Arizona</MenuItem>
                <MenuItem value={'Colorado'}>Colorado</MenuItem>
                <MenuItem value={'Connecticut'}>Connecticut</MenuItem>
                <MenuItem value={'All'}>All</MenuItem>
              </Select>
            </FormControl>
                </Grid >


 <Grid lg={12} width={300}>

            <FormControl variant='standard' fullWidth>
              <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={visibility}
                label="Visibility"
                onChange={handleSelectChange}
                >
                <MenuItem value={'visible'}>Visible</MenuItem>
                <MenuItem value={'none'}>Hide</MenuItem>
              </Select>
            </FormControl>
                </Grid >

          </Grid>
        </Box>


      </Drawer>
    </>
  )

}

export default Navbar;