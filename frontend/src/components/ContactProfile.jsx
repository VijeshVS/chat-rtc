import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Avatar } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { selectContactAtom, authState } from '../store/store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px', // Smooth rounded corners
    outline: 'none',
};

export default function ContactProfile() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const contact = useRecoilValue(selectContactAtom);
    const auth = useRecoilValue(authState);

    // Determine if a profile should be shown based on contact and authentication status
    const showProfile = contact.username !== "Name" && auth;

    return (
        <div>
            <button 
                onClick={handleOpen} 
                className={`text-black text-sm py-2 px-5 font-semibold transition-transform duration-200 ease-in-out ${showProfile ? 'bg-white border-2 border-gray-300' : 'bg-gray-200 border-2 border-gray-400 cursor-not-allowed'} rounded-3xl shadow-sm hover:border-gray-500`}
                disabled={!showProfile}
            >
                Profile
            </button>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="div" align="center" gutterBottom>
                        <h1 className='text-3xl font-bold'>Contact Info</h1>
                    </Typography>
                    <Divider />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {showProfile ? (
                            <div className='flex items-center space-y-1 flex-col'>
                                <Avatar alt={contact.username} src="/static/images/avatar/1.jpg" sx={{ width: 80, height: 80 }} />
                                <h1 className='text-2xl font-semibold mt-2'>{contact.username}</h1>
                                <h1 className='text-gray-500 text-sm'>{contact.digitalNumber}</h1>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full space-y-4'>
                                <h1 className='text-xl font-semibold text-gray-600 text-center'>
                                    Welcome!
                                </h1>
                                <h2 className='text-md text-gray-500 text-center'>
                                    {auth ? "Select a contact to view their profile" : "Please log in or register to continue"}
                                </h2>
                            </div>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
