import { Field, Form, Formik } from "formik"
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "../../../hooks/useForm"
import { Form as FormType } from "../../../types/form.responses.types"
import { ApiForm } from "../../api/apiForm"

export default function FormCrud() {
  const router = useRouter()
  const instance = ApiForm()
  const { id } = router.query
  const {formData, loading} = useForm(id)
  
  console.log(formData)

  return (
    <div>
      <h1>My Example</h1>
      {loading === false && formData &&
        <Formik
          initialValues={formData}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <label htmlFor="name">First Name</label>
            <Field id="name" name="name" placeholder="First Name" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      }
    </div>
  )
}