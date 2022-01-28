import * as React from "react";
import axios from "axios";

import {
    IconButton,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { useState, useContext } from "react";
import { credentialsContext } from "../App";
import { blueGrey } from '@mui/material/colors';

import { CirclePicker } from 'react-color';

export default function BoardPreview(props) {
    const credentials = useContext(credentialsContext);
    const [boardData, setBoardData] = useState({ ...props.data });
    const [isColorBeingPicked, setIsColorBeingPicked] = useState(false);
    const hexToColorName = { blue: '#0000ff', orange: '#ffa500', green: '#008000', red: '#ff0000', purple: '#800080', pink: '#ffc0cb', lime: '#bfff00', grey: '#808080' }

    async function handleColorChange(color) {
        const hexColor = color.hex;
        const newColor = Object.keys(hexToColorName).find(key => hexToColorName[key] === hexColor);
        const updateResponse = await axios.put(`https://api.trello.com/1/boards/${boardData.id}/?prefs/background=${newColor}&key=${credentials.key}&token=${credentials.token}`);
        setBoardData({ ...boardData, prefs: { ...boardData.prefs, backgroundBottomColor: color.hex } });
        setIsColorBeingPicked(false);
    }

    const allowedColors = ['blue', 'orange', 'green', 'red', 'purple', 'pink', 'lime', 'grey'];
    let colorPickerRender = <></>;
    if (isColorBeingPicked) {
        colorPickerRender = <CirclePicker color={boardData.prefs.backgroundBottomColor} colors={allowedColors} onChangeComplete={handleColorChange} />
    }

    let iconsContainer = (
        <>
            <IconButton aria-label="settings" onClick={(event) => { setIsColorBeingPicked(!isColorBeingPicked); event.stopPropagation() }}>
                <AutoFixHighIcon fontSize="small" sx={{ color: blueGrey[800] }} />
            </IconButton>
            <IconButton aria-label="settings" >
                <DeleteOutlineOutlined fontSize="small" sx={{ color: blueGrey[800] }} />
            </IconButton>
        </>
    )
    let icons = (props.icons === true) ? iconsContainer : <></>;


    return (

        <>
            <Card sx={{ maxWidth: 300, backgroundColor: boardData.prefs.backgroundBottomColor, color: '#292929', borderRadius: 2.5 }}
            >
                <CardHeader
                    title={boardData.name}
                >
                </CardHeader>
                <CardContent>
                    {icons}
                </CardContent>
            </Card>
            {colorPickerRender}
        </>
    );
}