import { AppProps } from "next/app";
import { AnyAction, Store } from "redux";
import { LayoutComponent } from "../types";

export default interface KiskbaAppProps extends AppProps {
    store: Store<any, AnyAction>;
    Component: LayoutComponent;
}