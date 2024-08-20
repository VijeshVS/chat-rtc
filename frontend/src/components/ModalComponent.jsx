import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from "@mui/icons-material/Add";
import { Button } from '@mui/material';
import { addContact } from '../utils/contact';
import { toast } from "react-toastify";

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

export default function ModalComponent({contacts,setContacts}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [digitalNumber,setDigitalNumber] = React.useState();
  return (
    <div>
      <div onClick={handleOpen} className="bg-orange-500 rounded-2xl p-1 cursor-pointer hover:scale-105">
              <AddIcon htmlColor="white" fontSize="medium" />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className='font-semibold text-center text-xl'>Add contact</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='flex space-y-6 flex-col'>
            <input onChange={(e)=>setDigitalNumber(e.target.value)} className='focus:outline-none p-2 border-2 rounded-2xl w-full border-gray-300' type="text" placeholder='Enter digital number' />
            <Button variant="outlined" size="small" onClick={()=>{
                const dups = contacts.filter((c)=>{
                    return c.digitalNumber == digitalNumber;
                })

                if(dups.length == 0){
                    const res = addContact(digitalNumber,localStorage.getItem('token')).then((res)=>{
                        const user = res.user;
                        setContacts([...contacts,user]);
                        localStorage.setItem('contacts',JSON.stringify([...contacts,user]))
                    })
                    
                    toast.promise(res, {
                        pending: "Adding Contact....",
                        success: "Contact Added Successfully 👌",
                        error: "Contact not found !!",
                    });
                }
                else{
                    toast("Contact is added already !!")
                }
                handleClose()
            }}>Add</Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}