import { Label } from '@radix-ui/react-label';
import { Pencil } from '@phosphor-icons/react';
import { Button, Input } from '@reactive-resume/ui';
import { Card } from '@reactive-resume/ui';
import React, { useEffect, useState } from 'react';
import { t } from "@lingui/macro";
import { axios } from '@/client/libs/axios';
import OrganisationUsers from './OrganisationUsers';
import OrganisationDetails from './OrganisationDetails';

const CompanySetting: React.FC<{activeSection: string, setIsEditing: (isEditing: boolean) => void, isEditing: boolean, is_add_on_user: string | null}> = ({activeSection, setIsEditing, isEditing, is_add_on_user  }) => {
  // State for form fields
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('https://www.google.com');
  const [organizationId, setOrganizationId] = useState('1234567890');
  const [employees, setEmployees] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || '{"isPlanReached":[],"count":0}');
  // State for errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showModal, setShowModal] = useState({
    organisationDetails: true,
    organisationUsers: false,
    organisationDetailsEdit: false,
    createAddOnUser: false,
    addOnUser: false
  });
  const [countries,setCountries] = useState([]);  
  useEffect(()=>{
    axios.get(`/company/countries/`).then((res)=>{
      console.log(res);
      setCountries(res.data);
    })
  },[])

  useEffect(()=>{
    if(is_add_on_user){
      setShowModal({...showModal, organisationDetails: false, organisationDetailsEdit: false, organisationUsers: true, addOnUser: false, createAddOnUser: true})
      // setShowModal({...showModal, addOnUser: true,createAddOnUser: false})
      localStorage.removeItem("is_add_on_user")
    }
  },[is_add_on_user])

  console.log(countries,"countries");

  useEffect(()=>{
    axios.get(`/company/company-details/`).then((res)=>{
      console.log(res);
      setCompanyName(res.data.data[0].company_name);
      setCountry(res.data.data[0].country);
      setCompanyAddress(res.data.data[0].company_address);
      setCompanyWebsite(res.data.data[0].company_website);
      setOrganizationId(res.data.data[0].organisation_id);

    })
    axios.get(`/company/organization-employees/`).then((res)=>{
      console.log(res);
      setEmployees(res.data.data || []);
    })
  },[])

  console.log(employees,"employees");

  // Validation function
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (companyName && !companyName.trim()) newErrors.companyName = 'Company Name is required.';
    if (companyAddress && !companyAddress.trim()) newErrors.companyAddress = 'Company Address is required.';
  if (companyWebsite && !companyWebsite.trim()) {
      newErrors.companyWebsite = 'Company Website is required.';
    } else {
      try {
        new URL(companyWebsite);
      } catch {
        newErrors.companyWebsite = 'Invalid URL.';
      }
    }
    if (organizationId && !organizationId.trim()) newErrors.organizationId = 'Organization Id is required.';
    return newErrors;
  };

  // Save handler
  const handleSave = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
     
      let payload = {
        "company_name":companyName,
        "company_address":companyAddress,
        "company_website":companyWebsite,
        "organisation_id":organizationId,
        "country":country
    }
      axios.post('/company/company-details/', payload).then((res) => {
        console.log(res);
        setIsEditing(false);
        setShowModal({...showModal, organisationDetails: false, organisationDetailsEdit: false, organisationUsers: true, addOnUser: false, createAddOnUser: false})
      }).catch((err) => {
        console.log(err);
      })
    //   setIsEditing(false);
      // Optionally show a success message
    }
  };

  return (
    <div className={`md:col-span-3 ${activeSection !== 'company' && 'hidden'}`}>
            {/* Profile Card */}
         

            <Card className="p-6 items-start">
              <button onClick={() => setShowModal({...showModal, organisationDetails: true, organisationDetailsEdit: false, organisationUsers: false})}>
                Back
              </button>
             { showModal.organisationDetails && <OrganisationDetails setShowModal={setShowModal} showModal={showModal} employees={employees} />}
            {showModal.organisationDetailsEdit &&  <div className="space-y-6 w-full">
                <div className="flex sm:flex-row flex-col gap-3 items-center justify-between">
                  <h2 className="text-xl font-semibold text-primary">Organization Details</h2>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleSave}
                  >
                    <Pencil size={16} />
                    Save Changes
                  </Button>
                </div>

                {/* <Separator /> */}

                <div className="grid gap-6">
                  <div className="space-y-2">
                      <Label>Company Name</Label>
                    <Input 
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                    {errors.companyName && <div className="text-red-500 text-xs">{errors.companyName}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Company Address</Label>
                    <Input
                      type="text"
                      value={companyAddress}
                      onChange={e => setCompanyAddress(e.target.value)}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                    {errors.companyAddress && <div className="text-red-500 text-xs">{errors.companyAddress}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Country Name</Label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`w-full px-3 py-2 rounded-md border ${!isEditing ? "bg-muted" : ""}`}
                    >
                      <option value="">Select a country</option>
                      {countries.map((country:any,index:number) => (
                        <option key={index} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.companyAddress && <div className="text-red-500 text-xs">{errors.companyAddress}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Company Website</Label>
                    <Input
                      type="text"
                      value={companyWebsite}
                      onChange={e => setCompanyWebsite(e.target.value)}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                    {errors.companyWebsite && <div className="text-red-500 text-xs">{errors.companyWebsite}</div>}
                  </div>

                  <div className="space-y-2">
                    <Label>Organization Id</Label>
                    <Input
                      type="text"
                      value={organizationId}
                      onChange={e => setOrganizationId(e.target.value)}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                    {errors.organizationId && <div className="text-red-500 text-xs">{errors.organizationId}</div>}
                  </div>
                </div>
              </div>}
            {showModal.organisationUsers && <div className='w-full'>
               <OrganisationUsers showModal={showModal} setShowModal={setShowModal} employees={employees} />
              </div>}
            </Card>
          </div>
  );
};

export default CompanySetting;


