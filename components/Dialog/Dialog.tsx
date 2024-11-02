import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { APIDocument } from '@/types/chat';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    background: '#202123',
    color: 'white',
  },
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2),
    background: '#1a1a1a',
    color: 'white',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface Props {
  documents: APIDocument[];
}

export const CustomizedDialogs: React.FC<Props> = ({ documents }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = useState<APIDocument>();

  const handleClickOpen = (document: APIDocument) => {
    setSelectedDocument(document);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {documents && documents.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {documents.map((document) => (
            <Button
              key={document.id}
              variant="outlined"
              onClick={() => handleClickOpen(document)}
            >
              Page: {document.metadata.page} {'('}Score:{' '}
              {document.metadata.score.toFixed(3)}
              {')'}
            </Button>
          ))}
        </div>
      ) : null}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {selectedDocument ? (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              DSM-5.pdf {'('}Page: {selectedDocument.metadata.page}
              {')'}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>
                {selectedDocument.page_content}
              </Typography>
            </DialogContent>
          </>
        ) : (
          <></>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
};
