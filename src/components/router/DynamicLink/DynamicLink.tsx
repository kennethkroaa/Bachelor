import { Link } from "@i18n";
import { DynamicLinkProps } from "./DynamicLink.types";

const DynamicLink: React.FunctionComponent<DynamicLinkProps> = (props) => {
    return (
        <Link 
            href={{
                pathname: props.pathname,
                query: props.query
            }}
            as={props.as}
            passHref={props.passHref}
        >
            {props.children}
        </Link>
    );
}

export default DynamicLink;