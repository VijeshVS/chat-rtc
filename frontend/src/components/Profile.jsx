import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, userAtom } from '../store/store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px', // or any other value you prefer
  };

export default function Profile() {
  const [auth,setAuth] = useRecoilState(authState);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useRecoilValue(userAtom);

  return (
    <div>
      <div onClick={handleOpen} className="rounded-2xl p-1 cursor-pointer hover:scale-105">
      <AccountCircleIcon
          className="cursor-pointer hover:scale-105"
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className='text-3xl font-bold'>My Profile</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {auth?<div>
              <div className='flex items-center space-y-1 flex-col'>
                      <h1 className='text-2xl'>{user.username}</h1>
                      <h1 className='text-gray-400 text-sm'>{user.digitalNumber}</h1>
              </div>
              <div className='mt-6 flex justify-center'>
                  <Button onClick={()=>{
                      setAuth(false)
                      localStorage.setItem('token',"");
                      toast.success("Logged out successfully !!");
                      handleClose();
                  }} variant="outlined" color="error">Logout</Button>
              </div>
            </div>:<div>Login / Register to continue</div> }
            
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}