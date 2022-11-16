import React,{ useContext } from 'react';
import { TabContext } from "./TabComponent";
import Grid from '@mui/material/Grid';
import FormComponents from './FormComponents';
import '../styles/index.css';

function Result() {
  const { configValue } = useContext(TabContext);

  /* redux way to get value 
     const { configData } = useSelector((state: any) => state);
  */

  return (
    <>
      {configValue.length>0 && JSON.parse(configValue)?.items && JSON.parse(configValue)?.items.length > 0 ?
        <>
          <h2 className='heading'>{(JSON.parse(configValue))?.title}</h2>
          <Grid container spacing={1}>
            <FormComponents />
          </Grid>
        </>
        : <div>Please enter a JSON in the correct format and the correct keys to get the result.</div>
      }

    </>
  )
}

export default React.memo(Result);