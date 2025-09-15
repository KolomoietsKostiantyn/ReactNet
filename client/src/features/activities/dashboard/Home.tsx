import { useNavigate } from "react-router-dom"

export default function HomePage()
{
    const navigate = useNavigate();
    return(
        <>
        <div>"Home Page"</div>
        <button onClick={() => navigate("/activities")}>Go to Activity</button>
        </>

    )

}