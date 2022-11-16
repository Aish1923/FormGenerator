import React, { useState, createContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Config from './Config';
import Result from './Result';
import '../styles/index.css';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className: string;
}
export interface Item{
  type?:string,
  label:string,
  data?:Array<string>,
  id:string,
  value?:any,
  defaultValue?:boolean
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}


export type TabContextContent = {
  activeTab: number
  setActiveTab: (c: number) => void
  configValue: string,
  setConfigValue: (c: string) => void,
  setFormDetails: (c: string) => void,
  formDetails: string
}

export const TabContext = createContext<TabContextContent>({
  activeTab: 0,
  setActiveTab: () => { },
  configValue: '',
  setConfigValue: () => { },
  setFormDetails: () => { },
  formDetails: ''
});

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [configValue, setConfigValue] = useState<string>('');
  const [formDetails, setFormDetails] = useState<string>('');

  /*function to be called on Tab clicks to handle changes in Tab*/
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, configValue, setConfigValue, setFormDetails, formDetails }}>
      <Box>
        <Tabs sx={{
          '& button': {
            backgroundColor: "#ddd;",
            borderRadius: "9px 9px 0 0",
            border: "1px solid #acadb0",
            color:"black",
            height:'5px'
          },
          '& button.Mui-selected': {
            backgroundColor: "#acadb0",
            color:"black"
          }
        }} className="tabsContainer" value={activeTab} onChange={handleChange}>
          <Tab label="Config" />
          <Tab label="Result" />
        </Tabs>
      </Box>
      <TabPanel className="tabContent" value={activeTab} index={0}>
        <Config />
      </TabPanel>
      <TabPanel className="tabContent" value={activeTab} index={1}>
        <Result />
      </TabPanel>
    </TabContext.Provider>
  );
}
