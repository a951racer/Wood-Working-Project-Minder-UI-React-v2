import React, { useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion'

import BoardTable from './BoardTable'
import FileUploadDialog from '../app/dialogs/FileUploadDialog'
import useProjects from '../../providers/projects/hook'
import useFetch from '../../providers/fetch/hook'

const Boards = ({boards}) => {
  const { currentProject } = useProjects()
  const { fetchViaApi } = useFetch()



  const sheetBoards = boards ? boards.filter((board) => board.material === 'Sheet') : null
  const hardwoodBoards = boards ? boards.filter((board) => board.material === 'Hardwood') : null
  const dimensionalBoards = boards ? boards.filter((board) => board.material === 'Dimensional') : null
  return (
      <>
        <FileUploadDialog label='CSV' mediaType='boards' projectId={currentProject._id}/>
        <Accordion multiple={true}>
          <AccordionTab header="Sheet Goods" disabled={!sheetBoards.length}>
            <BoardTable boards={sheetBoards} />
          </AccordionTab>
          <AccordionTab header="Hardwood" disabled={!hardwoodBoards.length}>
            <BoardTable boards={hardwoodBoards} />
          </AccordionTab>
          <AccordionTab header="Dimensional" disabled={!dimensionalBoards.length}>
            <BoardTable boards={dimensionalBoards} />
          </AccordionTab>
        </Accordion>
        <br />
      </>
  )
}

export default Boards
