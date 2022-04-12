import { NextComponentType, NextPageContext } from "next";

export type LayoutComponent = NextComponentType<NextPageContext, any, any> & {
    Layout?: any;
};