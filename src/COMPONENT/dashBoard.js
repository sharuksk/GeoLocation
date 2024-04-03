import React from 'react'
import { Box, ThemeProvider } from '@mui/material';
import DropFileInput from './components/drop-file-input/DropFileInput';
import UploadButton from './components/upload-button/UploadButton';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage, db } from './firebase';
import { doc, setDoc } from "firebase/firestore"
//import '../SCSS/dashBoard.scss'
import './dashBoard.css'

export default function DashBoard () {
  const [file, setFile] = useState(null)

    const onFileChange = (files) => {
        const currentFile = files[0]
        setFile(currentFile)
        console.log(files);
    }

    const uploadToDatabase = (url) => {
        let docData = {
            mostRecentUploadURL: url,
            username: "jasondubon"
        }
        const userRef = doc(db, "users", docData.username)
        setDoc(userRef, docData, {merge: true}).then(() => {
            console.log("successfully updated DB")
        }).catch((error) => {
            console.log("errrror")
        })
    }

    const handleClick = () => {
        if (file === null) return;
        const fileRef = ref(storage, `videos/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
            console.log(progress)
        }, (error) => {
            console.log("error :(")
        }, () => {
            console.log("success!!")
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
                uploadToDatabase(downloadURL)
                console.log(downloadURL)
            })
        })
    }
  return (
    <>
        <table>
            <tr>
                <td>
                    <div className="box">
                        <h2 className="header">
                            React drop files input
                        </h2>
                        <DropFileInput
                            onFileChange={(files) => onFileChange(files)}
                        />
                        <br></br>
                        <UploadButton onClick={ () => handleClick()}> </UploadButton>
                    </div>
                </td>
                <td>
                    <div className="box1">
                    <video width="750" height="500" controls>
                        <source src="https://firebasestorage.googleapis.com/v0/b/geolocation-53bce.appspot.com/o/videos%2FWhatsApp%20Video%202024-03-25%20at%205.24.15%20PM.mp4?alt=media&token=7622d6ca-97e9-4d24-9399-4ef5f6313b7c" />
                    </video>
                    </div> 
                </td>
            </tr>
        </table>
        {/* <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
            <br></br>
            <UploadButton onClick={ () => handleClick()}> </UploadButton>
        </div>

        <div className="box1">
            <h2 className="header1">
                React drop files input
            </h2>
        </div> */}
        {/* <ThemeProvider
                theme={{
                    palette: {
                    primary: {
                        main: '#007FFF',
                        dark: '#0066CC',
                    },
                    },
                }}
                ></ThemeProvider>


             <div id="videoAdd">
            <Box id="uploadVideo" 
                sx={{
                width: 800,
                height: 300,
                borderRadius: 10,
                }}
            >
        
            </Box>
            </div> */}
    </>
  )
}
