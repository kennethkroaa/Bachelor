export interface ISideRailLink {
    text: string;
    ref: HTMLDivElement | null;
    selected?: boolean;
}

export interface IKiskbaSideRailProps {
    fields: any;
    refs: any;
    selectedSection: string;
    stepper?: any;
}