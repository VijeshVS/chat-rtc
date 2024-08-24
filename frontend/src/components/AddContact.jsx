import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from '@mui/material';
import { addContact } from '../utils/contact';
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, contactsAtom, userAtom } from '../store/store';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px', // Increased border-radius for smoother look
  outline: 'none',
};

export default function AddContactButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [contacts, setContacts] = useRecoilState(contactsAtom);
  const auth = useRecoilValue(authState);
  const user = useRecoilValue(userAtom);
  const [digitalNumber, setDigitalNumber] = useState('');

  return (
    <div>
      <div onClick={handleOpen} className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-full p-1 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out">
        <AddIcon htmlColor="white" fontSize="medium" />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" className="text-center mb-4">
            <h1 className='font-bold text-2xl'>Add Contact</h1>
          </Typography>
          <Typography id="modal-modal-description">
            {auth ? (
              <div className='flex flex-col space-y-4 mt-4'>
                <TextField
                  onChange={(e) => setDigitalNumber(e.target.value)}
                  value={digitalNumber}
                  label="Digital Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                  className='rounded-lg'
                  InputProps={{
                    className: 'rounded-lg',
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    const dups = contacts.filter((c) => c.digitalNumber === digitalNumber);

                    if (dups.length === 0) {
                      const res = addContact(digitalNumber, localStorage.getItem('token')).then((res) => {
                        const new_contact = res.user;
                        setContacts([...contacts, new_contact]);
                        try{
                          const localContacts = JSON.parse(localStorage.getItem('contacts'));
                          localContacts[user.username] = [...contacts, new_contact];
                          
                          localStorage.setItem('contacts',JSON.stringify(localContacts))
                        }
                        catch(e){
                          const name = user.username;
                          const new_contacts = {}
                          new_contacts[name] = [...contacts, new_contact]
                          localStorage.setItem('contacts',JSON.stringify(new_contacts))
                        }
                      });

                      toast.promise(res, {
                        pending: "Adding Contact...",
                        success: "Contact Added Successfully 👌",
                        error: "Contact not found !!",
                      });
                    } else {
                      toast.info("Contact is already added!");
                    }
                    handleClose();
                  }}
                  sx={{
                    textTransform: 'none',
                    padding: '10px 24px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                  }}
                >
                  Add
                </Button>
              </div>
            ) : (
              <div className='text-center text-gray-600 mt-6'>
                Please log in or register to continue.
              </div>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
