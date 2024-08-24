import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Divider, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, userAtom } from '../store/store';

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

export default function Profile() {
    const [auth, setAuth] = useRecoilState(authState);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useRecoilValue(userAtom);

    return (
        <div>
            <div onClick={handleOpen} className="rounded-full p-1 cursor-pointer hover:scale-105 transition-transform duration-200">
                <AccountCircleIcon
                    className="cursor-pointer"
                    htmlColor="white"
                    fontSize="medium"
                />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="div" align="center" gutterBottom>
                        <h1 className='text-3xl font-bold'>My Profile</h1>
                    </Typography>
                    <Divider />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {auth ? (
                            <div>
                                <div className='flex items-center space-y-1 flex-col'>
                                    <Avatar alt={user.username} src="/static/images/avatar/1.jpg" sx={{ width: 80, height: 80 }} />
                                    <h1 className='text-2xl font-semibold mt-2'>{user.username}</h1>
                                    <h1 className='text-gray-500 text-sm'>{user.digitalNumber}</h1>
                                </div>
                                <div className='mt-6 flex justify-center'>
                                    <Button
                                        onClick={() => {
                                            setAuth(false);
                                            localStorage.setItem('token', "");
                                            toast.success("Logged out successfully!!");
                                            handleClose();
                                        }}
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        sx={{
                                            textTransform: 'none',
                                            padding: '8px 24px',
                                            fontWeight: 'bold',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        ) : (
                          <div className='flex flex-col items-center justify-center h-full space-y-4'>
                          <AccountCircleIcon style={{ fontSize: 60, color: 'gray' }} />
                          <h1 className='text-xl font-semibold text-gray-600 text-center'>
                              Welcome!
                          </h1>
                          <h2 className='text-md text-gray-500 text-center'>
                              Please log in or register to continue
                          </h2>
                      </div>                      
                        )}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
