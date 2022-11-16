import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Item } from './TabComponent';
import '../styles/index.css';

function ModalComponent(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        handleOpen(false)
    }
    const { openModal, data ,handleOpen } = props;


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        setOpen(true)
    }, [openModal]);



    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {data?.items && data.items.map((item: Item, index: number) => {
                    return <div key={index} className="modalcontainer">
                        <div>
                            <span className="textLabel">{item.label}:</span>
                            <span>{item.value}</span>
                        </div>
                    </div>


                })}
            </Box>
        </Modal>
    )
}

export default ModalComponent