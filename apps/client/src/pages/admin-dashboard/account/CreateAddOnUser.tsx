import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input, Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@reactive-resume/ui';
import { axios } from '@/client/libs/axios';
import { toast } from '@/client/hooks/use-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Define the schema for form validation
const createAddOnUserSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  role: z.enum(["manager", "member"]),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof createAddOnUserSchema>;

const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const boxStyles: React.CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: '32px 30px',
  minWidth: 800,
  maxWidth: '95vw',
  boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
  position: 'relative',
  textAlign: 'left',
};

const closeBtnStyles: React.CSSProperties = {
  position: 'absolute',
  top: 20,
  right: 24,
  background: 'none',
  border: 'none',
  fontSize: 24,
  cursor: 'pointer',
  color: '#888',
};

const addBtnStyles: React.CSSProperties = {
  marginTop: 32,
  background: '#7C5CFA',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '6px 0',
  width: 220,
  fontSize: 18,
  fontWeight: 500,
  cursor: 'pointer',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  marginBottom: 4,
  display: 'block',
};

const fieldBox: React.CSSProperties = {
  marginBottom: 18,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
};

const halfWidth: React.CSSProperties = {
  flex: 1,
};

const roles = [
  { value: 'manager', label: 'Manager' },
  { value: 'member', label: 'Member' },
];

const CreateAddOnUser = ({ isOpen, onClose}: { isOpen: boolean; onClose: () => void; }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(createAddOnUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      role: "manager",
      phone: "",
      email: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    console.log(data, "formm");
    const organisation_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "").organizations?.[0] || null : null;
    const payload = {
      ...data,
      organisation_id: organisation_id,
    }
    
    try {
      const response = await axios.post("/addon-user/auth/create-add-on-user/", payload);
      
      // Fetch user data
      const userResponse = await axios.get(`/accounts/api/users/`);
      localStorage.setItem("user", JSON.stringify(userResponse.data[0]));
      
      // Fetch organization employees
      const employeesResponse = await axios.get(`/company/organization-employees/`);
      console.log(employeesResponse, "res");
      
      onClose();
      toast({
        title: "Success",
        description: "Add-on user created successfully",
        variant: "default",
      });
    } catch (err: any) {
      console.log(err, "err");
      toast({
        title: err.message || "Error",
        description: err.message || "Failed to create add-on user",
        variant: "error",
      });
    }
  };

  return (
    <div style={modalStyles}>
      <div style={boxStyles}>
        <button style={closeBtnStyles} onClick={onClose} aria-label="Close">×</button>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16 }}>Add–On User</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div style={rowStyle}>
              <div style={{ ...halfWidth, ...fieldBox }}>
                <FormField
                  name="first_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={labelStyle} className="text-foreground">First Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the user's First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div style={{ ...halfWidth, ...fieldBox }}>
                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={labelStyle} className="text-foreground">Last Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the user's Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div style={rowStyle}>
              <div style={{ ...halfWidth, ...fieldBox }}>
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={labelStyle} className="text-foreground">Role*</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #ddd',
                            backgroundColor: '#fff',
                            fontSize: '16px'
                          }}
                        >
                          {roles.map(role => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div style={{ ...halfWidth, ...fieldBox }}>
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={labelStyle} className="text-foreground">Phone*</FormLabel>
                      <FormControl>
                        <PhoneInput
                          country="IN"
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          inputClass="!w-full !h-11 !pl-16"
                          containerClass="phonefield-wrapper"
                          placeholder="Phone Number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div style={fieldBox}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={labelStyle} className="text-foreground">Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter the user's Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" style={addBtnStyles}>
              Add Member
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateAddOnUser;
