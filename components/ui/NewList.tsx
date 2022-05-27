import React from 'react'
import { Formik, Field, Form } from 'formik';

interface myFormikProps {
    title: string;
}
export const NewList = () => {
  return (
    <div className='w-96 h-32 flex flex-col p-2 border-2 border-green-600/30'>
        <Formik
            initialValues={{ title: ''}}
            validate = { values => {
                const errors: any = {};
                if (!values.title) {
                    errors.title = 'Required';
                } else if (values.title.length < 3) {
                    errors.title = 'Must be 3 characters or more';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
            <form className='space-y-2' onSubmit={handleSubmit}>
                <input 
                    className='w-full bg-zinc-700 text-white p-2' 
                    placeholder='Title'
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                />
                <p className='text-red-500 mt-1'>
                    {errors.title && touched.title && errors.title}
                </p>
                <button 
                    className='w-1/3 bg-green-600 rounded-md 
                        text-white flex items-center justify-center'
                    type="submit"
                    disabled={isSubmitting}
                >
                        Submit
                </button>
            </form>
        )}
        </Formik>
    </div>
  )
}
