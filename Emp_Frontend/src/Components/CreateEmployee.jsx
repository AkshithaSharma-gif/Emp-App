import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

function CreateEmp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = async (newEmpObj) => {
        console.log(newEmpObj);

        try {
            setLoading(true);
            setError("");

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/employee-api/employees`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEmpObj),
                }
            );

            const data = await res.json();

            if (res.ok) {
                console.log(data);

                // navigate to employees list page
                navigate("/list");
            } else {
                throw new Error(data.message || "Failed to create employee");
            }
        } catch (err) {
            console.log("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <p className="text-center text-4xl mt-10">
                Loading...
            </p>
        );
    }

    return (
        <div>
            <h1 className="text-5xl text-center text-blue-600 mb-3">
                Create New Employee
            </h1>

            {error && (
                <p className="text-red-500 text-center text-2xl mt-4">
                    {error}
                </p>
            )}

            <form
                className="max-w-md mx-auto mt-20"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                {/* Name */}
                <div>
                    <input
                        className="border w-full p-4 m-2 rounded-2xl"
                        type="text"
                        placeholder="Enter Name"
                        {...register("Name", {
                            required: "Name Required",
                            validate: (v) =>
                                v.trim().length !== 0 ||
                                "White space is not valid",
                        })}
                    />

                    {errors.Name && (
                        <p className="text-red-600">
                            {errors.Name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        className="border w-full p-4 m-2 rounded-2xl"
                        type="email"
                        placeholder="Enter Email"
                        {...register("Email", {
                            required: "Email Required",
                        })}
                    />

                    {errors.Email && (
                        <p className="text-red-600">
                            {errors.Email.message}
                        </p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                    <input
                        className="border w-full p-4 m-2 rounded-2xl"
                        type="text"
                        placeholder="Enter Mobile"
                        {...register("Mobile", {
                            required: "Mobile Number Required",
                        })}
                    />

                    {errors.Mobile && (
                        <p className="text-red-600">
                            {errors.Mobile.message}
                        </p>
                    )}
                </div>

                {/* Designation */}
                <div>
                    <input
                        className="border w-full p-4 m-2 rounded-2xl"
                        type="text"
                        placeholder="Enter Designation"
                        {...register("Designation", {
                            required: "Designation Required",
                        })}
                    />

                    {errors.Designation && (
                        <p className="text-red-600">
                            {errors.Designation.message}
                        </p>
                    )}
                </div>

                {/* Company */}
                <div>
                    <input
                        className="border w-full p-4 m-2 rounded-2xl"
                        type="text"
                        placeholder="Enter Company Name"
                        {...register("Company", {
                            required: "Company Required",
                        })}
                    />

                    {errors.Company && (
                        <p className="text-red-600">
                            {errors.Company.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <div>
                    <input
                        className="border block mx-auto p-3 bg-blue-500 text-white rounded-2xl cursor-pointer"
                        type="submit"
                        value="Create Employee"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateEmp;
