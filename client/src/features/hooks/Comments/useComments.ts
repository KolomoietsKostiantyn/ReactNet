import { useLocalObservable } from "mobx-react-lite";
import type { CommentData } from "../../../lib/types"
import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";
import { runInAction } from "mobx";



export const useComments = (activityId: string) => {
    const commentStore = useLocalObservable(() => ({
        comments: [] as CommentData[],
        connection: null as signalR.HubConnection | null,
        startConnection: function (activityId: string) {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_API_URL}/comments?id1=${activityId}`, { withCredentials: true }).withAutomaticReconnect().build();

            this.connection.on("LoadComments", (data: CommentData[]) => {
                runInAction(() => {
                    console.log(data);
                    this.comments = data;
                });

            })

            this.connection.on("NewComment", data => {
                runInAction(() => {
                    console.log(data);
                    this.comments.unshift(data);
                });
            });

            this.connection.start();
        },
        stopConnection: async function () {
            await this.connection?.stop()
        }
    }))

    useEffect(() => {
        commentStore.startConnection(activityId);

        return () => {
            commentStore.stopConnection();
            commentStore.comments = []
        }
    }, [activityId, commentStore])

    return { commentStore }
}
