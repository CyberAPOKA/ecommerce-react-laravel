import { Head, Link } from "@inertiajs/react";
import Header from "@/Layouts/Header";
export default function Welcome() {
    return (
        <Header>
            <Head title="Welcome" />
            <div className="flex items-center justify-center text-primary">
                Bem vindo
            </div>
        </Header>
    );
}
