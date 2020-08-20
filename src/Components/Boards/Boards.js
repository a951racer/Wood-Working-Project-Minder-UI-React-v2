import React, { useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';

import BoardTable from './BoardTable'

const Boards = ({boards}) => {

  const sheetBoards = boards ? boards.filter((board) => board.material === 'Sheet') : null
  const hardwoodBoards = boards ? boards.filter((board) => board.material === 'Hardwood') : null
  const dimensionalBoards = boards ? boards.filter((board) => board.material === 'Dimensional') : null
  return (
      <>
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
