import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio'

import './style.css'

function RedioButton ({selectedValue, handleChange}) {
    
    const CustomRadio = withStyles({
        root:{
            color: '"#ffb85b"', '&$checked': {color: '#ff9101'},
        },
        checked: {},
    }) ((props) => <Radio color="dafault" {...props} />)

    return (
        <>
        <div className="radioOptions">
        <div>
            <CustomRadio
            checked={selectedValue === 'all'}
            onChange={e => handleChange(e.target)}
            value='all'
            />
            <span>Todos</span>
        </div>
        <div>
            <CustomRadio
            checked={selectedValue === 'true'}
            onChange={e => handleChange(e.target)}
            value='true'
            />
            <span>Prioridade</span>
        </div>
        <div>
            <CustomRadio
            checked={selectedValue === 'false'}
            onChange={e => handleChange(e.target)}
            value='false'
            />
            <span>Normal</span>
        </div>
        </div>
        </>
    )
}

export default RedioButton