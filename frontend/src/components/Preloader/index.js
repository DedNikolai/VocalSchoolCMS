import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import './index.scss'
import {colors} from "../../constants/view";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

function Preloader (props) {
  const {classes} = props
  return (
    <div className='preloader'>
      <CircularProgress className={classes.progress} color={colors.secondaryColor} />
    </div>
  )
}

Preloader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Preloader)
