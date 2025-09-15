import  z from "zod"

export type Activity = {
    id: string
    title: string
    date: string
    description: string
    category: string
    isCancelled: boolean
    city: string
    venue: string
    latitude: number
    longitude: number
    attendees: UserCard[] 
}

export type ActivityCursor = {
    dateTime: string,
    id: string   
}

export type getActivityParam = {
    activityCursor?: ActivityCursor,
    pageSize?: number;
}

export type ActivityInfinite = {
    items: Activity[],
    nextCursors: ActivityCursor
}

export type UserCard ={
    displayName: string
    bio: string
    imageUrl: string
    id: string
    ishost: boolean
}

export type UserInfo ={
    displayName: string
    bio: string
    imageUrl: string
    id: string
}
export type User = {
  displayName: string;
  userName: string;
  email: string;
  id: string;
};
export type Photo ={
    id: string,
    url: string,
    userId: string
    isMain: boolean
}

export const loginShema = z.object({
    email: z.string().email(),
    password: z.string()
});

export type CommentData = {
    slice(): CommentData[]
    id:string,
    body:string,
    dateTime: Date,
    userId:string,
    activityId: string
}

export type LoginShema = z.infer<typeof loginShema>

export type  ActivityWithFlags = Activity & {
    isHost: boolean;
    isGoing: boolean;
    hostImage?: string;
}