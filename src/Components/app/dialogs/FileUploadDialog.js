import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { Chips } from 'primereact/chips'

import useFiles from '../../../providers/files/hook'

const FileUploadDialog = ({label, mediaType, id, onUpload}) => {

  const [showDialog, setShowDialog] = useState(false)
  const [file, setFile] = useState(null)
  const { uploadFile } = useFiles()
  
  const handleSelectedFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0])
  };

  const cancel = () => {
    setFile(null)
    setShowDialog(false)
  }

  const upload = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target)
    data.append('file', file)
    data.append('mediaType', mediaType)
    data.append('id', id)
    const response = await uploadFile(data)
    setFile(null)
    setShowDialog(false)
    onUpload(response.Location)
  }

////////////////////////

/*
  let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                      <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={cancel}/>
                      <Button label="Upload" icon="pi pi-check" className="scotchy-button" onClick={onUpload}/>
                    </div>;
*/

  return (
    <>
      <span className='button-box'>
        <Button className='p-shadow-3' type="button" label={'Upload ' + label} icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>
      </span>
      <Dialog visible={showDialog} style={{width:'25vw'}} header={'New ' + label} modal={true} /*footer={dialogFooter}*/ onHide={cancel}>
        {
          <div className="p-grid p-fluid">
            <div className="p-col-4 "><label htmlFor="name">File</label></div>
            <div className="p-col-8">
              <form onSubmit={upload}>
                <div className="form-group">
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={handleSelectedFile}
                  />
                  <button type='sumbit'>Upload</button>
                </div>
              </form>
            </div>
          </div>
        }
      </Dialog>
    </>
  )
}

export default FileUploadDialog