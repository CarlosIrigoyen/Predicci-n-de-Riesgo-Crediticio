import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldContainer from "./FieldContainer";
import FormRow from "./FormRow";
import axios from "axios";
import Resultado from "./Resultado";
import Spinner from "./Spinner";
import autoAnimate from '@formkit/auto-animate'

const schema = yup.object().shape({
  person_age: yup.number().required("Age is required").positive().integer().min(18, "Must be at least 18"),
  person_income: yup.number().required("Income is required").positive(),
  person_home_ownership: yup
    .string()
    .required("Home ownership is required"),
  person_emp_length: yup
    .number()
    .required("Employment length is required")
    .positive()
    .integer()
    .min(0, "Cannot be negative"),
  loan_intent: yup
    .string()
    .required("Loan intent is required"),
  loan_grade: yup
    .number()
    .required("Loan grade is required"),
  loan_amnt: yup.number().required("Loan amount is required").positive(),
  loan_int_rate: yup.number().required("Interest rate is required").positive().max(100, "Rate cannot exceed 100%"),
  loan_percent_income: yup
    .number()
    .required("Percent income is required")
    .positive()
    .max(100, "Percent cannot exceed 100%"),
  cb_person_default_on_file: yup.boolean().required("Default on file is required"),
  cb_person_cred_hist_length: yup
    .number()
    .required("Credit history length is required")
    .positive()
    .integer()
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { easing: 'ease-in' })
  }, [parent])

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const onSubmit = async (data) => {

    console.log("Form Data:", data);

    try {
      setIsLoading(true);
      setData(null);
      const response = await axios.post("http://localhost:8000/evaluar-situacion/", data)
      setData(response.data);

      // Esperar 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

    } catch (error) {
      console.error("Error:", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="mb-16 mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formulario de evaluación crediticia</h2>

        <div className="space-y-6">
          <FormRow className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FieldContainer>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                {...register("person_age")}
                min={18}
                max={120}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.person_age ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </FieldContainer>

            <FieldContainer>
              <label className="block text-sm font-medium text-gray-700 mb-1">Income</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  {...register("person_income")}
                  min={0}
                  className={`w-full pl-7 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.person_income ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </FieldContainer>

            <FieldContainer className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Ownership</label>
              <select
                {...register("person_home_ownership")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.person_home_ownership ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                <option value="rent">Rent</option>
                <option value="own">Own</option>
                <option value="mortgage">Mortgage</option>
                <option value="other">Other</option>

              </select>
            </FieldContainer>
      

            <FieldContainer className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment length</label>
              <div className="relative">
                <input
                  type="number"
                  {...register("person_emp_length")}
                  min={0}
                  className={`w-full pr-12 pl-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.person_emp_length ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">years</span>
              </div>
            </FieldContainer>
            </FormRow>

          <FormRow className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FieldContainer className="w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Intent</label>
              <select
                {...register("loan_intent")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.loan_intent ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                <option value="personal">Personal</option>
                <option value="education">Education</option>
                <option value="medical">Medical</option>
                <option value="venture">Venture</option>
                <option value="homeimprovement">Home Improvement</option>
                <option value="debtconsolidation">Debt Consolidation</option>
              </select>
            </FieldContainer>

            <FieldContainer className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Grade</label>
              <select
                {...register("loan_grade")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.loan_grade ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select</option>
                <option value={0}>A</option>
                <option value={1}>B</option>
                <option value={2}>C</option>
                <option value={3}>D</option>
                <option value={4}>E</option>
                <option value={5}>F</option>
                <option value={6}>G</option>
              </select>
            </FieldContainer>

            <FieldContainer>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  {...register("loan_amnt")}
                  min={0}
                  className={`w-full pl-7 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.loan_amnt ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </FieldContainer>
          </FormRow>

          <FormRow className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FieldContainer className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
              <div className="relative">
                <input
                  type="number"
                  {...register("loan_int_rate")}
                  min={0}
                  max={100}
                  step={0.01}
                  className={`w-full pr-8 pl-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.loan_int_rate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
              </div>
            </FieldContainer>

            <FieldContainer className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Percent Income</label>
              <div className="relative">
                <input
                  type="number"
                  {...register("loan_percent_income")}
                  min={0}
                  max={100}
                  step={0.01}
                  className={`w-full pr-8 pl-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.loan_percent_income ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
              </div>
            </FieldContainer>

            <FieldContainer className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Credit History Length</label>
              <div className="relative">
                <input
                  type="number"
                  {...register("cb_person_cred_hist_length")}
                  min={0}
                  className={`w-full pr-12 pl-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.cb_person_cred_hist_length ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">years</span>
              </div>
            </FieldContainer>
          </FormRow>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("cb_person_default_on_file")}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm text-gray-700">La persona ha estado en mora anteriormente</span>
            </label>
          </div>
        </div>
      
        {Object.keys(errors).length > 0 && (
          <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-200">
            <h3 className="text-sm font-medium text-red-800 mb-2">Por favor, corrija los siguientes errores:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key} className="text-sm text-red-700">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isLoading}
          >
            {!isLoading ? 'Evaluar situación crediticia' : 'Cargando...'}
          </button>
        </div>
      </form>

      <div ref={parent}>

        {isLoading && <Spinner />}

        {data && !isLoading && (
          <Resultado prediction = {data.prediction}/>
        )}
      </div>

    </div>
  );
};

export default Form;

