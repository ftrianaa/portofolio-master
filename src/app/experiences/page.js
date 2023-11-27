'use client'

import { Box, Button, Chip, Container, IconButton, Paper, Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import experiencesService from '../../../public/services/experiencesService'
import { Add, DeleteRounded, EditRounded, OpenInNewRounded } from '@mui/icons-material'

const ListExperience = () => {
     const [open, setOpen] = useState(false)
     const [listExperience, setListExperience] = useState([])

     const handleClose = () => {
          setOpen(false);
     };

     const fetchListExperience = async () => {
          try {
               const responseListExperiences = await experiencesService.getAllExperiences()
               if (responseListExperiences.success) {
                    setListExperience(responseListExperiences.data)
               } else {
                    <Snackbar
                         open={open}
                         autoHideDuration={6000}
                         onClose={handleClose}
                         message="Failed to get data"
                    />
               }
          } catch (error) {
               <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={error.message}
               />
          }

     }

     const handleDeleteExperience = async (id) => {
          try {
               const responseDeleteExperience = await experiencesService.deleteExperience(id)
               if (responseDeleteExperience.success) {
                    fetchListExperience()
               }
               else {
                    <Snackbar
                         open={open}
                         autoHideDuration={6000}
                         onClose={handleClose}
                         message="Failed to delete data"
                    />
               }
          } catch (error) {
               <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={error.message}
               />
          }
     }

     useEffect(() => {
          fetchListExperience()
          return () => setListExperience([])
     }, [])

     return (
          <Container maxWidth={'xl'} >
               <Box display={'flex'} justifyContent={'space-between'} style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <Typography variant='h5'>Experience List</Typography>
                    <Button variant="outlined" startIcon={<Add />} href='/experiences/create'>
                         Add Experience
                    </Button>
               </Box>
               <TableContainer component={Paper}>
                    <Table>
                         <TableHead>
                              <TableRow>
                                   <TableCell>No</TableCell>
                                   <TableCell>Title</TableCell>
                                   <TableCell>Description</TableCell>
                                   <TableCell>Tags</TableCell>
                                   <TableCell>Created At</TableCell>
                                   <TableCell>Updated At</TableCell>
                                   <TableCell>Actions</TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {listExperience.map((item, index) => {
                                   return (
                                        <TableRow key={index}>
                                             <TableCell>{index + 1}</TableCell>
                                             <TableCell>{item.title}</TableCell>
                                             <TableCell style={{ width: 400 }}>{item.desc}</TableCell>
                                             <TableCell>
                                                  {item.tags.map((tag, id) => {
                                                       return (
                                                            <Chip key={id} label={tag} variant="outlined" />
                                                       )
                                                  })}
                                             </TableCell>
                                             <TableCell>{item.createdAt}</TableCell>
                                             <TableCell>{item.updatedAt}</TableCell>
                                             <TableCell>
                                                  <IconButton aria-label="edit">
                                                       <EditRounded />
                                                  </IconButton>
                                                  <IconButton aria-label="delete" onClick={() => handleDeleteExperience(item.experiencesId)}>
                                                       <DeleteRounded />
                                                  </IconButton>
                                                  <IconButton aria-label='link'>
                                                       <OpenInNewRounded />
                                                  </IconButton>
                                             </TableCell>
                                        </TableRow>
                                   )
                              })}
                         </TableBody>
                    </Table>
               </TableContainer>
          </Container >
     )
}

export default ListExperience