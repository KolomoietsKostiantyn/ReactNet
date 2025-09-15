import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PhotosConponent from "./PhotosConponent";
import About from "./About";
import UserEvents from "./UserEvents";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

export default function ProfileBottom()
{
    const [value, setValue] = useState(0);

      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };}

    const itens =[
        {title: "About", content: <About/>},
        {title: "Photos", content: <PhotosConponent />},
        {title: "Event", content: <UserEvents/>},
        {title: "Followers", content: <div>Followers</div>},
        {title: "Fillowing", content: <div>Fillowing</div>},


    ];

    return(<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            {itens.map((x, index) => <Tab key={index} label={x.title} {...a11yProps(index)}/>)}
        </Tabs>       
             {itens.map((x, index) => <TabPanel key={index}  value={value} children={x.content} index={index}/>)}



    </Box>)
}