import { ICardTokens } from "@uifabric/react-cards";
import { IRawStyle } from "office-ui-fabric-react";

export interface KiskbaCardProps {
    tokens?: ICardTokens;
    animation?: IRawStyle;
    animationDelay?: string;
}