import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = theme => ({
  root:{
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {

  }
})

class PaletteFormNav extends Component {
    constructor(props){
        super (props)
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
            this.props.palettes.every(
              ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            ) 
        );
    }

    handleChange(e){
        this.setState({
          [e.target.name]: e.target.value 
        })
    }
    render() {
        const { classes, open, palettes, handleSubmit } = this.props
        const { newPaletteName } = this.state
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              color="default"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.props.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Create A Palette
                </Typography>
              </Toolbar>
              <div className={classes.navBtns}>
                  <Link to="/">
                    <Button variant="contained" color="secondary">GO BACK</Button>
                  </Link>
                  <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open form dialog
                  </Button>
              </div>
            </AppBar>
            {this.state.formShowing && (<PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>)}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true}) (PaletteFormNav)
