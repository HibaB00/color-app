import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
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
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
      render() {
          const { newPaletteName } = this.state
        return (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
              <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
              <DialogContent>
                <DialogContentText>
                  Please enter a name for your new beautiful palette. Make sure it's unique
                </DialogContentText>
                  <TextValidator 
                  value={newPaletteName}
                  label="Palette Name"
                  name="newPaletteName"
                  onChange={this.handleChange}
                  fullWidth
                  margin= "normal"
                  validators={["required", "isPaletteNameUnique"]}
                  errorMessages={["Enter Palette Name", "Name already used"]}
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  >Save Palette
                </Button>
              </DialogActions>
              </ValidatorForm>
            </Dialog>
          </div>
        );
      }
}

export default PaletteMetaForm
