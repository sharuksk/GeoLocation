import React, { useEffect, useState } from "react";
// import { Box, ThemeProvider } from '@mui/material';
// import DropFileInput from './components/drop-file-input/DropFileInput';
import UploadButton from './components/upload-button/UploadButton';
//import '../SCSS/dashBoard.scss'
import './dashBoard.css'
import {linkNode} from "../nodelink";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import ExportExcel from './excel'

export default function DashBoard () {
  const [base, setBase] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [footerLine, setFooterLine] = useState("Please hold for some time... Detection in Progress...");
  const [docTitle, setDocTitle] = useState("");
  //const [state, setState] = useState(false);
  const [video, setVideo] = useState("");

  const rows = dataRow;
  const columns = [
    {
      field: 'bikes',
      headerName: 'Bikes',
      type: 'number',
      width: 90,
    },
    {
        field: 'buses',
        headerName: 'Buses',
        type: 'number',
        width: 90,
    },
    {
        field: 'cars',
        headerName: 'Cars',
        type: 'number',
        width: 90,
    },
    {
        field: 'trucks',
        headerName: 'Trucks',
        type: 'number',
        width: 90,
    },
  ];


  useEffect(() =>{
    handleGetVideo();
  }, []);
//   useEffect(()=>{
//     setState(false)
//   }, [state])

    const handleGetVideo = async() => {
        await axios.post(`${linkNode}/getvideo`).then(async (res) => {
            
            try{
                
            if(res.data.outputVideo){
                setVideo(res.data.outputVideo);
                let toData = [
                    {id: 1, bikes: res.data.bikes, buses: res.data.buses, cars: res.data.cars, trucks: res.data.trucks}
                ]
                setDataRow(toData);
                setFooterLine("Please hold for some time... Detection in Progress...")
                console.log({footerLine});
            }
            else{
                setVideo(res.data.file64);
                
                setFooterLine("Please hold for some time... Detection in Progress...")
                console.log({footerLine});
            }
            
        }
        catch{
            console.log("video")
        }
        });
        // await axios.post(`${linkNode}/getvideo`).then(async (res) => {
        //     setVideo(res.data.file64);
        //     console.log(res.data.file64);
        // });
    }
    const handleClick = async() => {
        try {

            let Obj = {
                fileName: docTitle,
                file64: base.toString(),
                videoOrientation: value,
            };

            await axios.post(`${linkNode}/postvideo`, Obj).then(async (res) => {
                console.log(res.data.message);
            });
            
        } catch (err) {
          alert("Please Select a File to Upload");
        }
      };
      const [value, setValue] = useState('horizontal');
      const handleChange = (event) => {
      setValue(event.target.value);
      };

      const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
      });
    
  return (
    <>
        <table>
            <tr>
                <td>
                    <div className="box">
                        <h2 className="header">
                            Upload Sample Traffic Video
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
                            <div>
                            <p>Select the Video Orientation</p>
                            <label>
                                
                                <select value={value} onChange={handleChange}>
                                    <option value="horizontal">Horizontal</option>
                                    <option value="vertical">Vertical</option>
                                </select>
                            </label>
                                <h6>Video is in {value}!</h6>
                            </div>
                        <UploadButton onClick={(e) => handleClick()}/>
                    </div>
                </td>
                <td>
                    <div className="box1">
                    <video className="video" width="750" height="500" loop muted autoPlay controls source src={video}>
                    <h1>{footerLine}</h1>
                    </video>
                    </div> 
                </td>
            </tr>
        </table>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                loading={loading} slots={{ toolbar: GridToolbar }}/>
        </div>
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
