import * as React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Stack, Box, IconButton, List } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./ActivityList";
import ActionMenu from './Actions';
import useActions from './hooks/useActions'
import { credentialsContext, getApiData } from "./WorkspaceContainer";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export default function Board(props) {
  const credentials = useContext(credentialsContext);
  const [boardData, setBoardData] = useState({ 
    ...props.data,
  });
  const [boardLists, setBoardLists] = useState([  ]);
  const { open, selectedValue, handleClose, handleClickOpen } = useActions();



  useEffect(() => {
    getApiData(setBoardLists, `https://api.trello.com/1/boards/${boardData.id}/lists?key=${credentials.key}&token=${credentials.token}`)
  }, [])

 

  //bucle in the useEffect to establish item list

  console.log(boardLists)

  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{boardData.name}</div>
          <IconButton variant="outlined" onClick={handleClickOpen} >
            <MoreVertIcon />
          </IconButton>
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <DragDropContext onDragEnd={result=> console.log(result, typeof boardLists)}> 
        <section className="boardLists">
          {boardLists.map((list,index) => <ActivityList data={list} key={list.id} index={index}/>)}
        </section>
        </DragDropContext>

      </Stack>
    </Box>
  );
}
