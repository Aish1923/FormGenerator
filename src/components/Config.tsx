import React, { useState, useContext } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { TabContext } from "./TabComponent";

function Config() {
    const { configValue, setActiveTab, setConfigValue ,setFormDetails} = useContext(TabContext);
    const [ config, setconfig ] = useState<string>(configValue);

    /*
    using Redux to store config value 
    const { configData } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    */

    /* function to check valid JSON in config textarea */
    function isJson(str: string) {
        try {
            JSON.parse(str);
            return true
        } catch {
            return false;
        }
    }

    /* function to apply JSON data entered as config to craete a form and naviagte to the RESULT tab*/
    const applyChanges = () => {
        if (isJson(config)) {
            setConfigValue(config);
            setFormDetails(config);
            setconfig(config);
            setActiveTab(1);
        }
        else {
            alert('Please enter a JSON in the correct format and the correct keys to get the result.')
        }
    }

    /* function to clear the current config and form created from the config */
    const clear = () => {
        setconfig('');
        setConfigValue('');
    }

    /* function to set config on textarea changes */
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setconfig(event.target.value);
    };
    return (
        <>

            <TextareaAutosize
                minRows={30}
                maxRows={30}
                placeholder='Please enter a valid JSON with the keys same as shown in the example below:
                {
                    "items": [{"label": "Count","type": "number","id:"ID1" }.....],
                    "title": "Dummy Data",
                    "actionButtons": [{"label": "Save","id:"ID1" }, {"label": "Close","id:"ID2"}....]
                }
                Make sure to have unique ids for each element in items list!
                '
                value={config}
                style={{ maxWidth: 700 ,width:700}}
                onChange={handleChange}
            />
            <div className='buttonGroup'>
                <Button variant="contained" onClick={() => applyChanges()}>Apply</Button>
                <Button variant="contained" onClick={() => clear()}>Clear</Button>
            </div>
        </>
    )
}

export default Config;