import React, { useContext, useEffect, useState,  } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { TabContext } from "./TabComponent";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ModalComponent from './ModalComponent';
import '../styles/index.css';
import { Item } from './TabComponent';

function FormComponents() {
    const {formDetails, setFormDetails } = useContext(TabContext);
    const [formValues, setformValues] = useState({}) as any;
    const [openModal, setOpenModal] = useState(false);
    const closeModal = (modalState: boolean) => {
        setOpenModal(modalState)
    }

    /* useEffect to set the initial response value before the initial render */
    useEffect(() => {
        /* 
           logic included to add initial checkbox value to defaultValue specified in the JSON
        */
        const newformValues = { ...JSON.parse(formDetails) };
        newformValues?.items.forEach((eachItem: Item) => {

            if (eachItem.type === 'boolean') {
                eachItem['value'] = eachItem.defaultValue;
            }
        })
        setformValues(newformValues);
    }, [])

    /* function to handle changes from each element on the form */
    const handleformChanges = (elementid: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newformValues = { ...formValues };
        newformValues?.items.forEach((item: Item) => {
            const { type, id } = item;
            if (elementid === id) {

                switch (type) {
                    case 'boolean':
                        let target = event.target as HTMLInputElement;
                        item['value'] = target.checked;
                        break;
                    case 'number':
                    case 'string':
                    case 'multi-line':
                    case 'enum':
                    case 'date':
                        item['value'] = event.target.value;
                        break;
                    default:
                        item['value'] = event.target.value;
                        break;
                }
            }
            setformValues(newformValues);
            setFormDetails(JSON.stringify(newformValues));
        });
    }


    /* render form elements depending on the type key mentioned in input JSON */
    const renderElementBasedonType = (Eachitem: Item) => {
        switch (Eachitem.type) {
            case 'number':
            case 'string':
            case 'date':
                return (<TextField
                    type={Eachitem.type}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    id={Eachitem.id}
                    value={Eachitem.value}
                    onChange={(e) => handleformChanges(Eachitem?.id, e)}
                    className="textfield"
                />)
            case 'multi-line':
                return (<TextField
                    id={Eachitem.id}
                    multiline
                    minRows={4}
                    value={Eachitem.value}
                    className="textfield"
                    onChange={(e) => handleformChanges(Eachitem?.id, e)}
                />)
            case 'boolean':
                return (<Checkbox sx={{ "paddingLeft": "0" }} defaultChecked={Eachitem?.defaultValue} value={Eachitem?.value} id={Eachitem?.id} onChange={(e) => handleformChanges(Eachitem?.id, e)} />)
            case 'enum':
                return (
                    <RadioGroup
                        value={Eachitem.value ?? ''}
                        id={Eachitem.id}
                        onChange={(e) => handleformChanges(Eachitem.id, e)}
                        sx={{ "display": "flex", "flexDirection": "row" }}
                    >
                        {Eachitem?.data && Eachitem.data.map((eachItem: String, ind: number) => {
                            return <div key={ind} >
                                <FormControlLabel value={eachItem} control={<Radio />} label={eachItem} />
                            </div>
                        })}
                    </RadioGroup>)

            default:
                return null;
        }
    }

    /* Function to handle different button clicks baed on id ogf the button */
    const handleButtonClicks = (id: string) => {
        switch (id) {
            case 'save':
                /* 
                   for now only printing the form values by appending 'value' key to the entered config JSON,
                   changes to be done according the requirement like saving values to the database or sending 
                   it to an API as a request 
                */

                console.log('Final Result with values', formValues);
                setOpenModal(true)
                break;
            case 'close':
                /* logic to be handled on close to be included as per the requirement */
                break;
            default:
                return
        }
    }

    return <>
        {formValues?.items && formValues.items.map((Eachitem: Item, index: number) => {
            return <React.Fragment key={Eachitem.id}>
                <Grid key={`Label ${index}`} item={true} xs={3}>
                    <label className='textLabel'>{Eachitem.label}</label>
                </Grid>
                <Grid item={true} xs={9}>
                    {renderElementBasedonType(Eachitem)}
                </Grid>
            </React.Fragment>
        })}
        <div className='buttonGroup'>
            {formValues?.actionButtons && formValues.actionButtons.map((item: Item, index: number) => {
                return <Button key={`Button ${index}`} onClick={() => handleButtonClicks(item.id)} variant="contained">{item.label}</Button>
            })}
        </div>
        {openModal && <ModalComponent openModal={openModal} data={formValues} handleOpen={closeModal}/>}

    </>

}

export default React.memo(FormComponents);
