import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldContainer from "./FieldContainer";
import FormRow from "./FormRow";

const schema = yup.object().shape({
  person_age: yup.number().required("Age is required").positive().integer().min(18, "Must be at least 18"),
  person_income: yup.number().required("Income is required").positive(),
  person_home_ownership: yup
    .string()
    .oneOf(["rent", "own", "mortgage"], "Invalid option")
    .required("Home ownership is required"),
  person_emp_length: yup
    .number()
    .required("Employment length is required")
    .positive()
    .integer()
    .min(0, "Cannot be negative"),
  loan_intent: yup
    .string()
    .oneOf(
      ["personal", "education", "medical", "venture", "homeimprovement", "debtconsolidation"],
      "Invalid loan intent"
    )
    .required("Loan intent is required"),
  loan_grade: yup
    .string()
    .oneOf(["A", "B", "C", "D", "E", "F", "G"], "Invalid loan grade")
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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 gap-6 bg-slate-200 max-w-3xl m-auto">

      <FormRow>

        <FieldContainer>
          <label>Age</label>
          <input type="number" {...register("person_age")} min={18} max={120} className={`w-24 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.person_age ? 'border-l-4 border-red-500' : ''}`} />
        </FieldContainer>

        <FieldContainer>
          <label>Income</label>
          <div className="flex gap-1 items-center">
            <span>$</span>
            <input type="number" {...register("person_income")} min={0} className={`w-32 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.person_income ? 'border-l-4 border-red-500' : ''}`} />
          </div>
        </FieldContainer>

        <FieldContainer>
          <label>Home Ownership</label>
          <select {...register("person_home_ownership")} className={`w-36 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.person_home_ownership ? 'border-l-4 border-red-500' : ''}`}>
            <option value="">Select</option>
            <option value="rent">Rent</option>
            <option value="own">Own</option>
            <option value="mortgage">Mortgage</option>
          </select>
        </FieldContainer>

        <FieldContainer>
          <label>Employment length</label>
          <div className="flex gap-1 items-center">
            <input type="number" {...register("person_emp_length")} min={0} className={`w-24 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.person_emp_length ? 'border-l-4 border-red-500' : ''}`} />
            <span>años</span>
          </div>
        </FieldContainer>

      </FormRow>

      <FormRow>
        <FieldContainer>
          <label>Loan Intent:</label>
          <select {...register("loan_intent")} className={`w-52 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.loan_intent ? 'border-l-4 border-red-500' : ''}`}>
            <option value="">Select</option>
            <option value="personal">Personal</option>
            <option value="education">Education</option>
            <option value="medical">Medical</option>
            <option value="venture">Venture</option>
            <option value="homeimprovement">Home Improvement</option>
            <option value="debtconsolidation">Debt Consolidation</option>
          </select>
        </FieldContainer>

        <FieldContainer>
          <label>Loan Grade</label>
          <select {...register("loan_grade")} className={`w-40 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.loan_grade ? 'border-l-4 border-red-500' : ''}`}>
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </FieldContainer>

        <FieldContainer>
          <label>Loan Amount</label>
          <div className="flex gap-1 items-center">
            <span>$</span>
            <input type="number" {...register("loan_amnt")} min={0} className={`w-44 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.loan_amnt ? 'border-l-4 border-red-500' : ''}`} />
          </div>
        </FieldContainer>

      </FormRow>
      <FormRow>
        <FieldContainer>
          <label>Interest Rate</label>
          <div className="flex gap-1 items-center">
            <input type="number" {...register("loan_int_rate")} min={0} className={`w-24 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.loan_int_rate ? 'border-l-4 border-red-500' : ''}`} />
            <span>%</span>
          </div>
        </FieldContainer>

        <FieldContainer>
          <label>Percent Income</label>
          <div className="flex gap-1 items-center">
            <input type="number" {...register("loan_percent_income")} min={0} className={`w-24 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.loan_percent_income ? 'border-l-4 border-red-500' : ''}`} />
            <span>%</span>
          </div>
        </FieldContainer>

        <FieldContainer>
          <label>Credit History Length</label>
          <div className="flex items-center gap-1">

            <input type="number" {...register("cb_person_cred_hist_length")} min={0} className={`w-24 outline-none py-1 px-2 rounded-sm shadow-sm transition-all ${errors.cb_person_cred_hist_length ? 'border-l-4 border-red-500' : ''}`} />
            <span>años</span>
          </div>
        </FieldContainer>
      </FormRow>

      <div className="p-3 bg-white border-[1px] border-gray-400 rounded-lg shadow-dm flex items-center gap-2">
        <input type="checkbox" {...register("cb_person_default_on_file")} />
        <p>La persona ha estado en mora anteriormente</p>
      </div>

      <div className="">
        {errors.cb_person_default_on_file && <p className="text-red-500">{errors.cb_person_default_on_file.message}</p>}
        {errors.cb_person_cred_hist_length && <p className="text-red-500">{errors.cb_person_cred_hist_length.message}</p>}
        {errors.loan_percent_income && <p className="text-red-500">{errors.loan_percent_income.message}</p>}
        {errors.loan_int_rate && <p className="text-red-500">{errors.loan_int_rate.message}</p>}
        {errors.loan_amnt && <p className="text-red-500">{errors.loan_amnt.message}</p>}
        {errors.loan_grade && <p className="text-red-500">{errors.loan_grade.message}</p>}
        {errors.loan_intent && <p className="text-red-500">{errors.loan_intent.message}</p>}
        {errors.person_emp_length && <p className="text-red-500">{errors.person_emp_length.message}</p>}
        {errors.person_home_ownership && <p className="text-red-500">{errors.person_home_ownership.message}</p>}
        {errors.person_income && <p className="text-red-500">{errors.person_income.message}</p>}
        {errors.person_age && <p className="text-red-500">{errors.person_age.message}</p>}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-green-300 w-56 p-2 rounded-md text-green-900 border-[1px] border-green-900">Evaluar situación crediticia</button>
      </div>
    </form>
  );
};

export default Form;
