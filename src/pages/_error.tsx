import { NextPageContext } from 'next';
import ErrorModule from '../modules/error/ErrorModule';

export interface KiskbaErrorProps {
    statusCode: Number
}

interface Context extends NextPageContext {

}

const Error = (props: KiskbaErrorProps) => (
    <ErrorModule statusCode={props.statusCode}/>
);

Error.getInitialProps = async (ctx: Context) => {
    const statusCode = ctx.res ? ctx.res.statusCode : ctx.err ? ctx.err.statusCode : 404

    return { 
        statusCode,
        namespacesRequired: ['common']
    }
}

export default Error;