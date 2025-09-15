import UserMenu from "../../features/activities/login/UserMenu";
import RouteElemen from "./RouteElemen";


export default function NavBar()
{


        
    return (
            <>
                <header className="appbar">
                    <div className="toolbar">

        <RouteElemen to="/" >Home</RouteElemen>
        <RouteElemen to="/activities" >Activities</RouteElemen>
        <RouteElemen to="/counter" >Counter</RouteElemen>
        <RouteElemen to="/errors" >Errors</RouteElemen>
        <RouteElemen to="/activityFormHook" >Create Activity</RouteElemen>

                   <UserMenu/>
            
                        </div>

                </header>
            
            
            
            </>

    )

}