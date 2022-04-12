import { DirectionalHint, IChoiceGroupProps } from "office-ui-fabric-react";

/**
 * KiskbaRadioButton component props.
 * {@docCategory KiskbaRadioButton}
 */

export interface KiskbaRadioButtonProps extends IChoiceGroupProps {
    errors?: any[];

    prefixIcon?: string;
    /**
     * Tittel attribut på ikon-knapp
     */
    iconButtonTitle?: string;
    /**
     * Aria-label på ikon-knapp
     */
    iconButtonAriaLabel?: string;
    /**
     * Navn på ikon som vises ved siden av label
     */
    icon?: string;
    /**
     * Tekst som vises under input-feltet
     */
    customDescription?: string;
    /**
     * Tekst som vises på innsiden av Callout-komponenten
     */
    calloutText?: string;
    /**
     * Fra hvor skal Callout-komponenten dukke opp
     * @defaultvalue DirectionalHint.topRightEdge
     */
    calloutDirection?: DirectionalHint;

    id: string;
    name: string;
    type: string;
    autoComplete?: string;
}