import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

// Import Get rotation api
import { getAllRotations } from "../../../actions/ConfigActions";

// Other imports
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Department from "./components/Department";


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  gridwrapper: {
    paddingLeft: 20
  },
  card: {
    height: 560,
    padding: 20
  },
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  },
  smallCard: {
    height: 'auto',
    padding: 20
  }
});

class rotationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,

      // For get rotations
      rotations: {},
      rotationDisplay: [],
      rotationLength: 0,

      // Access level
      accesslevel: props.accesslevel
    };

  }

  componentDidMount() {
    this.props.getAllRotations();
  }

  componentDidUpdate(prevProps,prevState) {
    // if (this.props.rotations && prevState.rotations != this.props.rotations && this.props.rotations.length>0){
    if (prevProps.rotations != this.props.rotations || prevState.rotations != this.state.rotations) {
      this.setState({
        ...this.state,
        rotations: this.props.rotations.rotations,
        rotationLength: this.props.rotations.rotations.length
      });
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.props.rotations !=nextProps || this.state.rotations != nextState
  }


  render() {
    let classes = this.state.classes;

    const renderRotations = (this.state.rotationLength>0)? (
 
      // When rotations array is not empty
      <div className={classes.gridwrapper}>
      
    
        <Grid container spacing={24}>
        {/* Display rotation */}
        {this.state.rotations.map((r, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card className={this.state.accesslevel==="admin"? classes.card : classes.smallCard}>
                  <Department data={r.data} category={r.category} sK={r.sK} pK={r.pK} name={r.name} duration={r.duration} championName={r.championName} championEmail={r.championEmail} capacity={r.capacity} mode={1} />
                </Card>
              </Grid>
            )
          })}

          {/* Add rotation */}
          <Grid item xs={12} md={6} lg={4}>
            <Card className={this.state.accesslevel==="admin"? classes.card:classes.hide}>
              <Department mode={3} />
            </Card>
          </Grid>
      
        </Grid>

      </div>
      
    ): (<div className={classes.gridwrapper}>
      
    {/* When rotations array is empty */}
    {/* Add rotation */}
    <Grid container spacing={24}>
      <Grid item xs={12} md={6} lg={4}>
        <Card className={this.state.accesslevel==="admin"? classes.card: classes.hide}>
          <Department mode={3} />
        </Card>
      </Grid>
  
    </Grid>

  </div>)
  return (
    <div>
    {renderRotations}
    
    </div>
  )
  };
}

rotationCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ rotation, auth }) => {
  const { rotations } = rotation;
  const { accesslevel } = auth;
  return { rotations,accesslevel };
};

export default connect(
  mapStateToProps,
  { getAllRotations }
)(withStyles(styles)(rotationCard));
