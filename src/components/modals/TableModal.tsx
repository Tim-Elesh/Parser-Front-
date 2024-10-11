/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

interface MyModalProps {
  open: boolean;
  handleClose: () => void;
  rowData: any;
}

const MyModal: React.FC<MyModalProps> = ({ open, handleClose, rowData }) => {
  if (!rowData) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <ModalDialog>
        <Typography component="h2">{rowData.model || "Model Name Not Available"}</Typography>
        <Typography component="p">
          <Box>
            {Object.entries(rowData).map(([key, value]) => (
              <Box key={key} style={{ marginBottom: '8px' }}>
                <Typography component="span" fontWeight="bold">
                  {key}:
                </Typography>
                <Typography component="span" sx={{ marginLeft: '4px' }}>
                  {String(value)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Typography>
        <Button onClick={handleClose}>Закрыть</Button>
      </ModalDialog>
    </Modal>
  );
}

export default MyModal;