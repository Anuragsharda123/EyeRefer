import {Formik, Form, Field, ErrorMessage} from 'formik'
import {  useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';

const AddPatient:React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const [MDList, setMDList] = useState<any>([]);

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login');
      }
    if(localStorage.getItem("doctype") == '1'){
      navigate('/dashboard');
    }
  },[]);

  const fetchmds = async () => {
    try {
      const response = await api.get(`${Local.GET_DOC_LIST}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Data---->", response.data);
      // setMDList(response.data.mdList);
      return response.data;
    }
    catch(err:any){
      toast.error(err.response.data.message);
    }
  }


  const {data: MDList, isLoading, isError, error} = useQuery({
    queryKey: ["MDList"],
    queryFn: fetchmds,
  })

  console.log("Check---->", MDList);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    disease: Yup.string().required("Disease is required"),
    referedto: Yup.string().required("Select Doctor"),
    address: Yup.string().required("Address is required")
  })

  const referPatientHandler = () => {
    console.log("Hello");
  }

  if(isLoading){
    return (
      <>
          <div>Loading...</div>
          <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </>
      )
  }

  if(isError){
    return(
      <div>Error: {error.message}</div>
      )
  }

  return (
      <div>
        <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          disease: '',
          referedto: '',
          address: '',
          }}
          validationSchema={validationSchema}
          onSubmit={referPatientHandler}
        >
          {/* {({values, setFieldValue}) => (  */}
          {({values}) => (
            <Form>
              <div className="form-group">
                <label>First Name:</label>
                <Field type="text" name="firstname" placeholder="Enter First Name" className='form-control' />
                <ErrorMessage name="firstname" component="div" className="text-danger"/>
              </div>
              <br />
              
              <div className="form-group">
                <label>Last Name:</label>
                <Field type="text" name="lastname" placeholder="Enter last Name" className='form-control' />
                <ErrorMessage name="lastname" component="div" className="text-danger"/>
              </div>
              <br />

              <div className="form-group">
                <label>Disease:</label>
                <Field as='select' name='disease' className='form-select' >
                  <option value="" selected disabled>Choose Disease</option>
                  <option value="Disease 1" >Disease 1</option>
                  <option value="Disease 2" >Disease 2</option>
                  <option value="Disease 3" >Disease 3</option>
                  <option value="Disease 4" >Disease 4</option>
                  <option value="Disease 5" >Disease 5</option>
                </Field>
                <ErrorMessage name="disease" component="div" className="text-danger"/>
              </div>
              <br />
              
              <div className="form-group">
                <label>Doctor:</label>
                <Field as='select' name='referedto' className='form-select' >
                  <option value="" selected disabled>Choose Doctor</option>
                  {MDList.mdList.map((md:any)=>(
                    <>
                    <option value={`${md.uuid}`} key={md.uuid}>{md.firstname} {md.lastname} </option>
                    </>
                  ))}
                </Field>
                <ErrorMessage name="referedto" component="div" className="text-danger"/>
              </div>
              <br />
              
              <div className='form-group'>
                  <label>Address:</label>
                <Field as='select' name='address' className='form-select'>
                  <option value="" selected disabled>Choose Address</option>
                  { values.referedto && MDList.mdList.find((md:any) => md?.uuid === values.referedto).Addresses.map((address:any)=>(
                    <option value={`${address.uuid}`} key={address.uuid}>{address.street} {address.district} {address.city} {address.state}</option>
                  ))}
                </Field>
                <ErrorMessage name="address" component="div" className="text-danger"/>
              </div>
              <br />

              <button type='submit' className='btn btn-outline-primary' >Add Referral</button>

            </Form>
          )}
        </Formik>
      </div>
  )
}

export default AddPatient;