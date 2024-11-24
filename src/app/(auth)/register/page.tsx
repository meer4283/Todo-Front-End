'use client';

import { useHttp } from '@/hooks/useHttp';
import { APP_NAME } from '@/utils/constants';
import { useFormik } from 'formik';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import { features } from 'process';
import React, { useEffect, useState } from 'react';

const Register = () => {

    const router = useRouter()
    const [checked4, setChecked4] = useState(false);
    const db = new useHttp();
    const [loading, setLoading] = useState(false);
    const formik: any = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validate: (data) => {
            let errors: any = {};

            if (!data.email) {
                errors.email = ' Email is required.';
            } else {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)) {
                    errors.email = 'Invalid Email';
                }
            }
            if (!data.name) {
                errors.name = 'Name is required.';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if (!data.confirm_password) {
                errors.confirm_password = 'Confirm Password is required.';
            }

            if (data.password !== data.confirm_password) {
                errors.confirm_password = 'Password mismatch.';
            }
            return errors;
        },
        onSubmit: (data) => {
            register(data);
        }
    });

    const isFormFieldValid = (name: any) => {
        return !!(formik.touched[name] && formik.errors[name]);
    };
    const getFormErrorMessage = (name: any) => {
        return isFormFieldValid(name) && <small className="block text-red-500 font-semibold">{formik.errors[name]}</small>;
    };

    const checkExistEmail = (email: any) => {
        db.post('/checkemail', {
            email: email
        })
            .then((response: any) => {
                if (response?.data?.exist === true) {
                    formik.setErrors({ email: 'This email is already taken.' });
                } else if (response?.data?.exist === false) {
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        const getData = setTimeout(() => {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)) {
                checkExistEmail(formik.values.email);
            }
        }, 1000);
        return () => clearTimeout(getData);
    }, [formik.values.email]);

    const register = (data: any) => {
        console.log('object');
        db.post('/signup', { ...data }).then(() => {
            formik.resetForm();
        }).finally(() => {
            router.push("/dashboard")
        });
    };

    const features = [
        { title: 'Unlimited Inbox', image: 'live-collaboration.svg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Data Security', image: 'security.svg', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { title: 'Cloud Backup Williams', image: 'subscribe.svg', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
    ];

    return (
        <div style={{ background: 'url("/demo/images/login/signin-bg.jpg") no-repeat', backgroundSize: 'cover' }} className="surface-ground px-4 py-8 md:px-6 lg:px-8 h-screen">
            <div className="flex flex-wrap shadow-2">
                <div className="w-full lg:w-6 px-0 py-4 lg:p-7 bg-blue-50">
                    <img src="/demo/images/blocks/logos/bastion-700.svg" alt="Image" height="35" className="mb-6" />
                    <Carousel
                        value={features}
                        itemTemplate={(feature) => (
                            <div className="text-center mb-8">
                                <img src={`/demo/images/blocks/illustration/${feature.image}`} alt="Image" className="mb-6 w-6" />
                                <div className="mx-auto font-medium text-xl mb-4 text-blue-900">{feature.title}</div>
                                <p className="m-0 text-blue-700 line-height-3">{feature.text}</p>
                            </div>
                        )}
                    />
                </div>
                <form  onSubmit={formik.handleSubmit} className="w-full lg:w-6 p-4 lg:p-7 surface-card">
                    <div className="flex align-items-center justify-content-between mb-7">
                        <span className="text-2xl font-medium text-900">Already have an account ? Sign in to {APP_NAME}</span>
                        <Link href={"/"} className='font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150'>Sign in</Link>
                    </div>
                    <div className="flex justify-content-between">
                        <button className="p-ripple mr-2 w-6 font-medium border-1 surface-border surface-100 py-3 px-2 p-component hover:surface-200 active:surface-300 text-900 cursor-pointer transition-colors transition-duration-150 inline-flex align-items-center justify-content-center">
                            <i className="pi pi-facebook text-indigo-500 mr-2"></i>
                            <span>Sign in With Facebook</span>
                            <Ripple />
                        </button>
                        <button className="p-ripple ml-2 w-6 font-medium border-1 surface-border surface-100 py-3 px-2 p-component hover:surface-200 active:surface-300 text-900 cursor-pointer transition-colors transition-duration-150 inline-flex align-items-center justify-content-center">
                            <i className="pi pi-google text-red-500 mr-2"></i>
                            <span>Sign in With Google</span>
                            <Ripple />
                        </button>
                    </div>
                    <Divider align="center" className="my-4">
                        <span className="text-600 font-normal text-sm">OR</span>
                    </Divider>
                    <label htmlFor="name" className="block text-900 font-medium mb-2">
                        Name
                    </label>
                    <InputText type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Name" className="w-full mb-3 p-3" />
                    {getFormErrorMessage('name')}

                    <label htmlFor="name" className="block text-900 font-medium mb-2">
                        Email
                    </label>
                    <InputText type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email address" className="w-full mb-3 p-3" />
                    {getFormErrorMessage('email')}

                    <label htmlFor="password" className="block text-900 font-medium mb-2">
                        Password
                    </label>
                    <InputText id="password" name="password" value={formik.values.password} onChange={formik.handleChange} type="password" placeholder="Password" className="w-full mb-3 p-3" />
                    {getFormErrorMessage('password')}

                    <label htmlFor="confirm_password" className="block text-900 font-medium mb-2">
                        Confirm Password
                    </label>
                    <InputText id="confirm_password" name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange} type="password" placeholder="Password" className="w-full mb-3 p-3" />
                    {getFormErrorMessage('confirm_password')}

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" className="mr-2" checked={checked4} onChange={(e: any) => setChecked4(e.checked)} />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors transition-duration-150">Forgot password?</a>
                    </div>

                    <Button label="Register" type='submit' disabled={loading} className="w-full py-3 font-medium" />
                </form>
            </div>
        </div>
    );
};

export default Register;
