import { Label } from '@radix-ui/react-label';
import { Pencil } from '@phosphor-icons/react';
import { Button, Input } from '@reactive-resume/ui';
import { Card } from '@reactive-resume/ui';
import React, { useEffect, useState } from 'react';
import { t } from "@lingui/macro";
import { axios } from '@/client/libs/axios';
import OrganisationUsers from './OrganisationUsers';
import OrganisationDetails from './OrganisationDetails';

const CompanySetting: React.FC<{activeSection: string, setIsEditing: (isEditing: boolean) => void, isEditing: boolean}> = ({activeSection, setIsEditing, isEditing}) => {
  // State for form fields
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('https://www.google.com');
  const [organizationId, setOrganizationId] = useState('1234567890');
  const user = JSON.parse(localStorage.getItem("user") || '{"isPlanReached":[],"count":0}');
  // State for errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showModal, setShowModal] = useState({
    organisationDetails: true,
    organisationUsers: false,
    organisationDetailsEdit: false,
    createAddOnUser: false
  });


  useEffect(()=>{
    axios.get(`/company/company-details/`).then((res)=>{
      console.log(res);
      setCompanyName(res.data.data[0].company_name);
      setCompanyAddress(res.data.data[0].company_address);
      setCompanyWebsite(res.data.data[0].company_website);
      setOrganizationId(res.data.data[0].organisation_id);
    })
  },[])

  // Validation function
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!companyName.trim()) newErrors.companyName = 'Company Name is required.';
    if (!companyAddress.trim()) newErrors.companyAddress = 'Company Address is required.';
    if (!companyWebsite.trim()) {
      newErrors.companyWebsite = 'Company Website is required.';
    } else {
      try {
        new URL(companyWebsite);
      } catch {
        newErrors.companyWebsite = 'Invalid URL.';
      }
    }
    if (!organizationId.trim()) newErrors.organizationId = 'Organization Id is required.';
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
        "organisation_id":organizationId
    }
      axios.post('/company/company-details/', payload).then((res) => {
        console.log(res);
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
         

            <Card className="p-6">
              <button onClick={() => setShowModal({...showModal, organisationDetails: true, organisationDetailsEdit: false, organisationUsers: false})}>
                Back
              </button>
             { showModal.organisationDetails && <OrganisationDetails setShowModal={setShowModal} showModal={showModal} />}
            {showModal.organisationDetailsEdit &&  <div className="space-y-6">
                <div className="flex items-center justify-between">
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
            {showModal.organisationUsers && <div className="flex items-center justify-between">
               <OrganisationUsers showModal={showModal} setShowModal={setShowModal} />
              </div>}
            </Card>
          </div>
  );
};

export default CompanySetting;


