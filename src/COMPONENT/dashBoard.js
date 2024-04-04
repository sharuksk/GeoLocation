import React, { useEffect, useState } from "react";
import { Box, ThemeProvider } from '@mui/material';
import DropFileInput from './components/drop-file-input/DropFileInput';
import UploadButton from './components/upload-button/UploadButton';
//import '../SCSS/dashBoard.scss'
import './dashBoard.css'
import {linkNode} from "../nodelink";
import axios from "axios";
import FileBase64 from "react-file-base64";

export default function DashBoard () {
  const [base, setBase] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [state, setState] = useState(false);
  const [video, setVideo] = useState("");

  useEffect(() =>{
    //handleGetVideo();
    console.log(state);
  }, [state]);


    const handleGetVideo = async() => {
        await axios.post(`${linkNode}/getvideo`).then(async (res) => {
            console.log(res.data.message);
        });
    }
    const handleClick = async() => {
        try {

            let Obj = {
                fileName: docTitle,
                file64: base.toString(),
            };

            await axios.post(`${linkNode}/postvideo`, Obj).then(async (res) => {
                console.log(res.data.message);
            });
            
        } catch (err) {
          console.log(err);
        }
      };

    
  return (
    <>
        <table>
            <tr>
                <td>
                    <div className="box">
                        <h2 className="header">
                            React drop files input
                        </h2>
                        {/* <DropFileInput
                            onFileChange={(e) => {
                                setBase(e.base64)
                                setDocTitle(e.name)
                                }}
                        />
                        <br></br> */}
                        <FileBase64
                            onDone={(e) => {
                              setDocTitle(e.name);
                              setBase(e.base64);
                            }}/>
                            <br></br>
                        <UploadButton onClick={(e) => handleClick()}/>
                    </div>
                </td>
                <td>
                    <div className="box1">
                    <video className="video" width="750" height="500" controls>
                        <source src ={video} />
                        {/* <source src="https://firebasestorage.googleapis.com/v0/b/geolocation-53bce.appspot.com/o/videos%2FWhatsApp%20Video%202024-03-25%20at%205.24.15%20PM.mp4?alt=media&token=7622d6ca-97e9-4d24-9399-4ef5f6313b7c" /> */}
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
