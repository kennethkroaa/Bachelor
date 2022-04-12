import KiskbaBanner from "@components/ui/KiskbaBanner";
import { getClassNames } from "./SiteLayout.styles";
import SiteLayoutProps from "./SiteLayout.types";

const SiteLayout: React.FunctionComponent<SiteLayoutProps> = (props) => {
    const classes = getClassNames(props);
     
    return (
        <div key="site" className={classes.siteRoot}>
            <KiskbaBanner title={props.title}/>
            <div className={classes.siteWrapper}>
                <div 
                    className={classes.siteContent}
                    tabIndex={-1}
                    role="main"
                >
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SiteLayout;