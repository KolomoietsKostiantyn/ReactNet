import { observer } from "mobx-react-lite";
import { useComments } from "../../hooks/Comments/useComments";
import { useState } from "react";
import Login from "../../hooks/login";

type Props = {
      activityId: string;
};

export const ChatComponent = observer(({activityId}: Props) => {
    const {commentStore} = useComments(activityId)
    const [text, setText] =useState<string>("");
    const user = Login();

    const onSubmit = async (e: React.FocusEvent) => {
        e.preventDefault();
        await commentStore.connection?.invoke("SendComment", {Body: text, ActivityId: activityId, UserId: user.userInfoHook.data?.id })
         
    }

    return(<>
        {commentStore.comments.map(x => 
            <div>{x.body}</div>
        )}
        <form onSubmit={onSubmit}>
            <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
            <button type="submit" >submit </button>            
        </form>
    </>)
})