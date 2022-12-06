import {Breadcrumbs,IBreadcrumbProps,Icon,Breadcrumb} from "@blueprintjs/core";

const BREADCRUMBS = [
    { href: "/users", icon: "folder-close", text: "Users" },
    { href: "/users/janet", icon: "folder-close", text: "Janet" },
    { icon: "document", text: "image.jpg" },
];

const BreadCrumbs = () => {
    const renderCurrentBreadcrumb = ({text,...restProps}) => {
        return <Breadcrumb {...restProps}>{text}<Icon icon="star"/></Breadcrumb>;
    };
    return (
        <Breadcrumbs
            currentBreadcrumbRenderer = {renderCurrentBreadcrumb}
            items = {BREADCRUMBS}
            />
    );

};

export default BreadCrumbs;