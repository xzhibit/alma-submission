"use client";
import Select, { SingleValue } from 'react-select'
import styles from "./UserComponents.module.css";
import Image from "next/image";
import { CustomCheckbox } from "./CustomCheckbox";
import { countries } from "../../data";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'

import { appendData, selectData, selectStatus, SingleUser } from "@/lib/features/userdata/userdataSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const Form = () => {
    const router = useRouter()
    
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectData);
    const status = useAppSelector(selectStatus);

    const [firstNameValid, setFirstNameValid] = useState<boolean>(true);
    const [lastNameValid, setLastNameValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [linkedinValid, setLinkedinValid] = useState<boolean>(true);
    const [countryValid, setCountryValid] = useState<boolean>(true);
    const [howValid, setHowValid] = useState<boolean>(true);

    const clickBox = () => { }

    const resetValidities = () => {
        setFirstNameValid(true);
        setLastNameValid(true);
        setEmailValid(true);
        setEmailValid(true);
        setLinkedinValid(true);
        setCountryValid(true);
        setHowValid(true);
    }

    interface FormFields {
        first_name: string;
        last_name: string;
        email: string;
        linkedin: string;
        country: Record<string, string>;
        how_can_we_help: string;
        selected_visas?: string;
    }

    interface Map {
        [key: string]: string | undefined
    }

    const fileInput = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const target = e.target as HTMLFormElement;

        const formFields: Map = {
            first_name: target.first_name.value,
            last_name: target.last_name.value,
            email: target.email.value,
            linkedin: target.linkedin.value,
            country: target.country.value,
            how_can_we_help: target.how_can_we_help.value,
            selected_visas: ''
        }

        let validForm = formValidate(formFields as unknown as FormFields);

        if (!validForm) {
            return;
        }

        // Form is valid
        let checkboxes = Array.from<any>(document.querySelectorAll("input[type='checkbox']:checked"));
        let selectedVisas = checkboxes.map(x => x.value);
        formFields['selected_visas'] = selectedVisas.join(", ");

        const finalData = new FormData();

        for (var key in formFields) {
            finalData.append(key, formFields[key] as any);
        }
        finalData.append("file", fileInput?.current?.files?.[0]!);

        const response = await fetch('/api/formHandler', {
            method: 'POST',
            body: finalData
        })

        // Handle response if necessary
        const data = await response.json()

        // SAVE TO STATE - CLIENT SIDE
        let filePath = '';
        if (fileInput && fileInput.current && fileInput.current.files) {
            filePath = "./public/uploads/" + fileInput.current.files[0].name;
        }
        const stateUser: SingleUser = {
            first_name: formFields['first_name'] as string,
            last_name: formFields['last_name'] as string,
            submitted: getTime(),
            email: formFields['email'] as string,
            linkedin_url: formFields['linkedin'] as string,
            country: formFields['country'] as string,
            message: formFields['how_can_we_help'] as string,
            visa_categories: formFields['selected_visas'],
            resume: `./public/uploads/${filePath}`,
            status: "PENDING"
        }
        dispatch(appendData(stateUser));
        
        // Send to thank you
        router.push("/thankyou");
        // window.location.href = "/thankyou";

    }

    const getTime = () => {
        const date = new Date();
        const dformat = [date.getDate(),
            date.getMonth()+1,
            date.getFullYear()].join('/')+' '+
           [date.getHours(),
            date.getMinutes(),
            date.getSeconds()].join(':');
        return dformat;
    }

    const empty = (value: string | Record<string, string>): boolean => {
        if (typeof value == "string") {
            if (!value || value.trim().length == 0) { return true; }
        } else {
            if (!value) { return true; }
        }
        return false;
    }

    const invalidEmail = (email: string): boolean => {
        // Simple regex because validating emails can't be done unless you provide the email addresses.
        const re = /^\S+@\S+\.\S+$/;
        return !re.test(email);
    }

    const invalidLinkedin = (linkedin: string): boolean => {
        const re = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/;
        return !re.test(linkedin);
    }

    const formValidate = (formFields: FormFields): boolean => {
        resetValidities();
        if (empty(formFields.first_name) || formFields.first_name.length < 3) { setFirstNameValid(false) }
        if (empty(formFields.last_name) || formFields.last_name.length < 3) { setLastNameValid(false) }
        if (empty(formFields.email) || invalidEmail(formFields.email)) { setEmailValid(false) }
        if (empty(formFields.linkedin) || invalidLinkedin(formFields.linkedin)) { setLinkedinValid(false) }
        if (empty(formFields.linkedin)) { setLinkedinValid(false) }
        if (empty(formFields.country)) { setCountryValid(false) }
        if (empty(formFields.how_can_we_help)) { setHowValid(false) }

        if ([firstNameValid, lastNameValid, emailValid, linkedinValid, countryValid, howValid].every(test => test)) { return true; }

        return false;
    }

    return (
        <div className={styles.form_section}>
            <Image
                src="/info-icon.png"
                className="icon"
                height={70}
                width={50}
                alt="info"
            />
            <p className={styles.form_title}>Want to understand your visa options?</p>
            <p className={styles.form_subtitle}>Submit the form below and our team of experienced attorneys will review your information and send a preliminiary assessment of your case based on your goals.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="first_name" className={styles.form_text} placeholder="First Name" />
                {!firstNameValid && <span className="invalid-help">First name must be at least 3 characters.</span>}
                <input type="text" name="last_name" className={styles.form_text} placeholder="Last Name" />
                {!lastNameValid && <span className="invalid-help">Last name must be at least 3 characters.</span>}
                <input type="text" name="email" className={styles.form_text} placeholder="Email" />
                {!emailValid && <span className="invalid-help">Invalid email address.</span>}
                <input type="text" name="linkedin" className={styles.form_text} placeholder="LinkedIn" />
                {!linkedinValid && <span className="invalid-help">Invalid LinkedIn URL.</span>}
                <input type="file" name="file" ref={fileInput} className="hidden" />
                <label htmlFor="file" className="fakeFile" onClick={() => {fileInput.current?.click()}}>Click anywhere in this box to upload a CV</label>
                <Select
                    options={countries}
                    placeholder="Country of Citizenship"
                    className="countries-select-container"
                    classNamePrefix="countries-select"
                    unstyled
                    name="country"
                // onChange={(value) => handleSelect(value)}
                />
                {!countryValid && <span className="invalid-help">Please select your country of citizenship.</span>}
                <Image
                    src="/dice.png"
                    className="icon visa-icon"
                    height={70}
                    width={50}
                    alt="visa categories"
                />
                <p className={styles.form_title}>Visa categories of interest?</p>
                <CustomCheckbox
                    name="visa_interest"
                    id="visa-o-1"
                    value="O-1"
                    changeHandler={clickBox}
                />
                <CustomCheckbox
                    name="visa_interest"
                    id="visa-eb-1a"
                    value="EB-1A"
                    changeHandler={clickBox}
                />
                <CustomCheckbox
                    name="visa_interest"
                    id="visa-eb2-niw"
                    value="EB-2 NIW"
                    changeHandler={clickBox}
                />
                <CustomCheckbox
                    name="visa_interest"
                    id="visa-dont-know"
                    value="I don't know"
                    changeHandler={clickBox}
                />
                <Image
                    src="/heart.png"
                    className="icon heart-icon"
                    height={70}
                    width={50}
                    alt="how can we help"
                />
                <p className={styles.form_title}>How can we help you?</p>
                <textarea placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short term employment visa or both? Are there any timeline considerations?" name="how_can_we_help" className={styles.form_textarea}></textarea>
                {!howValid && <span className="invalid-help">Please enter a message for us.</span>}
                <input type="submit" className={styles.form_submit} value="Submit" />
            </form>
        </div>
    );
}