import { Link } from "@i18n";
import { FontIcon, Stack, StackItem, Text } from "office-ui-fabric-react";
import * as React from "react";
import { getClassNames } from "./KiskbaBanner.styles";
import KiskbaBannerProps from "./KiskbaBanner.types";

const KiskbaBanner: React.FunctionComponent<KiskbaBannerProps> = (props) => {
    const classes = getClassNames(props);

    return (
        <header
            className={classes.root}
            id={props.id}
        >
            <Stack horizontal verticalFill verticalAlign="center">
                <StackItem grow={3}>
                    <span className={classes.pageTitleContainer}>
                        <Text variant="xLarge">
                            <Link href="/">
                                <a className={classes.pageTitleLink}>
                                    Kiskba
                                </a>
                            </Link>
                        </Text>
                    </span>
                </StackItem>
                <StackItem grow={5}>
                    <span className={classes.text}>
                        <Text variant="xLarge">
                            {props.title}
                        </Text>
                    </span>
                </StackItem>
                <StackItem grow={3}>
                    <Stack horizontal verticalAlign="center" tokens={{childrenGap: 24}}>
                        <StackItem>
                            <span className={classes.text}>
                                <Text>
                                    Change language
                                </Text>
                            </span>
                        </StackItem>
                        <StackItem>
                            <span className={classes.text}>
                                <Text>
                                    Ola Nordmann
                                </Text>
                            </span>
                        </StackItem>
                        <StackItem>
                            <FontIcon 
                                className={classes.bannerIcon}
                                iconName="Contact"
                            />
                        </StackItem>
                    </Stack>
                </StackItem>
            </Stack>
        </header>
    )
}

export default KiskbaBanner;