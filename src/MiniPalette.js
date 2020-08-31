import React from 'react';
import styles from './styles/MiniPaletteStyles'
import { withStyles } from '@material-ui/core/styles';

function MiniPalette(props){
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(color =>(
        <div 
        className={classes.miniColor} 
        style={{backgroundColor: color.color}}
        key={color.name}
        />
    ))
    console.log(classes)
    return(
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles) (MiniPalette)