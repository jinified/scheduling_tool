import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete"
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

// Dialog
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

// Import rotation api
import {
  getAllRotations,
  addRotation,
  updateRotation,
  removeRotation,
  removeRotationSuccess
} from "../../../../actions/index"

import axios from 'axios';

// Dialog Box Styling
const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0
  }
}))(props => {
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

// Other styling
const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
    marginLeft: 0
  },
  fullHeight: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  cardheading: {
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1769aa"
  },
  iconPosition: {
    textAlign: "right",
    // paddingTop: 10
  },
  carddata: {
    marginTop: 15,
    marginBottom: 15
  },
  addButton: {
    lineHeight: "540px"
  },
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  },
  dialog: {
    textAlign: "center"
  },
  dialogButtonWrapper: {
    marginBottom: 30,
    margin: "0 auto"
  },
  dialogButton: {
    borderRadius: 8,
    width: 100
  }
});

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      deleteDialog: false,

      // Get rotation details
      mode: props.mode,
      pK: props.pK,
      sK: 'ROTATION',
      categoryData: props.data,
      category: props.category,
      name: props.name,
      duration: props.duration,
      championName: props.championName,
      championEmail: props.championEmail,
      capacity: props.capacity,

      // Updated rotationd details
      updatedDepartmentName: "",
      updatedDuration: 0,
      updatedChampionName: "",
      updatedChampionEmail: "",
      updatedCapacity: 0,
      updatedpK: "",
      updatedCategory: "",

      // Auth: Access level
      accesslevel: props.accesslevel,


    };

    // To enable usage in this page
    this.originalMode = props.mode;
  }


  save() {
    if(this.state.accesslevel==="admin"){
      if (this.validate()) {
        console.log("inputs validated, saving this rotation");
  
        // Format into api interface
        let rotationData ={
          name: this.state.updatedDepartmentName,
          duration: this.state.updatedDuration,
          capacity: this.state.updatedCapacity,
          championName: this.state.updatedChampionName,
          championEmail: this.state.updatedChampionEmail,
          category: this.state.updatedCategory,
          data: this.state.updatedCategory, // Category Data is same as category
          sK: this.state.sK,
          pK: this.state.updatedpK
        }
  
        // Print rotation data
        console.log("rotationData", rotationData);
  
        // Differentiate update/add using this.state.pK
        // Update rotation data
        if (this.state.pK) {
          this.props.updateRotation(
            this.state.updatedpK,
            rotationData
          );
          console.log('getting all rotations....')
  
          // Set state to re-render to getAllRotations
          this.setState({
            ...this.state,
            name: this.state.updatedDepartmentName,
            duration: this.state.updatedDuration,
            capacity: this.state.updatedCapacity,
            championName: this.state.updatedChampionName,
            championEmail: this.state.updatedChampionEmail,
            category: this.state.updatedCategory,
            data: this.state.updatedCategory, // Category Data is same as category
            sK: this.state.sK,
            pK: this.state.pK
            
          })
  
          // Refresh page to get all rotations
          console.log('updated. All rotation successfully fetched!')
        }
        else{
          // Add Rotation Data
          const addResponse = this.props.addRotation([rotationData]);
  
          console.log('adding rotation.....');
          console.log('addResponse',addResponse)
  
          // Refresh page to get all rotations
          console.log('new rotation added! Fetching all rotations...')
        }
        
        // Exit edit mode
        this.exitEditMode()
  
      }
    }
  }

  validate() {
    console.log('validating inputs')
    return (
      this.state.updatedDepartmentName &&
      this.state.updatedDuration &&
      this.state.updatedChampionName &&
      this.state.updatedChampionEmail &&
      this.state.updatedCapacity &&
      this.state.updatedCategory &&
      this.state.updatedpK
    );
  };

  deleteRotation = () => {
    if(this.state.accesslevel==="admin"){
      this.props.removeRotation(this.state.pK);
      console.log('removing rotation with ID:', this.state.pK);

      // On removeRotationSuccess, close dialogBox
      this.closeDeleteDialog();

      console.log("Successfully removed rotation with ID: ", this.state.pK);

      // Get rotations after rotation is removed
      console.log('fetching all rotations...')  
    }
  };

  showDeleteDialog = () => {
    if(this.state.accesslevel==="admin"){
      this.setState({ deleteDialog: true });
    } 
  };

  closeDeleteDialog = () => {
    if(this.state.accesslevel==="admin"){
      this.setState({ deleteDialog: false });
    }
  };

  showEditMode = () => {
    if (this.state.accesslevel==="admin"){
      this.setState({
        ...this.state,
        mode: 2,
        updatedDepartmentName: this.state.name,
        updatedDuration: this.state.duration,
        updatedChampionName: this.state.championName,
        updatedChampionEmail: this.state.championEmail,
        updatedCapacity: this.state.capacity,
        updatedCategory: this.state.category,
        updatedpK: this.state.pK
      });
    }   
  };

  exitEditMode = () => {
    if(this.state.accesslevel==="admin"){
      this.setState({
        // Clear inputs
        updatedDepartmentName: "",
        updatedDuration: 0,
        updatedChampionName: "",
        updatedChampionEmail: "",
        updatedCapacity: 0,
        updatedCategory: "",
        updatedpK: "",
  
        // Revert to original mode
        mode: this.originalMode
      });  
    }
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    let classes = this.state.classes;

    // For Display Rotation
    const rotationHeaders = [
      "Department Name",
      "Rotation Period",
      "Champion Name",
      "Champion Email",
      "Max Capacity",
      "Category",
      "Rotation ID",
    ];
    const rotationValues = [
      this.state.name,
      this.state.duration + (this.state.duration > 1 ? " months" : " month"),
      this.state.championName,
      this.state.championEmail,
      this.state.capacity + (this.props.capacity > 1 ? " protégés" : " protégé"),
      this.state.category,
      this.state.pK
    ];
    const placeholderValues = [
      this.state.name,
      this.state.duration,
      this.state.championName,
      this.state.championEmail,
      this.state.capacity,
      this.state.category,
      this.state.pK
    ];
    const endAdornment = ["", "month(s)", "", "", "protégé(s)","","",""];
    const fieldType = ["text", "number", "text", "text", "number","text","text","text"];
    const rotationNames = [
      "updatedDepartmentName",
      "updatedDuration",
      "updatedChampionName",
      "updatedChampionEmail",
      "updatedCapacity",
      "updatedCategory",
      "updatedpK"
    ];
    let updatedRotationValues = [
      this.state.updatedDepartmentName,
      this.state.updatedDuration,
      this.state.updatedChampionName,
      this.state.updatedChampionEmail,
      this.state.updatedCapacity,
      this.state.updatedCategory,
      this.state.updatedpK
    ];


    return (
      // Display Icons
      <div>
        <div
          className={this.state.accesslevel==="admin"? (this.state.mode === 1 || this.state.mode === 2? classes.iconPosition: classes.hide):classes.hide}
        >
          <IconButton
            onClick={this.showEditMode.bind(this)}
            aria-label="edit"
            className={
              this.state.mode === 1 ? classes.showInline: classes.hide
            }
          >
            <Edit />
          </IconButton>

          <IconButton
            onClick={this.save.bind(this)} 
            aria-label="save"
            className={
              this.state.mode === 2 ? classes.showInline : classes.hide
            }
          >
            <Save />
          </IconButton>

          <IconButton
            onClick={this.showDeleteDialog.bind(this)}
            aria-label="delete"
            className={
              this.state.mode === 1 ? classes.showInline: classes.hide
            }
          >
            <Delete />
          </IconButton>

          <IconButton
            onClick={this.exitEditMode.bind(this)}
            aria-label="cancel"
            className={
              this.state.mode === 2 ? classes.showInline : classes.hide
            }
          >
            <Cancel />
          </IconButton>
        </div>
        
        {/* Display rotations */}
        <div>
          {rotationHeaders.map((header, index) => {
            return (

              <div key={header + index}>
                <p
                  className={`${
                    this.state.mode === 1 || this.state.mode === 2
                      ? classes.show
                      : classes.hide
                  } ${classes.cardheading}`}
                >
                  {header}
                </p>
                <p
                  className={`${
                    this.state.mode === 1 ? classes.show : classes.hide
                  } ${classes.carddata}`}
                >
                  {rotationValues[index]}
                </p>
                <div
                  className={
                    this.state.mode === 2 ? classes.show : classes.hide
                  }
                >
                  <Input
                    fullWidth
                    className={classes.input}
                    inputProps={{
                      "aria-label": header
                      // "aria-label": "Department Name"
                    }}
                    placeholder={placeholderValues[index] ? `${placeholderValues[index]}`: ''}
                    value={updatedRotationValues[index]}
                    endAdornment={
                      <InputAdornment position="end">
                        {endAdornment[index]}
                      </InputAdornment>
                    }
                    // name={header}
                    type={fieldType[index]}
                    name={rotationNames[index]}
                    disabled={this.state.pK ? index === 6 : false}
                    onChange={this.handleInputChange.bind(this)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Add rotation */}
        <div
          onClick={this.showEditMode.bind(this)}
          className={`${this.state.mode === 3 || this.state.accesslevel==="admin"? classes.show : classes.hide} ${
            this.state.accesslevel==="admin"? classes.fullHeight: classes.hide
            }`}
        >
          <span className={classes.addButton}>
            <IconButton>
              <AddCircleOutline style={{ fontSize: 100 }} />
            </IconButton>
          </span>
        </div>

        {/* Dialog Box */}
        <Dialog
          open={this.state.deleteDialog}
          onClose={this.closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle>REMOVE ROTATION</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove "<b>{this.state.name}</b>"
              rotation?
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogButtonWrapper}>
            <Button
              onClick={this.closeDeleteDialog}
              className={classes.dialogButton}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.deleteRotation} 
              className={classes.dialogButton}
              color="primary"
              autoFocus
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Department.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({auth}) => {
  const {accesslevel} = auth;
  return {accesslevel}
};

export default connect(
  mapStateToProps,
  { addRotation, getAllRotations, updateRotation, removeRotation, removeRotationSuccess }
)(withStyles(styles)(Department));
