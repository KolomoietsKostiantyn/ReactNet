import { useParams } from "react-router-dom"
import { useProfile } from "../features/hooks/useProfile"
import { IconButton, ImageList, ImageListItem } from "@mui/material";
import type { Photo } from "../lib/types";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone'
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from "@mui/icons-material/Delete";
import Login from "../features/hooks/login";

export default function PhotosConponent() {
    const { id } = useParams();
    const { userInfoHook } = Login();
    const { userPhotos, publishImage, setMain, deletePhoto } = useProfile(id);
    const data = userPhotos?.data as Photo[];    
    const [imageForCrop, setImageForCrop] = useState<string>("");
    const [loadMod, switchLoadMod] = useState<boolean>(false);

    const onDrop = useCallback(acceptedFiles => {

        setImageForCrop(URL.createObjectURL(acceptedFiles[0]))
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const cropperRef = useRef<ReactCropperElement>(null);
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    };
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    function PuslishClop() {
        const cropper = cropperRef.current?.cropper;
        cropper.getCroppedCanvas().toBlob(blob => publishImage.mutate(blob as Blob));

    }


    function onDelete(id: string) {
        deletePhoto.mutate(id);
    }

    function onSetMain(id: string) {
        setMain.mutate(id);
    }


    return (<>

        {id == userInfoHook.data?.id && (loadMod ? <button onClick={()=> switchLoadMod(!loadMod)}>on Loadmod</button>: <button onClick={()=> switchLoadMod(!loadMod)}>of Loadmod</button>)}
        {loadMod && 
        <div style={{ display: "flex" }}>
            <div {...getRootProps()} style={{
                width: "200px", height: "200px", alignContent: "center", border: "5px solid", borderImage: "linear-gradient(90deg, red, blue) 1",
                padding: "20px"
            }}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>

            <div style={{
                width: "400px", height: "400px", border: "5px solid"

            }}>

                {imageForCrop.length > 0 &&
                    <Cropper
                        src={imageForCrop}
                        style={{ height: "100%", width: "100%" }}
                        // Cropper.js options
                        initialAspectRatio={16 / 9}
                        guides={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />
                }

            </div>
            <div style={{
                width: "400px", height: "400px", border: "5px solid"
            }}>
                {croppedImage && <img src={croppedImage} alt="Cropped" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}

            </div>

            <button onClick={PuslishClop}> Publish Crop</button>

        </div>
}


{!loadMod && 
        <ImageList sx={{ width: "100%", height: "100%", position: "relative" }} cols={4} rowHeight={164}>
            {data?.map((item) => (
                <ImageListItem key={item.id}>
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        alt="test"
                        loading="lazy"
                    />

                    {item.userId == userInfoHook.data?.id &&
                        <div
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                display: "flex",
                                gap: "5px",
                            }}
                        >

                            <IconButton
                                disabled={item.isMain}
                                sx={{ color: item.isMain ? "grey" : "yellow", bgcolor: "rgba(0,0,0,0.5)" }}
                                aria-label="Сделать главным"
                                onClick={() => onSetMain(item.id)}
                            >
                                <StarIcon />
                            </IconButton>
                            <IconButton
                                disabled={item.isMain}
                                sx={{ color: item.isMain ? "grey" : "yellow", bgcolor: "rgba(0,0,0,0.5)" }}
                                aria-label="Удалить"
                                onClick={() => onDelete(item.id)}                        >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    }



                </ImageListItem>
            ))}
        </ImageList>
}
    </>)
}

