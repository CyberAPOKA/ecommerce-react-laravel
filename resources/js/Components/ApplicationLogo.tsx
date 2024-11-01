import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="https://static.kabum.com.br/conteudo/icons/logoPrime.svg"
            className="w-20 sm:w-44 h-fit"
        />
    );
}
