import React from 'react';
import { FaTimes } from 'react-icons/fa';
import {Button, Box} from '@mui/joy';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const TableModal: React.FC<ModalProps> = ({isOpen , onClose}) => {
  if (!isOpen) return null;

    return(
        <>
         <Box sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
         }}>
            <Box sx={{bgcolor: 'white', p: 6, position: 'relative'}}>
                <Button
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  color: 'grey.500',
                  '&:hover': {
                    color: 'grey.700',
                  },
                }}
                >
                  <FaTimes />
                </Button>
              </Box>
          </Box>
        </>
    )
}

export default TableModal;