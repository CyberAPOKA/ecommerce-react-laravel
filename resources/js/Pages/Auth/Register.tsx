import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        type: string;
        name: string;
        email: string;
        password: string;
        cpf: string;
        birth_date: Date | null;
        password_confirmation: string;
    }>({
        type: "",
        name: "",
        email: "",
        password: "",
        cpf: "",
        birth_date: null,
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const types = [
        { name: "Comprador", code: "buyer" },
        { name: "Vendedor", code: "seller" },
        { name: "Admin", code: "admin" },
    ];

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="type" value="Tipo de usuário" />
                    <Dropdown
                        className="w-full md:w-14rem"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                        options={types}
                        optionLabel="name"
                        optionValue="code"
                        id="type"
                        name="type"
                        placeholder="Selecione o tipo de usuário"
                    />
                    <InputError message={errors.type} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Nome" />
                    <InputText
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <InputText
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {data.type === "buyer" && (
                    <div className="mt-4">
                        <InputLabel htmlFor="cpf" value="CPF" />
                        <InputMask
                            id="cpf"
                            name="cpf"
                            value={data.cpf}
                            autoComplete="cpf"
                            onChange={(e) =>
                                setData("cpf", e.target.value || "")
                            }
                            mask="999.999.999-99"
                            placeholder="999.999.999-99"
                            className="w-full"
                        />
                        <InputError message={errors.cpf} className="mt-2" />
                    </div>
                )}

                {data.type === "buyer" && (
                    <div className="mt-4">
                        <InputLabel
                            htmlFor="birth_date"
                            value="Data de nascimento"
                        />
                        <Calendar
                            id="birth_date"
                            name="birth_date"
                            value={data.birth_date}
                            onChange={(e) =>
                                setData(
                                    "birth_date",
                                    e.target.value as Date | null
                                )
                            }
                            dateFormat="dd/mm/yy"
                            className="w-full"
                        />
                        <InputError
                            message={errors.birth_date}
                            className="mt-2"
                        />
                    </div>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <InputText
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <InputText
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
