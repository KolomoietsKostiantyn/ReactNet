import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./delayquery";
import type { Photo, UserInfo } from "../../lib/types";

export function useProfile(id?: string)
{
    const client = api;
    const {data: userdata }= useQuery({
        queryKey: ["User", id],
        queryFn: ()=> client.get<UserInfo>(`profiles?id=${id}`).then(r => r.data),
        enabled: !!id

    });

    const {data: userPhotos} = useQuery({
        queryKey: ["UserPhoto", id],
        queryFn: ()=> client.get<Photo[]>(`profiles/${id}/photos`),
        enabled: !!id
    })

    const publishImage = useMutation({
        mutationFn: async (file: Blob) => {
            const fileData = new FormData();
            fileData.append('file', file);
            return await api.post("profiles/add-photo", fileData, {headers: {'Content-Type': 'multipart/form-data'}});
        }
    })

    const setMain = useMutation({
         mutationFn: (id:string)=> api.post(`profiles/${id}/setMain`)
    })


    const deletePhoto = useMutation({
         mutationFn: (id:string)=> api.post(`profiles/${id}/delete-photo`)

    })


    const editBio = useMutation({
        mutationFn: (bio: string)=> api.put('profiles/edit-bio', bio, {headers:{"Content-Type": "application/json"}} ) 
    })

    return {userdata, userPhotos,publishImage, setMain, deletePhoto, editBio}
}