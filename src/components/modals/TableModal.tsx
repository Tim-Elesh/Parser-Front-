import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

interface MyModalProps {
  open: boolean;
  handleClose: () => void;
  rowData: any;  // данные строки, которые будем передавать
}

const MyModal: React.FC<MyModalProps> = ({ open, handleClose, rowData }) => {
  if (!rowData) return null;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Открыть модальное окно</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <ModalDialog>
          <Typography component="h2">Заголовок модального окна</Typography>
          <Typography component="p">
            Здесь будет отображаться информация из вашей таблицы.
          </Typography>
          <Button onClick={handleClose}>Закрыть</Button>
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default MyModal;