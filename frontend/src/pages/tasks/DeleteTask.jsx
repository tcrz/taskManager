import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import LoadingButton from '../../components/LoadingButton'
import useApiRequests from '../../hooks/useApiRequests'

const DeleteTask = ({task, setCurrentTask, refetch, open, setOpen}) => {
    const [loading, setLoading] = useState(false)
    const { httpAuthDeleteAsync } = useApiRequests()
    const [alert, setAlert] = useState(null)

const handleDeleteTask = async () => {
    try {
        setLoading(true)
        setAlert(null)
        const response = await httpAuthDeleteAsync(`/tasks/${task._id}`)
        console.log(response)
        setCurrentTask(null)
        refetch()
        setOpen(false)
    } catch(err) {
        if (err.response){
        setAlert({type: "failure", message: err.response.data.message})
        } else {
            setAlert({type: "failure", message: "Sorry, an error occurred"})
        }
        console.log(err)
    }
    setLoading(false)
}
  return (
    <>
    <Modal
        show={open}
        size="md"
        popup={true}
        onClose={()=>setOpen(false)}
    >
    <Modal.Header />
    <Modal.Body>
    <div className="text-center">
        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this task?
        </h3>
        <div className="flex justify-center gap-4">
        <LoadingButton
        onClick={()=>handleDeleteTask()} 
        disabled={loading} 
        loading={loading} 
        className="block text-sm text-white bg-red-500 border p-2 px-4 rounded-md hover:bg-red-600 duration-150" text="Yes, Delete" 
        />
        <Button
            color="gray"
            onClick={()=>setOpen(false)}
        >
            No, cancel
        </Button>
        </div>
    </div>
    </Modal.Body>
    </Modal>
    </>
  )
}

export default DeleteTask