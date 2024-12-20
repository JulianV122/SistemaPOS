'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Register } from './Register';
import { RegisterEnterprise } from './RegisterEnterprise';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { Plans } from './Plans';
import { HomeNavbar } from '../molecules/HomeNavbar';

const steps = ['1', '2', '3'];

export function StepperRegister() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className='bg-white'>
            <HomeNavbar />
            <div className="flex justify-center  p-8  border-2 border-blue-950  rounded-full mx-auto mt-2 ">

                <Stepper activeStep={activeStep} sx={{
                    width: '40%',
                    '& .MuiStepIcon-root': {
                        width: '30px',
                        height: '30px',
                        fontSize: '3rem',
                    },
                }}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode } = {};

                        let icon;

                        if (index === 0) {
                            icon = <PersonIcon />;
                        } else if (index === 1) {
                            icon = <BusinessIcon />;
                        } else if (index === 2) {
                            icon = <ShoppingCartCheckoutIcon />;
                        }

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{icon}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>

            <br />
            <div className="flex items-center justify-center pb-14">
                <div className="flex justify-center rounded-3xl bg-slate-50 w-full max-w-5xl ">
                    {activeStep === 0 && <Register handleNext={handleNext} />}
                    {activeStep === 1 && <RegisterEnterprise handleNext={handleNext} />}
                    {activeStep === 2 && <Plans />}
                </div>
            </div>
        </div>
    );

}
