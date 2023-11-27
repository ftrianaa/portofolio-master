"use client"

import React, { useEffect, useState } from 'react'
import { ArrowBackRounded, Save } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import { Box, Button, Container, FormControl, Input, Paper, TextField, TextareaAutosize, Typography } from '@mui/material'
import ReactSelect from 'react-select'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import experiencesService from '../../../../public/services/experiencesService';

const CreateExperience = () => {
     const [inputExperience, setInputExperience] = useState({})

     const handleInputExperience = async () => {

          const newDataExperience = { ...inputExperience, tags: ["Next.js"], preview: 'https://firebasestorage.googleapis.com/v0/b/portofolio-578ef.appspot.com/o/experiences%2Folimall_500x500.png?alt=media&token=712cc067-dfab-4677-a5d5-4d850100041a' }
          const responseCreateInputExperience = await experiencesService.createExperience(newDataExperience)
          return console.log(responseCreateInputExperience)
     }

     useEffect(() => {
          return () => setInputExperience({})
     }, [])

     return (
          <Container maxWidth='xl'>
               <Box display={'flex'} justifyContent={'space-between'} style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <Typography variant='h5'>Experience List</Typography>
                    <Button variant="outlined" startIcon={<ArrowBackRounded />} href='/experiences'>
                         Back
                    </Button>
               </Box>
               <Paper style={{ padding: 30 }}>
                    <FormControl fullWidth>
                         <TextField
                              id="outlined-multiline-flexible"
                              label="Title"
                              multiline
                              maxRows={4}
                              onChange={(e) => setInputExperience({ ...inputExperience, title: e.target.value })}
                         />
                    </FormControl>
                    <FormControl fullWidth style={{ paddingTop: 10 }}>
                         <TextField
                              id="outlined-multiline-static"
                              label="Description"
                              multiline
                              rows={4}
                              onChange={(e) => setInputExperience({ ...inputExperience, desc: e.target.value })}
                         />
                    </FormControl>
                    <FormControl>
                         {/* <ReactSelect /> */}
                    </FormControl>
                    <FormControl fullWidth style={{ paddingTop: 10 }}>
                         <TextField
                              id="outlined-multiline-flexible"
                              label="Link Portofolio"
                              multiline
                              maxRows={4}
                              onChange={(e) => setInputExperience({ ...inputExperience, link: e.target.value })}

                         />
                    </FormControl>
                    <FormControl style={{
                         paddingTop: 10
                    }}>
                         <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                              Upload file
                              <Input type="file" style={{
                                   clip: 'rect(0 0 0 0)',
                                   clipPath: 'inset(50%)',
                                   height: 1,
                                   overflow: 'hidden',
                                   bottom: 0,
                                   left: 0,
                                   whiteSpace: 'nowrap',
                                   width: 1,
                              }} />
                         </Button>
                    </FormControl>
                    <div style={{ paddingTop: 10 }}>
                         <FormControl>
                              <Button startIcon={<Save />} onClick={handleInputExperience}>
                                   Submit
                              </Button>
                         </FormControl>
                    </div>
               </Paper>
          </Container>
     )
}

export default CreateExperience