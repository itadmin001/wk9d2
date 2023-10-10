import * as _React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Box,Button,Alert,Snackbar,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import { ShopState } from '../../hooks'
import { AlertMessageType } from '../Auth'
import { SubmitState } from '../Shop'
import { ApiCalls } from '../../api'
import { InputText } from '../SharedComponents/Inputs'
import { useGetOrder } from '../../hooks'

interface UpdateState {
    id: string,
    orderData: ShopState[]
}

const columns: GridColDef[] = [
    { field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
          <img
              src={params.row.image}
              alt={params.row.name}
              style={{maxHeight: '100%', aspectRatio: '1/1'}}
          />
      )
      },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      editable: true,
    },
    {
      field: 'prod_id',
      headerName: 'Product ID',
      width: 150,
      editable: true,
    },
    {
      field: 'id',
      headerName: 'Order ID',
      width: 150,
      editable: true,
    },
   
  ];

const UpdateQuantity = (props: UpdateState) => {
    const { register, handleSubmit } = useForm<SubmitState>({})
    const [ openAlert, setAlertOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()

    useEffect(()=> {
        if (props.id === 'undefined'){
            setMessage('No Order Selected');
            setMessageType('error');
            setAlertOpen(true);
        }

    }, [])

    const onSubmit: SubmitHandler<SubmitState> = async (data, e) => {
        if (e) e.preventDefault()

        let order_id = ""
        let prod_id = ""

        for (let order of props.orderData){
            if (order.id === props.id){
                order_id = order.order_id as string
                prod_id = order.prod_id as string
            }
        }

        const updateData = {
            'prod_id' : prod_id,
            'quantity' : parseInt(data.quantity) as number
        }

        const response = await ApiCalls.updateOrder(order_id, updateData)
        if (response.status === 200){
            setMessage('Order Updated')
            setMessageType('success')
            setAlertOpen(true)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setAlertOpen(true)
        }

    }

    return(
        <Box sx={{padding: '20px'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor="quantity">Update item quantity</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='Enter Count' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar open={openAlert} onClose={()=> setAlertOpen(false)}>
                <Alert severity = {messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}

export const Order = () => {
    const { orderData } = useGetOrder();
    const [ open, setOpen ] = useState(false);
    const [ gridData, setGridData ] = useState<GridRowSelectionModel>([])
    const [ openAlert, setAlertOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()

    const deleteItem = async () => {
        const id = `${gridData[0]}`

        let order_id = ""
        let prod_id = ""

        if (id === 'undefined'){
            setMessage('No Order Selected');
            setMessageType('error');
            setAlertOpen(true);
            setTimeout(()=>{window.location.reload()}, 3000)
        }
    
        for (let order of orderData){ 
            if (order.id === id){
                order_id = order.order_id as string
                prod_id = order.prod_id as string
            }
        }

        const deleteData = {
            'prod_id': prod_id
        }

        const response = await ApiCalls.deleteOrder(order_id, deleteData)
        console.log(response)

        if (response.status === 200){
            setMessage('Item Deleted')
            setMessageType('success')
            setAlertOpen(true)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setAlertOpen(true)
        }
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={orderData}
            columns={columns}
            sx={{padding:'20px'}}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 5,
                },
            },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            getRowId = {(row) => row.id}
            onRowSelectionModelChange = {(newSelectionModel) => setGridData(newSelectionModel)}/>
        <Button variant='contained' color='info' onClick={()=>{setOpen(true)}}>Update</Button>
        <Button variant='contained' color='warning' onClick={deleteItem}>Delete</Button>
        <Dialog open={open} onClose={()=>{setOpen(false)}} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Update An Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>Order id: {gridData[0]}</DialogContentText>
                </DialogContent>
                <UpdateQuantity id={`${gridData[0]}`} orderData = {orderData} />
                <DialogActions>
                    <Button onClick={()=>{setOpen(false)}} color='error'>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={()=> setAlertOpen(false)}>
                <Alert severity = {messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    );
}