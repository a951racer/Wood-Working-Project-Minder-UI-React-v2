import React, { useState } from 'react';
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { Chips } from 'primereact/chips'

import useFiles from '../../../providers/files/hook'

const FileUploadDialog = (props) => {

  const [showDialog, setShowDialog] = useState(false)
  const [file, setFile] = useState(null)
  const { uploadFile } = useFiles()
  const { label, mediaType, projectId } = props

  const handleSelectedFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0])
  };

  const cancel = () => {
    setFile(null)
    setShowDialog(false)
  }

  const onUpload = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target)
    data.append('file', file, label)
    data.append('mediaType',mediaType)
    data.append('projectId', projectId)
    await uploadFile(data)
    setFile(null)
    setShowDialog(false)
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
      <div style={{textAlign: 'center'}} >
        <Button className='p-shadow-3' type="button" label={'Upload ' + label} icon="pi pi-fw pi-plus" style={{marginBottom: '.5em'}} onClick={() => setShowDialog(true)} ></Button>
      </div>

      <Dialog visible={showDialog} style={{width:'25vw'}} header={'New ' + label} modal={true} /*footer={dialogFooter}*/ onHide={cancel}>
        {
          <div className="p-grid p-fluid">
            <div className="p-col-4 "><label htmlFor="name">File</label></div>
            <div className="p-col-8">
              <form onSubmit={onUpload}>
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