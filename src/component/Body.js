import React, { useState ,useEffect} from 'react'
import './Body.css'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import Comorb from './Comorb'
import Allergies from './Allergies'
import Header from './Header'

function Body() {
const[formvalues, setFormvalues]=useState({firstname:"",lastname:"",dob:"", gender:"",pincode:"", contactno:"",bloodgroup:"",allergies:"",comorb:''})
const[allergies,setAllergies]=useState('')
const[comorb,setComorb]=useState('')
const[formerror, setFormError]=useState({})
const[issubmit,setIssubmit]=useState(false)

const handelchange=(e)=>{
    const {name,value}=e.target
    setFormvalues({...formvalues,[name]:value})
}
const  handlecomorb  =  val  => {
    setComorb(val)
    setFormvalues({...formvalues,comorb:comorb})
}
const  handleallergy  =  val  => {
    setAllergies(val)
    setFormvalues({...formvalues,allergies:allergies})
}
const handelsubmit=(e)=>{
    e.preventDefault();
    setFormError(validate(formvalues))
    setIssubmit(true)
}
useEffect(()=>{
    if(Object.keys(formerror).length===0 && issubmit){
        console.log(formvalues)
    }
},[formerror])

const validate=(values)=>{
    const error={}
    if(!values.firstname){
        error.firstname="First Name Required!"
    }
    if(!values.lastname){
        error.lastname="Last Name Required!"
    }
    if(!values.dob){
        error.dob="D.O.B Required!"
    }
    if(!values.gender){
        error.gender="Gender Required!"
    }
    if(!values.pincode){
        error.pincode="PIN Required!"
    }else if(values.pincode.length!==6){
        error.pincode=" 6 digit PIN Required!"
    }

    if(!values.contactno){
        error.contactno="Contact number Required!"
    }else if(values.contactno.length!==10){
        error.contactno=" 10 digit Phone Required!"
    }

    if(!values.bloodgroup){
        error.bloodgroup="Blood Group Required!"
    }
    return error
}

  return (
      <>
    <Header/>
    <div className='maincontainer'>
        <div className='formmaincontainer'>
            <h1>Create Profile</h1>
            <form onSubmit={handelsubmit} className='formcontainer'>
                <label className='label'>First Name</label>
                <input 
                type='text' 
                name='firstname'
                placeholder='First Name'
                value={formvalues.firstname}
                onChange={handelchange}
                /> 
                <p>{formerror.firstname}</p>

                <label className='label'>Last Name</label>
                <input 
                type='text' 
                name='lastname'
                placeholder='Last Name'
                value={formvalues.lastname}
                onChange={handelchange}
                />
                <p>{formerror.lastname}</p>

                <label className='label'>D.O.B</label>
                <input 
                type='date' 
                name='dob'
                value={formvalues.dob}
                onChange={handelchange}
                />
                <p>{formerror.dob}</p>

                <label className='label'>Gender</label>
                <select name="gender" onChange={handelchange}>
                    <option >select your gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                </select>
                <p>{formerror.gender}</p>

                <label className='label'>PIN Code</label>
                <input 
                type='number' 
                name='pincode'
                placeholder='PIN Code'
                value={formvalues.pincode}
                onChange={handelchange}
                />
                <p>{formerror.pincode}</p>

                <label className='label'>Emergency Contact Number</label>
                <input 
                type='number'
                name='contactno'
                placeholder='Contact Number'
                value={formvalues.contactno}
                onChange={handelchange}
                />
                <p>{formerror.contactno}</p>

                <label className='label'>Blood Group</label>
                <select className='select' name='bloodgroup' onChange={handelchange}>
                    <option >Blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <p>{formerror.bloodgroup}</p>

                <label className='label'>Allergies</label>
                <div className="multiple list">
                <MultiSelect
                  name="allergies"
                  onChange={handleallergy}
                  options={Allergies}
                />
                </div>

                <label className='label'>comorbidities</label>
                <div className="multiple list">
                <MultiSelect
                  name="comorb"
                  onChange={handlecomorb}
                  options={Comorb}
                />
                </div>
                <input id='submit' type='submit' value='Submit'/>
            </form>

        </div>

        <div className='datacontainer'>
        {
                Object.keys(formerror).length===0 && issubmit ? (
                    <div id='success'><h3>Profile Created Successfully</h3></div>
                    
                ):(
                    <></>
                )
            }


        </div>

    </div>
    </>
  )
}

export default Body